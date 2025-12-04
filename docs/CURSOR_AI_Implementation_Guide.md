# 🎯 CURSOR AI PROJECT SETUP - COMPREHENSIVE IMPLEMENTATION GUIDE
## GrammarPro Development with Cursor AI

**Version:** 1.0  
**Status:** Production Ready  
**For:** Cursor AI Code Editor  
**Project:** GrammarPro - Professional Grammar & Writing Tool  

---

## 📋 TABLE OF CONTENTS

1. Project Overview & Context
2. Document Manifest (All 12+ Documents)
3. Step-by-Step Cursor Implementation Prompts
4. Breakdown by Feature/Module
5. API Implementation Sequence
6. Database Schema Setup
7. Frontend Component Development
8. Testing & Quality Assurance
9. Deployment Preparation

---

## 🎯 PART 1: CURSOR AI IMPLEMENTATION OVERVIEW

### What Cursor Will Do:

1. **Analyze** all project documentation (12+ documents)
2. **Understand** complete project architecture
3. **Generate** production-ready code
4. **Follow** design system specifications
5. **Implement** features sequentially
6. **Maintain** code quality & accessibility

### How This Works:

- Each prompt focuses on **ONE module** at a time
- Documents are referenced in **order**
- Cursor builds incrementally
- Quality checks at each step
- Full context provided per prompt

---

## 📚 PART 2: COMPLETE DOCUMENT LIST (All 12+ Documents)

### SECTION A: PROJECT CORE (6 Documents)

**1. PRD_Phase1_CTO_CXO.md**
- MVP feature specifications
- Phase 1 requirements
- 45 features documented
- Acceptance criteria for each

**2. PRD_Phase2_CTO_CXO.md**
- Scale phase features
- 65 additional features
- Enterprise requirements
- Growth projections

**3. Implementation_Plan_Complete.md**
- Timeline & milestones
- Resource allocation
- Sprint structure
- Dependencies mapping

**4. complete_project_summary.txt**
- Executive summary
- Business metrics
- High-level architecture
- ROI projections

**5. quick_reference.txt**
- Quick lookup guide
- Key metrics
- Important links
- Reference points

**6. PROJECT_SUMMARY.txt**
- Detailed overview
- Team structure
- Budget breakdown
- Full specifications

### SECTION B: TECHNICAL DOCS (4+ Documents)

**7. Wireframes_Design_System.md**
- Design foundation
- Color palette
- Typography system
- Spacing rules
- Component library

**8. API_Documentation_Complete.md**
- 35+ endpoints
- Request/response specs
- Error handling
- Rate limiting
- Authentication flows

**9. Database_Schema_Detailed.md**
- 12 table schemas
- Relationships & keys
- Indexes & constraints
- Backup procedures
- Migration scripts

**10. Feature_Specification_Complete.md**
- 110+ features
- Acceptance criteria
- Test cases
- Priority levels
- Dependencies

**11. Technical_Architecture_Complete.md**
- System architecture
- Technology stack
- Data flow diagrams
- Scalability strategy
- CI/CD pipeline

**12. Security_Compliance_Performance.md**
- Authentication methods
- Encryption standards
- Security checklist
- Performance targets
- Monitoring setup

### SECTION C: DESIGN SYSTEM (2 New Documents)

**13. UI_UX_Design_System_Complete.md**
- Typography system (25+ pages)
- Color palette
- Spacing system
- Design hierarchy
- Animations
- Responsive design

**14. UI_UX_Design_Application_Guide.md**
- Component specifications
- Button hierarchy
- Form components
- Card layouts
- Layout patterns
- Implementation guides

---

## 🚀 PART 3: STEP-BY-STEP CURSOR PROMPTS

### ⚠️ IMPORTANT BEFORE STARTING:

1. **Create a new Cursor project**
2. **Initialize Git repository**
3. **Set up .env.example**
4. **Create folder structure** (as shown below)
5. **Copy all documents** into a `/docs` folder in project

### Recommended Folder Structure:

```
grammarpro/
├── /docs (All 14 documents here)
├── /src
│  ├── /api
│  ├── /components
│  ├── /pages
│  ├── /lib
│  ├── /styles
│  └── /utils
├── /public
├── /tests
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 📖 PROMPT SEQUENCE (Use in This Order)

### ✅ PROMPT #1: PROJECT INITIALIZATION
**After:** Document collection  
**Before:** Any code generation  
**Time:** ~5 minutes  

```
You are an expert full-stack developer helping build GrammarPro.

