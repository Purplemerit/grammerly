-- ============================================
-- VERIFICATION QUERIES FOR GRAMMARPRO MIGRATION
-- ============================================
-- Run these queries in Supabase SQL Editor to verify migration success
-- ============================================

-- 1. Check if all 10 tables exist
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

-- 2. Verify plans seed data
SELECT 
  name, 
  price_monthly, 
  price_annual,
  max_documents,
  features_paraphrasing,
  features_team_collaboration
FROM plans 
ORDER BY price_monthly;

-- Expected: 3 rows (FREE, PRO, BUSINESS)

-- 3. Check indexes were created
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
    'users', 'plans', 'documents', 'grammar_checks', 
    'grammar_errors', 'teams', 'team_memberships', 
    'shared_documents', 'audit_logs', 'usage_stats'
  )
ORDER BY tablename, indexname;

-- Expected: Multiple indexes per table

-- 4. Verify RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'users', 'plans', 'documents', 'grammar_checks', 
    'grammar_errors', 'teams', 'team_memberships', 
    'shared_documents', 'audit_logs', 'usage_stats'
  )
ORDER BY tablename;

-- Expected: rowsecurity = true for all tables (except plans, which may not need RLS)

-- 5. Check triggers
SELECT 
  trigger_name,
  event_object_table as table_name,
  action_timing,
  event_manipulation
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN (
    'users', 'plans', 'documents', 'teams'
  )
ORDER BY event_object_table;

-- Expected: update_updated_at triggers on users, documents, teams, plans

-- 6. Quick count check
SELECT 
  'plans' as table_name, COUNT(*) as row_count FROM plans
UNION ALL
SELECT 'users', COUNT(*) FROM users
UNION ALL
SELECT 'documents', COUNT(*) FROM documents
UNION ALL
SELECT 'grammar_checks', COUNT(*) FROM grammar_checks
UNION ALL
SELECT 'teams', COUNT(*) FROM teams;

-- Expected: plans = 3, others = 0 (empty tables ready for data)

