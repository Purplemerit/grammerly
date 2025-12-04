# 🗄️ DATABASE SCHEMA & DETAILED DOCUMENTATION
## GrammarPro - PostgreSQL Supabase Schema

**Document Version:** 1.0  
**Database:** PostgreSQL 15+  
**Status:** Production Ready  

---

## 📊 DATABASE ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE INSTANCE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   USERS      │   │  DOCUMENTS   │   │  GRAMMAR     │   │
│  │   TABLE      │   │  TABLE       │   │  CHECKS      │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
│         ↓                    ↓                    ↓         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   AUTH       │   │  STORAGE     │   │  PLAGIARISM  │   │
│  │   USERS      │   │  LOGS        │   │  SCANS       │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
│         ↓                    ↓                    ↓         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │            AUDIT & ANALYTICS TABLES                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 TABLE SCHEMAS

### 1. USERS TABLE

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  full_name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  password_hash VARCHAR(255) NOT NULL,
  auth_provider VARCHAR(50) CHECK (auth_provider IN ('email', 'google', 'github', 'microsoft')),
  plan_id UUID REFERENCES plans(id),
  plan_name VARCHAR(50) DEFAULT 'FREE' CHECK (plan_name IN ('FREE', 'PRO', 'BUSINESS')),
  subscription_status VARCHAR(50) CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'pending')),
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  language VARCHAR(10) DEFAULT 'en-US',
  timezone VARCHAR(50) DEFAULT 'UTC',
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

INDEXES:
├─ PRIMARY KEY: id
├─ UNIQUE: email
├─ INDEX: plan_id (for queries)
├─ INDEX: subscription_status
└─ INDEX: created_at (for pagination)

RELATIONSHIPS:
├─ One user → Many documents
├─ One user → One plan
└─ One user → Many grammar_checks
```

### 2. PLANS TABLE

```sql
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL CHECK (name IN ('FREE', 'PRO', 'BUSINESS')),
  description TEXT,
  price_monthly DECIMAL(10, 2),
  price_annual DECIMAL(10, 2),
  price_per_user DECIMAL(10, 2) DEFAULT NULL,
  
  -- Limits
  max_documents INT DEFAULT 0 (0 = unlimited),
  max_storage_gb INT DEFAULT 0,
  max_team_members INT DEFAULT 0,
  max_grammar_checks_monthly INT DEFAULT 0,
  max_plagiarism_checks_monthly INT DEFAULT 0,
  
  -- Features
  features_grammar_checking BOOLEAN DEFAULT true,
  features_plagiarism_detection BOOLEAN DEFAULT false,
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

EXAMPLE DATA:
┌─────────┬────────┬──────────────┬──────────────────┐
│ FREE    │ $0     │ 5 docs       │ Basic features   │
│ PRO     │ $10/mo │ Unlimited    │ Most features    │
│ BUSINESS│ Custom │ Unlimited    │ All features     │
└─────────┴────────┴──────────────┴──────────────────┘
```

### 3. DOCUMENTS TABLE

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('essay', 'article', 'email', 'blog', 'code', 'other')) DEFAULT 'article',
  language VARCHAR(10) DEFAULT 'en-US',
  word_count INT DEFAULT 0,
  character_count INT DEFAULT 0,
  reading_time_minutes INT DEFAULT 0,
  
  -- Metadata
  grammar_score DECIMAL(5, 2) DEFAULT 0,
  plagiarism_percentage DECIMAL(5, 2),
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

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: user_id
├─ INDEX: user_id, created_at (for user documents)
├─ INDEX: is_deleted, is_archived
└─ FULL TEXT SEARCH: content

PARTITIONING: By created_at (Monthly)
```

### 4. GRAMMAR_CHECKS TABLE

```sql
CREATE TABLE grammar_checks (
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
  
  CONSTRAINT check_errors CHECK (
    error_count = grammar_errors + spelling_errors + punctuation_errors + style_errors
  )
);

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: user_id
├─ FOREIGN KEY: document_id
├─ INDEX: user_id, checked_at
└─ COMPOSITE: (user_id, checked_at) for analytics
```

### 5. GRAMMAR_ERRORS TABLE

```sql
CREATE TABLE grammar_errors (
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

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: check_id
├─ INDEX: error_type, severity
└─ INDEX: is_accepted, is_ignored
```

### 6. PLAGIARISM_SCANS TABLE

```sql
CREATE TABLE plagiarism_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id VARCHAR(100) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  
  -- Scan details
  original_text TEXT NOT NULL,
  text_length INT,
  status VARCHAR(50) CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
  
  -- Results
  plagiarism_percentage DECIMAL(5, 2),
  original_percentage DECIMAL(5, 2),
  unique_sources INT DEFAULT 0,
  flagged_sections INT DEFAULT 0,
  
  -- Timing
  scan_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scan_completed_at TIMESTAMP WITH TIME ZONE,
  processing_time_ms INT,
  
  -- External reference
  external_scan_id VARCHAR(100), -- Copyleaks reference
  
  is_deleted BOOLEAN DEFAULT false
);

INDEXES:
├─ PRIMARY KEY: id
├─ UNIQUE: scan_id
├─ FOREIGN KEY: user_id
├─ FOREIGN KEY: document_id
├─ INDEX: user_id, status
└─ INDEX: plagiarism_percentage
```

