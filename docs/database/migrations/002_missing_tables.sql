-- ============================================
-- CREATE MISSING TABLES (if any)
-- ============================================
-- Run this if some tables are missing from the initial migration
-- ============================================

-- Check what exists first
DO $$
DECLARE
  missing_tables TEXT[];
  table_name TEXT;
BEGIN
  -- Check which tables are missing
  SELECT ARRAY_AGG(expected_table)
  INTO missing_tables
  FROM (
    VALUES 
      ('users'), ('plans'), ('documents'), ('grammar_checks'), 
      ('grammar_errors'), ('teams'), ('team_memberships'), 
      ('shared_documents'), ('audit_logs'), ('usage_stats')
  ) AS expected(expected_table)
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name = expected.expected_table
  );
  
  IF missing_tables IS NOT NULL THEN
    RAISE NOTICE 'Missing tables: %', array_to_string(missing_tables, ', ');
  ELSE
    RAISE NOTICE '✅ All tables exist!';
  END IF;
END $$;

-- ============================================
-- TABLE 5: GRAMMAR_ERRORS (if missing)
-- ============================================

CREATE TABLE IF NOT EXISTS grammar_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_id UUID NOT NULL REFERENCES grammar_checks(id) ON DELETE CASCADE,
  
  -- Error details
  error_type VARCHAR(50) CHECK (error_type IN ('GRAMMAR', 'SPELLING', 'PUNCTUATION', 'STYLE')),
  severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH')),
  category VARCHAR(100),
  
  -- Position in text
  start_position INT NOT NULL,
  end_position INT NOT NULL,
  original_text VARCHAR(500),
  
  -- Suggestions
  suggested_corrections TEXT[],
  explanation TEXT,
  confidence_score DECIMAL(3, 2),
  
  -- Status
  is_accepted BOOLEAN DEFAULT false,
  is_ignored BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_grammar_errors_check_id ON grammar_errors(check_id);
CREATE INDEX IF NOT EXISTS idx_grammar_errors_type_severity ON grammar_errors(error_type, severity);
CREATE INDEX IF NOT EXISTS idx_grammar_errors_status ON grammar_errors(is_accepted, is_ignored);

-- ============================================
-- TABLE 7: TEAM_MEMBERSHIPS (if missing)
-- ============================================

CREATE TABLE IF NOT EXISTS team_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Role
  role VARCHAR(50) CHECK (role IN ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER')) DEFAULT 'VIEWER',
  
  -- Status
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  
  -- Unique constraint
  UNIQUE(team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_memberships_team_id ON team_memberships(team_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_user_id ON team_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_composite ON team_memberships(team_id, user_id);

-- ============================================
-- TABLE 8: SHARED_DOCUMENTS (if missing)
-- ============================================

CREATE TABLE IF NOT EXISTS shared_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  shared_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shared_with_id UUID REFERENCES users(id) ON DELETE SET NULL,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  
  -- Permissions
  permission VARCHAR(50) CHECK (permission IN ('VIEW', 'COMMENT', 'EDIT', 'MANAGE')) DEFAULT 'VIEW',
  
  -- Sharing
  share_type VARCHAR(50) CHECK (share_type IN ('USER', 'TEAM', 'PUBLIC')) DEFAULT 'USER',
  share_link VARCHAR(500),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_shared_documents_document_id ON shared_documents(document_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_shared_by ON shared_documents(shared_by_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_shared_with ON shared_documents(shared_with_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_team_id ON shared_documents(team_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_share_link ON shared_documents(share_link);
CREATE INDEX IF NOT EXISTS idx_shared_documents_active_expires ON shared_documents(is_active, expires_at);

-- ============================================
-- TABLE 9: AUDIT_LOGS (if missing)
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  
  old_values JSONB,
  new_values JSONB,
  
  ip_address INET,
  user_agent TEXT,
  status VARCHAR(50),
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_created ON audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================
-- TABLE 10: USAGE_STATS (if missing)
-- ============================================

CREATE TABLE IF NOT EXISTS usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Monthly stats
  year_month DATE NOT NULL,
  
  -- Counts
  grammar_checks INT DEFAULT 0,
  paraphrase_requests INT DEFAULT 0,
  tone_analyses INT DEFAULT 0,
  
  -- Storage
  storage_used_mb INT DEFAULT 0,
  documents_count INT DEFAULT 0,
  
  -- Unique constraint
  UNIQUE(user_id, year_month)
);

CREATE INDEX IF NOT EXISTS idx_usage_stats_user_id ON usage_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_year_month ON usage_stats(year_month);
CREATE INDEX IF NOT EXISTS idx_usage_stats_composite ON usage_stats(user_id, year_month);

-- ============================================
-- ENABLE RLS ON NEW TABLES
-- ============================================

ALTER TABLE grammar_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ADD RLS POLICIES FOR MISSING TABLES
-- ============================================

-- Users can only see their own usage stats
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'usage_stats' 
      AND policyname = 'usage_stats_own_data'
  ) THEN
    CREATE POLICY usage_stats_own_data ON usage_stats
      FOR ALL
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Team memberships access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'team_memberships' 
      AND policyname = 'team_memberships_access'
  ) THEN
    CREATE POLICY team_memberships_access ON team_memberships
      FOR SELECT
      USING (
        user_id = auth.uid() OR
        team_id IN (SELECT team_id FROM team_memberships WHERE user_id = auth.uid())
      );
  END IF;
END $$;

-- ============================================
-- VERIFY ALL TABLES NOW EXIST
-- ============================================

SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN (
    'users', 
    'plans', 
    'documents', 
    'grammar_checks', 
    'grammar_errors', 
    'teams', 
    'team_memberships', 
    'shared_documents', 
    'audit_logs', 
    'usage_stats'
  )
ORDER BY table_name;

-- Expected: 10 rows