CRITICAL CONTEXT:
All project documentation is in /docs folder:
- /docs/PRD_Phase1_CTO_CXO.md
- /docs/PRD_Phase2_CTO_CXO.md
- /docs/Implementation_Plan_Complete.md
- /docs/complete_project_summary.txt
- /docs/quick_reference.txt
- /docs/PROJECT_SUMMARY.txt
- /docs/Wireframes_Design_System.md
- /docs/API_Documentation_Complete.md
- /docs/Database_Schema_Detailed.md
- /docs/Feature_Specification_Complete.md
- /docs/Technical_Architecture_Complete.md
- /docs/Security_Compliance_Performance.md
- /docs/UI_UX_Design_System_Complete.md
- /docs/UI_UX_Design_Application_Guide.md

TASK 1: PROJECT STRUCTURE
1. Create complete folder structure for Next.js 14 project
2. Set up all necessary configuration files:
   - next.config.js (with optimization)
   - tailwind.config.js (with design system colors)
   - tsconfig.json
   - .env.example (with all required variables)
   - .gitignore (comprehensive)

3. Create base files:
   - README.md (project overview)
   - package.json (with all dependencies)
   - Start documentation

REQUIREMENTS:
- Tech stack: Next.js 14, React 18, TypeScript, TailwindCSS, Supabase
- Design system: Use exact colors from UI_UX_Design_System_Complete.md
- Styling: Follow UI_UX_Design_Application_Guide.md precisely
- Code quality: TypeScript strict mode, ESLint, Prettier

DELIVERABLES:
1. Complete folder structure
2. All configuration files
3. Base dependencies
4. Environment setup
5. Initial README

INSTRUCTIONS:
- Create files, don't just show content
- Make production-ready code
- Follow all specifications exactly
- Include comments explaining each file
- Save all created files to project
```

---

### ✅ PROMPT #2: DATABASE SCHEMA SETUP
**After:** PROMPT #1 (Project Initialization)  
**Requires:** Database_Schema_Detailed.md  
**Time:** ~10 minutes  

```
Now implementing database layer for GrammarPro.

REFERENCE DOCUMENT:
Read /docs/Database_Schema_Detailed.md for complete specifications.

TASK 2: SUPABASE DATABASE SETUP

1. CREATE DATABASE MIGRATIONS:
   For each of the 12 tables in Database_Schema_Detailed.md:
   - users
   - documents
   - grammar_checks
   - suggestions
   - user_subscriptions
   - pricing_plans
   - api_keys
   - audit_logs
   - plagiarism_checks
   - user_preferences
   - billing_history
   - notifications

   Create migration files in /src/migrations folder with:
   - Table creation SQL
   - Column definitions with exact data types
   - Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE)
   - Indexes (15+ performance indexes specified)
   - Row-level security policies
   - Comment documentation

2. CREATE TYPESCRIPT TYPES:
   In /src/types/database.ts:
   - Type for each table
   - Relationships between types
   - Enums for statuses/states
   - Union types for variants
   - Optional/required field distinction

3. CREATE SUPABASE CLIENT:
   In /src/lib/supabase.ts:
   - Initialize Supabase client
   - Create typed queries
   - Error handling
   - Connection pooling setup
   - Audit logging integration

4. SECURITY SETUP:
   - Row-level security (RLS) policies
   - Field-level encryption for PII
   - Audit triggers on all tables
   - Backup procedures documented
   - Point-in-time recovery config

REQUIREMENTS:
- Use exact schema from Database_Schema_Detailed.md
- All relationships must match specification
- Indexes for performance
- RLS for security
- Audit logging on mutations

DELIVERABLES:
1. Migration files (SQL)
2. TypeScript type definitions
3. Supabase client setup
4. RLS policies
5. Backup documentation

SPECIAL INSTRUCTIONS:
- Make all migrations idempotent
- Include rollback procedures
- Document all relationships
- Include helpful comments
- Test migration creation without running (show migration up/down)
```

---

### ✅ PROMPT #3: AUTHENTICATION SYSTEM
**After:** PROMPT #2 (Database Setup)  
**Requires:** Security_Compliance_Performance.md  
**Time:** ~15 minutes  

```
Implementing authentication and authorization for GrammarPro.

REFERENCE DOCUMENTS:
- /docs/Security_Compliance_Performance.md
- /docs/API_Documentation_Complete.md (endpoints section)

TASK 3: AUTHENTICATION IMPLEMENTATION

1. NEXTAUTH CONFIGURATION:
   Create /src/lib/auth/config.ts:
   - JWT configuration (HS256, 1-hour TTL)
   - Session configuration
   - Refresh token logic
   - Cookie settings (secure, HttpOnly)
   - CSRF protection

