-- Check all tables that should exist
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