### 7. PLAGIARISM_RESULTS TABLE

```sql
CREATE TABLE plagiarism_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID NOT NULL REFERENCES plagiarism_scans(id) ON DELETE CASCADE,
  
  -- Flagged content
  flagged_text VARCHAR(1000),
  plagiarism_percentage DECIMAL(5, 2),
  
  -- Source
  source_title VARCHAR(500),
  source_url VARCHAR(500),
  source_domain VARCHAR(255),
  source_publish_date DATE,
  
  -- Match type
  match_type VARCHAR(50) CHECK (match_type IN ('EXACT', 'PARAPHRASED', 'TRANSLATED')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: scan_id
├─ INDEX: plagiarism_percentage
└─ COMPOSITE: (scan_id, plagiarism_percentage)
```

### 8. TEAM_MEMBERSHIPS TABLE

```sql
CREATE TABLE team_memberships (
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

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: team_id
├─ FOREIGN KEY: user_id
└─ COMPOSITE: (team_id, user_id)
```

### 9. TEAMS TABLE

```sql
CREATE TABLE teams (
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

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: owner_id
└─ INDEX: owner_id, created_at
```

### 10. SHARED_DOCUMENTS TABLE

```sql
CREATE TABLE shared_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  shared_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shared_with_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
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

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: document_id
├─ INDEX: share_link
└─ INDEX: is_active, expires_at
```

### 11. AUDIT_LOGS TABLE

```sql
CREATE TABLE audit_logs (
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

INDEXES:
├─ PRIMARY KEY: id
├─ FOREIGN KEY: user_id
├─ INDEX: entity_type, entity_id
├─ INDEX: user_id, created_at
└─ PARTITION by created_at (Monthly)
```

### 12. USAGE_STATS TABLE

```sql
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Monthly stats
  year_month DATE NOT NULL,
  
  -- Counts
  grammar_checks INT DEFAULT 0,
  plagiarism_checks INT DEFAULT 0,
  paraphrase_requests INT DEFAULT 0,
  tone_analyses INT DEFAULT 0,
  
  -- Storage
  storage_used_mb INT DEFAULT 0,
  documents_count INT DEFAULT 0,
  
  -- Unique constraint
  UNIQUE(user_id, year_month)
);

INDEXES:
├─ PRIMARY KEY: id
├─ UNIQUE: (user_id, year_month)
├─ FOREIGN KEY: user_id
└─ INDEX: year_month
```

---

## 🔐 ROW-LEVEL SECURITY (RLS)

```sql
-- Users can only see their own data
CREATE POLICY users_own_data ON documents
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Public documents are readable by all
CREATE POLICY public_documents ON documents
  FOR SELECT USING (is_public = true);

-- Team members can see team documents
CREATE POLICY team_documents ON documents
  FOR SELECT USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT user_id FROM team_memberships
      WHERE team_id IN (
        SELECT team_id FROM team_memberships
        WHERE user_id = auth.uid()
      )
    )
  );
```

---

## 📈 INDEXES & PERFORMANCE

```
Critical Indexes (Performance):
├─ users(email) - Fast login
├─ documents(user_id, created_at) - List user docs
├─ documents(is_deleted) - Filter deleted
├─ grammar_checks(user_id, checked_at) - Analytics
├─ plagiarism_scans(status) - Processing queue
├─ audit_logs(created_at) - Cleanup jobs
└─ usage_stats(year_month) - Reports

Full Text Search Indexes:
├─ documents(content) - PostgreSQL FTS
├─ documents USING GIN(to_tsvector('english', content))
└─ Query: ... WHERE to_tsvector('english', content) @@ plainto_tsquery(search_term)
```

---

## 💾 BACKUP & MAINTENANCE

```
Backup Strategy:
├─ Hourly backups (24-hour retention)
├─ Daily backups (30-day retention)
├─ Monthly backups (1-year retention)
└─ Point-in-time recovery (30 days)

Maintenance Windows:
├─ VACUUM & ANALYZE: Daily at 2 AM
├─ Reindex: Weekly on Sunday
└─ Partition cleanup: Monthly

Connection Pool:
├─ Max connections: 50 (production)
├─ Idle timeout: 900 seconds
└─ Connection timeout: 30 seconds
```

---

**Document Status:** ✅ COMPLETE  
**Ready for:** Supabase implementation  
**Performance:** Optimized for 100K+ users