2. AUTHENTICATION METHODS (4 required):
   
   A. PASSWORD AUTHENTICATION:
   - Hash function (bcrypt, min 10 rounds)
   - Password validation (8+ chars, complexity)
   - Password reset flow
   - Email verification
   - Secure password storage
   
   B. OAUTH 2.0 (3 providers):
   - Google OAuth setup
   - GitHub OAuth setup
   - Microsoft OAuth setup
   - Token exchange flow
   - User creation on first login
   
   C. 2FA/TOTP:
   - QR code generation
   - Backup codes (10 codes)
   - TOTP validation
   - Recovery process
   - Disabling 2FA
   
   D. API KEYS:
   - Generate function
   - Rotation mechanism
   - Revocation process
   - Rate limiting per key
   - Audit logging

3. CREATE AUTH ROUTES:
   In /src/app/api/auth folder:
   - /login (POST)
   - /signup (POST)
   - /logout (POST)
   - /refresh (POST)
   - /verify-email (POST)
   - /reset-password (POST)
   - /enable-2fa (POST)
   - /verify-2fa (POST)
   - /api-key/generate (POST)
   - /api-key/revoke (POST)

4. CREATE AUTH HOOKS:
   In /src/hooks/useAuth.ts:
   - useUser() - current user
   - useLogin() - login function
   - useSignup() - signup function
   - useLogout() - logout function
   - useProtectedRoute() - route guard
   - useApiKey() - API key management

5. MIDDLEWARE:
   Create /src/middleware/auth.ts:
   - JWT verification
   - Session validation
   - Rate limiting middleware
   - CORS handling
   - Request logging

REQUIREMENTS:
- Follow Security_Compliance_Performance.md exactly
- All passwords AES-256-GCM encrypted
- TLS 1.2+ required
- GDPR compliance built-in
- SOC 2 Type II requirements
- Password complexity rules enforced
- Session timeout (1 hour)
- Remember-me functionality (optional)

SECURITY CHECKLIST:
✓ No passwords in logs
✓ No tokens in URLs
✓ Secure cookie settings
✓ CSRF tokens on forms
✓ Rate limiting on auth endpoints
✓ Audit logging on all auth events
✓ Email verification required
✓ Account lockout after 5 failed attempts

DELIVERABLES:
1. Auth configuration
2. Database auth methods
3. Auth API routes
4. Custom hooks
5. Middleware setup
6. Security audit log

SPECIAL INSTRUCTIONS:
- Make secure by default
- Follow OWASP guidelines
- Include error messages (non-revealing)
- Document all security measures
- Create .env variables needed
```

---

### ✅ PROMPT #4: API ENDPOINTS - USER MANAGEMENT
**After:** PROMPT #3 (Authentication)  
**Requires:** API_Documentation_Complete.md (sections: User endpoints)  
**Time:** ~12 minutes  

```
Building User Management API endpoints for GrammarPro.

REFERENCE DOCUMENTS:
- /docs/API_Documentation_Complete.md (User Management section)
- /docs/Feature_Specification_Complete.md (User features)

TASK 4: USER MANAGEMENT ENDPOINTS

CREATE FOLLOWING ENDPOINTS IN /src/app/api/users folder:

1. GET /api/users/profile
   - Authenticated user profile
   - Return: User object with all fields
   - Status codes: 200, 401
   - Rate limit: 100/hour

2. PUT /api/users/profile
   - Update user profile
   - Fields: name, email, profile_picture, bio
   - Validation: Email uniqueness, file size
   - Status codes: 200, 400, 409
   - Returns: Updated user object

3. POST /api/users/profile/picture
   - Upload profile picture
   - Max size: 5MB
   - Formats: JPG, PNG, WebP
   - Status codes: 200, 400, 413
   - Returns: Picture URL

4. PUT /api/users/preferences
   - Update user preferences
   - Fields: theme, language, notifications, writing_style
   - Validation: Valid enum values
   - Status codes: 200, 400
   - Returns: Updated preferences

5. GET /api/users/me
   - Get current authenticated user
   - Return: Full user object
   - Cache: 5 minutes
   - Status codes: 200, 401

6. POST /api/users/change-password
   - Change user password
   - Require: Current password, new password
   - Validation: Password strength, no reuse
   - Status codes: 200, 400, 401
   - Audit log: Password change event

7. DELETE /api/users/account
   - Delete user account (soft delete)
   - Require: Password confirmation
   - Grace period: 30 days for recovery
   - Status codes: 200, 400, 401
   - Archive: User data for 90 days

8. GET /api/users/billing-info
   - Get user billing information
   - Return: Subscription, payment method
   - Status codes: 200, 401
   - Rate limit: 50/hour

REQUIREMENTS FOR ALL ENDPOINTS:
- Input validation (Zod schemas)
- Error handling with specific error codes
- Request/response logging
- Rate limiting (per user/token)
- Pagination where applicable
- Timestamps (created_at, updated_at)
- Transaction support where needed
- Optimistic response handling

CREATE FOLLOWING MIDDLEWARE:

