# Supabase Setup Guide for GrammarPro

## 📋 Prerequisites

- Supabase account created
- Project URL available
- API keys ready

## 🚀 Step-by-Step Setup

### Step 1: Run Migration

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy entire contents of `migrations/001_initial_schema.sql`
5. Paste into SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for completion (should see "✅ All 10 tables created successfully!")

### Step 2: Verify Tables

Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'users', 'plans', 'documents', 'grammar_checks', 
    'grammar_errors', 'teams', 'team_memberships', 
    'shared_documents', 'audit_logs', 'usage_stats'
  )
ORDER BY table_name;
```

Expected: 10 rows

### Step 3: Verify Plans Data

```sql
SELECT name, price_monthly, max_documents, features_paraphrasing 
FROM plans 
ORDER BY price_monthly;
```

Expected: 3 rows (FREE, PRO, BUSINESS)

### Step 4: Get API Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Step 5: Update Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

## ✅ Verification Checklist

- [ ] Migration executed successfully
- [ ] All 10 tables visible in Table Editor
- [ ] 3 plans inserted (FREE, PRO, BUSINESS)
- [ ] RLS policies enabled (check in Authentication → Policies)
- [ ] API credentials copied to `.env.local`
- [ ] Connection test successful

## 🔧 Troubleshooting

### Issue: Migration fails
- Check PostgreSQL version (need 15+)
- Ensure you have admin access
- Check for syntax errors

### Issue: Tables not visible
- Refresh Supabase dashboard
- Check if migration completed
- Verify you're in correct project

### Issue: RLS blocking queries
- Check policies in Authentication → Policies
- Verify `auth.uid()` is working
- Test with service_role key (bypasses RLS)

## 📞 Next Steps

Once verified:
1. ✅ Database setup complete
2. → Proceed to **PROMPT #3: Authentication System**

