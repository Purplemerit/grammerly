# Database Schema - GrammarPro

## 📋 Overview

This directory contains the database migration files for GrammarPro using Supabase (PostgreSQL).

## 🗄️ Database Structure

### Tables Created (10 total):

1. **plans** - Subscription plans (FREE, PRO, BUSINESS)
2. **users** - User accounts with PhonePe integration
3. **documents** - User documents with metadata
4. **grammar_checks** - Grammar checking history
5. **grammar_errors** - Individual grammar errors with suggestions
6. **teams** - Team workspaces
7. **team_memberships** - Team member relationships
8. **shared_documents** - Document sharing permissions
9. **audit_logs** - System audit trail
10. **usage_stats** - Monthly usage statistics

### Removed Tables:
- ❌ `plagiarism_scans` - Not implemented (Copyleaks removed)
- ❌ `plagiarism_results` - Not implemented

## 🚀 Setup Instructions

### 1. Connect to Supabase

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste and execute in SQL Editor

### 2. Verify Setup

After running the migration, verify:
- ✅ All 10 tables created
- ✅ Indexes created
- ✅ RLS policies enabled
- ✅ Seed data inserted (3 plans)

### 3. Get Connection Details

From Supabase dashboard:
- **Project URL**: Settings → API → Project URL
- **Anon Key**: Settings → API → anon/public key
- **Service Role Key**: Settings → API → service_role key (keep secret!)

## 📝 Migration File

- `001_initial_schema.sql` - Complete initial schema with:
  - All 10 tables
  - All indexes
  - RLS policies
  - Seed data
  - Triggers

## 🔐 Security

- Row-Level Security (RLS) enabled on all tables
- Users can only access their own data
- Team documents accessible to team members
- Public documents readable by all

## 📊 Performance

- Indexes on all foreign keys
- Composite indexes for common queries
- Full-text search on document content
- Optimized for 100K+ users

## 🔄 Next Steps

After database setup:
1. Update `.env` with Supabase credentials
2. Test connection from backend
3. Proceed to PROMPT #3: Authentication System