1. /src/middleware/validate-user.ts
   - Check user exists and active
   - Check subscription status
   - Check API limits

2. /src/middleware/rate-limiter.ts
   - Rate limit per endpoint
   - Per-user rate limits
   - Rate limit headers in response

3. /src/middleware/audit-logger.ts
   - Log all mutations
   - Include: user_id, action, timestamp, IP
   - Store in audit_logs table

CREATE VALIDATION SCHEMAS:

In /src/lib/validations/user.ts:
- profileUpdateSchema
- passwordChangeSchema
- preferencesSchema
- profilePictureSchema

CREATE UTILITIES:

In /src/lib/api/user-service.ts:
- Functions for CRUD operations
- Complex queries
- Data transformations
- Business logic

DELIVERABLES:
1. 8 API endpoint files
2. Middleware functions
3. Validation schemas
4. Service utilities
5. Error handling
6. Audit logging

SPECIAL INSTRUCTIONS:
- Follow REST conventions exactly
- Include request/response examples
- Error responses: { error: string, code: string }
- Success responses: { data: object, success: true }
- Document rate limits clearly
- Add JSDoc comments on all functions
```

---

### ✅ PROMPT #5: CORE GRAMMAR CHECK FEATURES
**After:** PROMPT #4 (API - Users)  
**Requires:** Feature_Specification_Complete.md (Grammar Check features)  
**Time:** ~20 minutes  

```
Implementing core grammar checking functionality for GrammarPro.

REFERENCE DOCUMENTS:
- /docs/Feature_Specification_Complete.md (Grammar Check features: F_GRAMMAR_001 to F_GRAMMAR_015)
- /docs/API_Documentation_Complete.md (Grammar endpoints)
- /docs/Technical_Architecture_Complete.md (NLP integration)

TASK 5: GRAMMAR CHECK ENGINE

1. CREATE GRAMMAR CHECK API ENDPOINT:
   POST /api/grammar/check
   
   Request:
   {
     text: string (max 50,000 chars),
     language: "en" | "es" | "fr" | "de" (required),
     check_types: string[] (grammar, spelling, style, tone),
     context: "academic" | "professional" | "casual" (optional)
   }
   
   Response:
   {
     checks: [
       {
         id: string,
         type: "grammar" | "spelling" | "style",
         position: { start: number, end: number },
         message: string,
         suggestion: string,
         confidence: 0-100,
         category: string
       }
     ],
     score: number (0-100),
     readability: { flesch_kincaid: number, complexity: string },
     stats: { words: number, sentences: number, paragraphs: number }
   }

2. IMPLEMENT NLP PIPELINE:
   Create /src/lib/nlp/grammar-engine.ts:
   
   A. Text Preprocessing:
   - Tokenization (sentences, words)
   - Lemmatization
   - POS tagging (using spaCy)
   - Dependency parsing
   
   B. Grammar Analysis:
   - Subject-verb agreement
   - Tense consistency
   - Pronoun references
   - Article usage
   - Preposition usage
   - Run-on sentences
   - Fragment detection
   
   C. Spelling Check:
   - Typo detection
   - Suggestion generation
   - Context-aware corrections
   - Domain-specific dictionary
   
   D. Style Analysis:
   - Passive voice detection
   - Wordiness detection
   - Repetition detection
   - Cliché detection
   - Formality level detection
   
   E. Tone Analysis (using BERT):
   - Sentiment detection
   - Formality level
   - Intensity level
   - Bias detection

3. CREATE SUGGESTION ENGINE:
   In /src/lib/nlp/suggestion-engine.ts:
   
   - Generate 1-3 suggestions per error
   - Confidence scoring (80-100%)
   - Explanation of suggestion
   - Examples of correct usage
   - Learning links (optional)

4. CREATE CACHE LAYER:
   In /src/lib/cache/grammar-cache.ts:
   
   - Cache common phrases (24 hour TTL)
   - Cache user preferences
   - Cache domain-specific terminology
   - Redis integration

5. CREATE GRAMMAR CHECK SERVICE:
   In /src/services/grammar-service.ts:
   
   Functions:
   - checkText(text, language, options)
   - getScore(checks)
   - getReadabilityScore(text)
   - formatResponse(checks, stats)
   - saveCheckHistory(userId, checks)
   - getCheckHistory(userId, limit)

6. IMPLEMENT REAL-TIME CHECKING:
   In /src/lib/websocket/grammar-socket.ts:
   
   - WebSocket connection for real-time checks
   - Debounce text input (500ms)
   - Stream results as they complete
   - Connection management
   - Error recovery

7. CREATE FRONTEND HOOKS:
   In /src/hooks/useGrammarCheck.ts:
   
   - useCheckText(text, options)
   - useRealTimeCheck(text, options)
   - useCheckHistory()
   - useSaveCheck(text, results)

