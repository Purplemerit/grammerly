-- ============================================
-- GRAMMARPRO - DATABASE SCHEMA MIGRATION
-- ============================================
-- Version: 1.0
-- Date: 2025-12-04
-- Database: Supabase PostgreSQL
-- 
-- NOTE: Plagiarism tables removed (Copyleaks not used)
-- NOTE: PhonePe integration for payments (not Stripe)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TABLE 1: PLANS
-- ============================================
-- Must be created first (referenced by users table)

CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL CHECK (name IN ('FREE', 'PRO', 'BUSINESS')),
  description TEXT,
  price_monthly DECIMAL(10, 2) DEFAULT 0,
  price_annual DECIMAL(10, 2) DEFAULT 0,
  price_per_user DECIMAL(10, 2) DEFAULT NULL,
  
  -- Limits (0 = unlimited)
  max_documents INT DEFAULT 0,
  max_storage_gb INT DEFAULT 0,
  max_team_members INT DEFAULT 0,
  max_grammar_checks_monthly INT DEFAULT 0,
  max_paraphrase_requests_monthly INT DEFAULT 0,
  
  -- Features
  features_grammar_checking BOOLEAN DEFAULT true,
  features_paraphrasing BOOLEAN DEFAULT false,
  features_tone_analysis BOOLEAN DEFAULT false,
  features_team_collaboration BOOLEAN DEFAULT false,
  features_mobile_app BOOLEAN DEFAULT false,
  features_desktop_app BOOLEAN DEFAULT false,
  features_browser_extension BOOLEAN DEFAULT false,
  features_api_access BOOLEAN DEFAULT false,
  features_sso BOOLEAN DEFAULT false,
  features_priority_support BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for plans
CREATE INDEX IF NOT EXISTS idx_plans_name ON plans(name);
CREATE INDEX IF NOT EXISTS idx_plans_is_active ON plans(is_active);

-- ============================================
-- TABLE 2: USERS
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  full_name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  password_hash VARCHAR(255),
  auth_provider VARCHAR(50) CHECK (auth_provider IN ('email', 'google', 'github', 'microsoft')) DEFAULT 'email',
  
  -- Subscription (PhonePe integration)
  plan_id UUID REFERENCES plans(id) ON DELETE SET NULL,
  plan_name VARCHAR(50) DEFAULT 'FREE' CHECK (plan_name IN ('FREE', 'PRO', 'BUSINESS')),
  subscription_status VARCHAR(50) CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'pending')) DEFAULT 'active',
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  phonepe_customer_id VARCHAR(255), -- PhonePe customer reference
  phonepe_subscription_id VARCHAR(255), -- PhonePe subscription reference
  
  -- Preferences
  language VARCHAR(10) DEFAULT 'en-US',
  timezone VARCHAR(50) DEFAULT 'UTC',
  
  -- Activity
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  is_deleted BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan_id ON users(plan_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_is_deleted ON users(is_deleted);

-- ============================================
-- TABLE 3: DOCUMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('essay', 'article', 'email', 'blog', 'code', 'other')) DEFAULT 'article',
  language VARCHAR(10) DEFAULT 'en-US',
  
  -- Counts
  word_count INT DEFAULT 0,
  character_count INT DEFAULT 0,
  reading_time_minutes INT DEFAULT 0,
  
  -- Metadata
  grammar_score DECIMAL(5, 2) DEFAULT 0,
  tone_detected VARCHAR(50),
  
  -- Status
  is_public BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_checked_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for documents
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_created ON documents(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_is_deleted ON documents(is_deleted);
CREATE INDEX IF NOT EXISTS idx_documents_is_archived ON documents(is_archived);
CREATE INDEX IF NOT EXISTS idx_documents_is_public ON documents(is_public);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_documents_content_fts ON documents USING GIN(to_tsvector('english', content));

-- ============================================
-- TABLE 4: GRAMMAR_CHECKS
-- ============================================

CREATE TABLE IF NOT EXISTS grammar_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  
  -- Check details
  original_text TEXT NOT NULL,
  error_count INT DEFAULT 0,
  grammar_errors INT DEFAULT 0,
  spelling_errors INT DEFAULT 0,
  punctuation_errors INT DEFAULT 0,
  style_errors INT DEFAULT 0,
  
  -- Score
  grammar_score DECIMAL(5, 2),
  processing_time_ms INT,
  
  -- Timestamp
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT check_errors_sum CHECK (
    error_count = grammar_errors + spelling_errors + punctuation_errors + style_errors
  )
);

