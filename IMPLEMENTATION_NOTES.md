# GrammarPro - Implementation Notes & Modifications

## 🔄 Changes from Original Documentation

### Payment Gateway
- **Original:** Stripe
- **Changed to:** PhonePe
- **Impact:** All billing/subscription endpoints will use PhonePe API
- **Files to modify:** 
  - `backend/src/billing/` module
  - Payment webhook handlers
  - Subscription management

### Removed Features
- **Copyleaks API Integration** - Plagiarism detection removed
- **Plagiarism-related endpoints** - Not implemented
- **Plagiarism UI components** - Not created
- **Database tables:** `plagiarism_scans`, `plagiarism_results` - Can be added later if needed

### Kept Features
- ✅ Claude API for paraphrasing
- ✅ spaCy + BERT for grammar checking
- ✅ All Phase 1 MVP features (except plagiarism)
- ✅ Team collaboration
- ✅ Document management
- ✅ Real-time sync

## 📊 Phase 1 MVP Features (Modified)

### Included:
1. ✅ User Authentication (Email/Password, OAuth)
2. ✅ Document Management (CRUD)
3. ✅ Real-time Grammar Checking
4. ✅ AI Paraphrasing (Claude)
5. ✅ Subscription Management (PhonePe)
6. ✅ User Dashboard
7. ✅ Analytics & Insights

### Excluded:
- ❌ Plagiarism Detection (Copyleaks)
- ❌ Plagiarism Reports
- ❌ Plagiarism History

## 🔧 PhonePe Integration Details

### Required Configuration:
```env
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_ENVIRONMENT=sandbox
PHONEPE_BASE_URL=https://api.phonepe.com/apis
```

### Implementation Approach:
- Use PhonePe Payment Gateway API
- Handle payment callbacks
- Webhook integration for payment status
- Subscription management via PhonePe

## 📝 Database Schema Modifications

### Tables to Create (12 total):
1. ✅ users
2. ✅ plans
3. ✅ documents
4. ✅ grammar_checks
5. ✅ grammar_errors
6. ✅ team_memberships
7. ✅ teams
8. ✅ shared_documents
9. ✅ audit_logs
10. ✅ usage_stats
11. ❌ plagiarism_scans (SKIP - removed)
12. ❌ plagiarism_results (SKIP - removed)

**Total: 10 tables** (2 removed)

## 🎯 Next Implementation Steps

1. **Database Setup** - Create 10 tables in Supabase
2. **Authentication** - JWT + OAuth
3. **User Management** - Profile, preferences
4. **Grammar Engine** - spaCy + BERT
5. **UI Components** - Design system implementation
6. **Document Management** - CRUD + real-time
7. **Billing** - PhonePe integration
8. **Testing** - Unit, integration, E2E
9. **Deployment** - Vercel + Railway