8. DATABASE OPERATIONS:
   In /src/lib/db/grammar-queries.ts:
   
   - Save check result
   - Fetch check history
   - Get user statistics
   - Delete old checks (>90 days)
   - Update user stats

REQUIREMENTS:
- Performance: Check < 1 second for 5,000 chars
- Accuracy: >95% on standard English
- Multiple languages supported
- Real-time suggestions capability
- Offline fallback (cached suggestions)
- Privacy: No text stored permanently
- GDPR compliant: Texts deleted after 90 days

DELIVERABLES:
1. Grammar check API endpoint
2. NLP pipeline (5 components)
3. Suggestion engine
4. Cache layer
5. Database service
6. WebSocket handler
7. Frontend hooks
8. Error handling

SPECIAL INSTRUCTIONS:
- Performance is critical
- Use spaCy + BERT models
- Implement batch processing
- Handle large texts efficiently
- Include retry logic
- Stream results when possible
- Add detailed error messages
- Include usage tracking
```

---

### ✅ PROMPT #6: DOCUMENT EDITOR UI COMPONENTS
**After:** PROMPT #5 (Grammar engine)  
**Requires:** UI_UX_Design_Application_Guide.md  
**Time:** ~18 minutes  

```
Building UI components for the document editor based on design system.

REFERENCE DOCUMENTS:
- /docs/UI_UX_Design_System_Complete.md (Complete design specs)
- /docs/UI_UX_Design_Application_Guide.md (Component details)
- /docs/Wireframes_Design_System.md (Layout specs)

TASK 6: EDITOR COMPONENTS & UI

1. CREATE DESIGN SYSTEM UTILITIES:
   In /src/styles/design-system.ts:
   
   - Color constants (exact from UI_UX_Design_System_Complete.md)
   - Typography scale (11 sizes: 48px to 11px)
   - Spacing scale (4px units, 16 levels)
   - Animation timings (5 speeds: 0-600ms)
   - Breakpoints (mobile, tablet, desktop)
   - Shadow definitions
   - Border radius standards
   - Z-index scale

2. CREATE TAILWIND CONFIGURATION:
   Extend /tailwind.config.js:
   
   - Custom colors (70/20/8/2 distribution)
   - Typography scale (all 11 sizes)
   - Spacing scale (all 16 levels)
   - Animation configurations
   - Custom utilities
   - Dark mode support

3. CREATE BASE COMPONENTS:
   In /src/components/base folder:
   
   A. Button Component (/Button.tsx)
      - 4 variants: primary, secondary, tertiary, ghost
      - 3 sizes: large, regular, small
      - States: default, hover, active, focus, disabled
      - Props: variant, size, disabled, onClick, children
      - Animation: 150ms ease-out
      - Accessibility: Focus ring, aria-labels
   
   B. Input Component (/Input.tsx)
      - States: default, focus, error, disabled
      - Types: text, email, password, number
      - Validation: Real-time feedback
      - Label + Helper text support
      - Icon support (left/right)
      - Character counter (optional)
      - Height: 44px (touch target)
   
   C. Card Component (/Card.tsx)
      - Padding: 24px (breathing room)
      - Border: 1px solid #E5E7EB
      - Radius: 12px
      - Shadow: Elevated on hover
      - Hover animation: translateY(-4px)
      - Responsive: Stacks on mobile
   
   D. Typography Components
      - Heading (H1 to H6)
      - Paragraph
      - Label
      - Caption
      - Lead text
      - All with correct font sizes/weights
   
   E. Alert Component
      - 4 types: success, error, warning, info
      - Icons + text
      - Dismissible option
      - Colors from design system

4. CREATE EDITOR-SPECIFIC COMPONENTS:
   In /src/components/editor folder:
   
   A. Editor Container (/EditorContainer.tsx)
      - Main editor area
      - Toolbar at top
      - Sidebar (optional)
      - Grammar panel on right
      - Responsive layout
   
   B. Text Editor (/TextEditor.tsx)
      - Monaco Editor integration
      - Real-time grammar checking
      - Syntax highlighting
      - Line numbers
      - Word/char counter
      - Save indicator
      - Auto-save (every 30 seconds)
   
   C. Grammar Panel (/GrammarPanel.tsx)
      - List of issues
      - Grouped by type (grammar, spelling, style)
      - Click to highlight in editor
      - Show suggestions
      - Accept/Ignore buttons
   
   D. Suggestions Tooltip (/SuggestionTooltip.tsx)
      - Show on hover over error
      - Display suggestions
      - Quick fix buttons
      - Explanation text
   
   E. Editor Toolbar (/EditorToolbar.tsx)
      - Save button (primary)
      - Format button
      - Check grammar button
      - Undo/Redo
      - Share button
      - Settings dropdown
   
   F. Document Stats (/DocumentStats.tsx)
      - Word count
      - Character count
      - Sentence count
      - Reading time
      - Readability score
      - Real-time updates