-- Indexes for grammar_checks
CREATE INDEX IF NOT EXISTS idx_grammar_checks_user_id ON grammar_checks(user_id);
CREATE INDEX IF NOT EXISTS idx_grammar_checks_document_id ON grammar_checks(document_id);
CREATE INDEX IF NOT EXISTS idx_grammar_checks_user_checked ON grammar_checks(user_id, checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_grammar_checks_composite ON grammar_checks(user_id, checked_at);

-- ============================================
-- TABLE 5: GRAMMAR_ERRORS
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
  suggested_corrections TEXT[], -- Array of suggestions
  explanation TEXT,
  confidence_score DECIMAL(3, 2),
  
  -- Status
  is_accepted BOOLEAN DEFAULT false,
  is_ignored BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for grammar_errors
CREATE INDEX IF NOT EXISTS idx_grammar_errors_check_id ON grammar_errors(check_id);
CREATE INDEX IF NOT EXISTS idx_grammar_errors_type_severity ON grammar_errors(error_type, severity);
CREATE INDEX IF NOT EXISTS idx_grammar_errors_status ON grammar_errors(is_accepted, is_ignored);

-- ============================================
-- TABLE 6: TEAMS
-- ============================================

CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  avatar_url VARCHAR(500),
  
  -- Limits
  max_members INT,
  max_documents INT,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for teams
CREATE INDEX IF NOT EXISTS idx_teams_owner_id ON teams(owner_id);
CREATE INDEX IF NOT EXISTS idx_teams_owner_created ON teams(owner_id, created_at);

-- ============================================
-- TABLE 7: TEAM_MEMBERSHIPS
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

-- Indexes for team_memberships
CREATE INDEX IF NOT EXISTS idx_team_memberships_team_id ON team_memberships(team_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_user_id ON team_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_composite ON team_memberships(team_id, user_id);

-- ============================================
-- TABLE 8: SHARED_DOCUMENTS
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

-- Indexes for shared_documents
CREATE INDEX IF NOT EXISTS idx_shared_documents_document_id ON shared_documents(document_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_shared_by ON shared_documents(shared_by_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_shared_with ON shared_documents(shared_with_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_team_id ON shared_documents(team_id);
CREATE INDEX IF NOT EXISTS idx_shared_documents_share_link ON shared_documents(share_link);
CREATE INDEX IF NOT EXISTS idx_shared_documents_active_expires ON shared_documents(is_active, expires_at);

-- ============================================
-- TABLE 9: AUDIT_LOGS
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

-- Indexes for audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_created ON audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================
-- TABLE 10: USAGE_STATS
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

-- Indexes for usage_stats
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_id ON usage_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_year_month ON usage_stats(year_month);
CREATE INDEX IF NOT EXISTS idx_usage_stats_composite ON usage_stats(user_id, year_month);

-- ============================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_own_data ON documents
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Public documents are readable by all
CREATE POLICY public_documents_read ON documents
  FOR SELECT
  USING (is_public = true);

-- Team members can see team documents
CREATE POLICY team_documents_access ON documents
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    id IN (
      SELECT document_id FROM shared_documents
      WHERE (shared_with_id = auth.uid() OR team_id IN (
        SELECT team_id FROM team_memberships WHERE user_id = auth.uid()
      ))
      AND is_active = true
      AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

-- Users can only see their own grammar checks
CREATE POLICY grammar_checks_own_data ON grammar_checks
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only see their own usage stats
CREATE POLICY usage_stats_own_data ON usage_stats
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Team members can see their team
CREATE POLICY team_memberships_access ON team_memberships
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    team_id IN (SELECT team_id FROM team_memberships WHERE user_id = auth.uid())
  );

-- ============================================
-- SEED DATA: PLANS
-- ============================================

INSERT INTO plans (name, description, price_monthly, price_annual, max_documents, max_storage_gb, max_team_members, max_grammar_checks_monthly, max_paraphrase_requests_monthly, features_grammar_checking, features_paraphrasing, features_tone_analysis, features_team_collaboration, features_priority_support) VALUES
('FREE', 'Perfect for getting started', 0, 0, 5, 1, 1, 1000, 100, true, false, false, false, false),
('PRO', 'For professional writers', 10, 100, 0, 50, 3, 0, 2000, true, true, true, true, true),
('BUSINESS', 'For teams and enterprises', 25, 250, 0, 500, 0, 0, 0, true, true, true, true, true)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify tables created
DO $$
DECLARE
  table_count INT;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('users', 'plans', 'documents', 'grammar_checks', 'grammar_errors', 'teams', 'team_memberships', 'shared_documents', 'audit_logs', 'usage_stats');
  
  IF table_count = 10 THEN
    RAISE NOTICE '✅ All 10 tables created successfully!';
  ELSE
    RAISE WARNING '⚠️ Expected 10 tables, found %', table_count;
  END IF;
END $$;