5. CREATE LAYOUT COMPONENTS:
   In /src/components/layout folder:
   
   A. Header (/Header.tsx)
      - Logo
      - Navigation
      - User menu
      - Theme toggle
      - Responsive menu on mobile
   
   B. Sidebar (/Sidebar.tsx)
      - Document list
      - Folders/collections
      - Search
      - New document button
      - Collapsible on mobile
   
   C. MainLayout (/MainLayout.tsx)
      - Header + Sidebar + Content
      - Responsive grid
      - Proper spacing
      - Mobile optimization

6. IMPLEMENT DESIGN TOKENS:
   Create /src/tokens.ts:
   
   - Export all design constants
   - Color tokens with names (not hex)
   - Typography tokens
   - Spacing tokens
   - Animation tokens
   - Use in all components

7. CREATE HOOKS FOR DESIGN:
   In /src/hooks folder:
   
   - useTheme() - Dark/light mode
   - useResponsive() - Breakpoint detection
   - useAnimation() - Animation controls
   - useColors() - Color theme access

REQUIREMENTS:
- Follow design system EXACTLY (from UI_UX_Design_System_Complete.md)
- Minimalistic luxury approach
- Clear visual hierarchy (6 levels)
- 70% neutral colors (breathing room)
- Responsive by default (mobile first)
- WCAG AA accessibility (contrast 4.5:1+)
- Animations < 300ms
- No TypeScript errors
- Storybook-ready components

COMPONENT CHECKLIST:
✓ Button (4 variants, all states)
✓ Input (all variations)
✓ Card (responsive)
✓ Typography (11 sizes)
✓ Alert (4 types)
✓ Editor container
✓ Text editor
✓ Grammar panel
✓ Suggestions tooltip
✓ Toolbar
✓ Stats display
✓ Layout components

DELIVERABLES:
1. Design system utilities
2. Tailwind configuration
3. Base components (5)
4. Editor components (6)
5. Layout components (3)
6. Design tokens
7. Hooks (4)
8. Storybook stories (optional)

SPECIAL INSTRUCTIONS:
- Create production-ready components
- Include PropTypes/TypeScript
- Add comprehensive JSDoc comments
- Make fully reusable and composable
- Export from index files for clean imports
- Include hover/focus states
- Dark mode support built-in
- Accessibility features on all components
```

---

### ✅ PROMPT #7: DOCUMENT MANAGEMENT FEATURES
**After:** PROMPT #6 (UI Components)  
**Requires:** Feature_Specification_Complete.md (Document features)  
**Time:** ~15 minutes  

```
Implementing document management features (create, read, update, delete, share).

REFERENCE DOCUMENTS:
- /docs/Feature_Specification_Complete.md (Document management features)
- /docs/API_Documentation_Complete.md (Document endpoints)
- /docs/Database_Schema_Detailed.md (documents table)

TASK 7: DOCUMENT MANAGEMENT

1. CREATE DOCUMENT ENDPOINTS:
   In /src/app/api/documents folder:
   
   A. POST /api/documents (Create)
      Request: { title: string, content: string }
      Response: { id, title, content, created_at, owner_id }
      Validation: Title required, max 200 chars
      Auth: Required
   
   B. GET /api/documents (List)
      Query params: limit, offset, sort, search
      Response: { documents: [], total: number, hasMore: boolean }
      Pagination: 20 per page max
      Sorting: By created_at, updated_at, title
   
   C. GET /api/documents/:id (Read)
      Response: Full document object
      Check: User has permission
      Cache: 5 minutes
   
   D. PUT /api/documents/:id (Update)
      Request: { title?, content?, is_archived? }
      Response: Updated document
      Validation: User is owner/editor
      Conflict: Handle concurrent edits
   
   E. DELETE /api/documents/:id (Delete)
      Soft delete (set deleted_at)
      Recovery: 30 days grace period
      Permanent: After 30 days
   
   F. POST /api/documents/:id/share (Share)
      Request: { email: string, permission: "viewer"|"editor" }
      Response: Share link or notification
      Permissions: viewer (read), editor (write)
   
   G. GET /api/documents/:id/versions (History)
      Response: List of previous versions
      Include: timestamp, author, changes
      Limit: Last 50 versions

2. CREATE DOCUMENT SERVICE:
   In /src/services/document-service.ts:
   
   Functions:
   - createDocument(userId, data)
   - getDocument(documentId, userId)
   - listDocuments(userId, filters)
   - updateDocument(documentId, userId, data)
   - deleteDocument(documentId, userId)
   - shareDocument(documentId, userId, shareData)
   - getDocumentVersions(documentId, userId)
   - restoreVersion(documentId, versionId, userId)
   - searchDocuments(userId, query)

3. CREATE DATABASE QUERIES:
   In /src/lib/db/document-queries.ts:
   
   - SQL queries for all CRUD operations
   - Parameterized queries (prevent SQL injection)
   - Transaction support for atomic operations
   - Include soft delete logic
   - Include permission checks

4. IMPLEMENT CONFLICT RESOLUTION:
   In /src/lib/sync/document-sync.ts:
   
   For concurrent edits:
   - Last-write-wins (default)
   - Merge strategies (optional)
   - Conflict notification
   - Version branching (if enabled)

5. CREATE FRONTEND HOOKS:
   In /src/hooks folder:
   
   - useDocuments() - List all documents
   - useDocument(id) - Get single document
   - useCreateDocument() - Create new
   - useUpdateDocument(id) - Update existing
   - useDeleteDocument(id) - Delete
   - useShareDocument(id) - Share functionality
   - useDocumentHistory(id) - Get versions

6. CREATE PAGES/ROUTES:
   In /src/app folder:
   
   A. /app/documents (List page)
      - Display all user documents
      - Search & filter
      - Sort options
      - New document button
   
   B. /app/documents/:id (Editor page)
      - Document editor
      - Real-time updates
      - Save status
      - Share panel
   
   C. /app/documents/:id/shared (Shared with me)
      - Show documents shared by others
      - Permission indicators
   
   D. /app/documents/trash (Trash page)
      - Show soft-deleted documents
      - Restore button
      - Permanent delete option

7. IMPLEMENT REAL-TIME SYNC:
   In /src/lib/sync/realtime-sync.ts:
   
   - WebSocket for live updates
   - Conflict detection
   - Merge changes from other users
   - Optimistic updates on client
   - Sync on focus/reconnect

REQUIREMENTS:
- Soft delete (30-day recovery)
- Permission system (owner, editor, viewer)
- Conflict resolution for concurrent edits
- Version history (last 50 versions)
- Real-time sync capability
- Search by title and content
- Sort by created_at, updated_at, title
- Pagination (20 per page)
- Audit logging on all changes

DATABASE OPERATIONS:
✓ Create document
✓ Read document
✓ List documents (with search)
✓ Update document
✓ Delete document (soft)
✓ Permanently delete
✓ Share document
✓ Get versions
✓ Restore version
✓ Track permissions

DELIVERABLES:
1. 7 API endpoints
2. Document service
3. Database queries
4. Conflict resolution
5. Frontend hooks
6. 4 pages/routes
7. Real-time sync
8. Error handling

SPECIAL INSTRUCTIONS:
- Implement transactions for consistency
- Handle race conditions
- Include detailed logging
- Make it production-ready
- Test edge cases (concurrent edits)
- Document all API responses
- Include error codes
```

---

### ✅ PROMPT #8: SUBSCRIPTION & BILLING
**After:** PROMPT #7 (Document Management)  
**Requires:** Feature_Specification_Complete.md (Billing features)  
**Time:** ~12 minutes  

```
Implementing subscription and billing system using Stripe.

REFERENCE DOCUMENTS:
- /docs/Feature_Specification_Complete.md (Billing features)
- /docs/API_Documentation_Complete.md (Billing endpoints)
- /docs/Security_Compliance_Performance.md (PCI compliance)

TASK 8: SUBSCRIPTION & BILLING

1. STRIPE INTEGRATION:
   Create /src/lib/stripe/stripe-client.ts:
   
   - Initialize Stripe client
   - Webhook signature verification
   - Error handling
   - Retry logic
   - Request logging

2. CREATE PRICING PLANS:
   In /src/data/pricing-plans.ts:
   
   Plans (from Feature Specification):
   
   A. Free Plan
      - Price: $0/month
      - Features: 5,000 words/month, 10 checks/day
      - Stripe product: price_free
   
   B. Pro Plan
      - Price: $9.99/month
      - Features: Unlimited words, 100 checks/day, API access
      - Stripe product: price_pro_monthly
   
   C. Professional Plan
      - Price: $19.99/month
      - Features: Everything + Priority support
      - Stripe product: price_pro_monthly_high
   
   D. Enterprise (custom)
      - Price: Custom
      - Features: Custom limits, dedicated support
      - Contact sales

3. CREATE BILLING ENDPOINTS:
   In /src/app/api/billing folder:
   
   A. GET /api/billing/plans
      Response: List of all plans with features
      Cache: 1 hour
   
   B. POST /api/billing/checkout
      Request: { plan_id: string }
      Response: { checkout_url: string }
      Create Stripe session
   
   C. GET /api/billing/subscription
      Response: Current subscription details
      Include: Plan, status, renew date, payment method
   
   D. POST /api/billing/cancel
      Request: { reason?: string }
      Response: Cancellation confirmation
      Set: subscription.status = "cancelled"
      Schedule: Immediate or end-of-period
   
   E. POST /api/billing/update-payment
      Request: { payment_method_id: string }
      Response: Success confirmation
   
   F. GET /api/billing/invoices
      Query params: limit, offset
      Response: List of invoices with download links
   
   G. POST /api/billing/webhook
      Stripe webhook handler
      Events: payment_intent.succeeded, customer.subscription.updated
      Update: Database with subscription changes

4. CREATE SUBSCRIPTION SERVICE:
   In /src/services/subscription-service.ts:
   
   Functions:
   - getSubscription(userId)
   - createSubscription(userId, planId)
   - updateSubscription(userId, planId)
   - cancelSubscription(userId, reason)
   - getInvoices(userId)
   - downloadInvoice(invoiceId)
   - updatePaymentMethod(userId, paymentMethodId)
   - handleStripeWebhook(event)

5. CREATE USAGE TRACKING:
   In /src/lib/usage/usage-tracker.ts:
   
   - Track words checked (daily)
   - Track checks performed (daily)
   - Track API calls (monthly)
   - Reset counters on subscription renew
   - Check against plan limits
   - Return usage in responses

6. CREATE USAGE LIMIT MIDDLEWARE:
   In /src/middleware/usage-limiter.ts:
   
   - Check if user exceeds limits
   - Return 429 if over limit
   - Include reset time in response
   - Log limit violations
   - Track for analytics

7. CREATE BILLING PAGE:
   In /src/app/settings/billing:
   
   A. /settings/billing (Main)
      - Current plan info
      - Upgrade/downgrade buttons
      - Cancel subscription button
      - Payment method section
      - Invoices list
   
   B. /settings/billing/plans
      - Compare all plans
      - Feature comparison table
      - Upgrade/downgrade flows
   
   C. /settings/billing/invoices
      - List all invoices
      - Download links
      - Print option
      - Email receipt option

8. CREATE FRONTEND HOOKS:
   In /src/hooks folder:
   
   - useSubscription() - Current subscription
   - useBillingPlans() - All available plans
   - useCheckout(planId) - Start checkout
   - useCancelSubscription() - Cancel subscription
   - useUpdatePayment() - Update payment method
   - useUsage() - Current usage stats
   - useInvoices() - List invoices

REQUIREMENTS:
- PCI-DSS compliant (payment processing)
- No card storage on our servers (Stripe handles)
- Webhook verification (signature check)
- Transaction logging for audit
- Subscription state machine (active, cancelled, expired)
- Graceful downgrade (keep user data)
- Refund support (pro-rata refunds)
- Usage tracking per plan
- Rate limiting per plan tier

BILLING EVENTS TO LOG:
✓ Subscription created
✓ Payment succeeded
✓ Payment failed
✓ Subscription updated
✓ Subscription cancelled
✓ Invoice generated
✓ Refund issued

DELIVERABLES:
1. Stripe integration
2. Pricing plan configuration
3. 7 Billing endpoints
4. Subscription service
5. Usage tracking
6. Rate limiting middleware
7. Billing pages (3)
8. Frontend hooks
9. Webhook handler

SPECIAL INSTRUCTIONS:
- Follow Stripe best practices
- Implement retry logic for API calls
- Handle webhook idempotency
- Test with Stripe test cards
- Log all financial transactions
- Include detailed error messages
- Document billing flows
- Create admin billing dashboard (optional)
```

---

## 🎯 NEXT PROMPTS (Summary)

**PROMPT #9:** Testing Setup & Unit Tests  
**PROMPT #10:** E2E Testing & Quality Assurance  
**PROMPT #11:** Deployment & Environment Setup  
**PROMPT #12:** Monitoring & Analytics  
**PROMPT #13:** Performance Optimization  
**PROMPT #14:** Security Hardening  
**PROMPT #15:** Launch Checklist  

---

## 📋 USAGE INSTRUCTIONS

### How to Use These Prompts in Cursor:

1. **Copy this entire document** to your project
2. **Follow prompts in sequence**
3. **After each prompt:**
   - Review generated code
   - Run tests if available
   - Commit to Git
   - Move to next prompt

4. **Reference documents** as Cursor works through them
5. **Keep this guide open** while coding

### Key Points:

✓ Each prompt builds on previous ones  
✓ Do NOT skip ahead  
✓ Test after each major component  
✓ Commit frequently  
✓ Ask Cursor to clarify if needed  

---

**Status:** ✅ Ready for Cursor AI Implementation  
**Estimated Duration:** 8-12 weeks  
**Team Size:** 1-2 developers  
**Output Quality:** Production-Ready  

