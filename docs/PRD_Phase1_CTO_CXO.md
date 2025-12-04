# 📋 PRODUCT REQUIREMENT DOCUMENT (PRD)
## GrammarPro - AI Writing Assistant Platform

**Document Version:** 1.0  
**Created:** December 4, 2025  
**Audience:** CTO, CXO, Product Team  
**Status:** Ready for Implementation  

---

## 📑 EXECUTIVE SUMMARY

GrammarPro is a **SaaS writing assistance platform** designed to compete with Grammarly by providing advanced grammar checking, plagiarism detection, paraphrasing, and team collaboration features. The platform targets students, professional writers, and enterprises with a freemium pricing model.

### Key Metrics
- **Total Pages:** 67
- **Development Timeline:** 9-13 weeks
- **Team Size:** 1-2 developers (with Cursor)
- **Target Users:** 100K+ in Year 1
- **Revenue Model:** Freemium SaaS
- **Primary Stack:** Next.js + NestJS + Supabase

---

## 🎯 PHASE 1: MVP & CORE FEATURES (Weeks 1-7)

### Phase 1 Objective
Build and launch a **fully functional writing assistance platform** with basic grammar checking, user authentication, document management, and payment system.

### Phase 1 Timeline
- **Weeks 1-3:** MVP Development
- **Weeks 4-7:** Core Features & Launch

---

# PHASE 1 PART A: MVP (Weeks 1-3)

## 🏠 1. HOME / LANDING PAGE

### Page Purpose
First impression, value proposition, conversion to sign-up

### URL Structure
- `/` (public)
- Mobile responsive: Yes
- SEO Priority: Critical (H1, meta, structured data)

### Technical Stack
- Next.js (App Router)
- Server Components for SEO
- Lexical editor integration (demo)

### Subsections & Features

#### 1.1 HERO SECTION
**Content Strategy (High Conversion):**
```
Headline: "Write Better, Faster, Smarter with AI"
Subheading: "Professional-grade grammar checking + AI writing tools. 
            Used by 100,000+ writers worldwide."

Key Features Highlighted:
- ✓ Real-time grammar checking (99% accurate)
- ✓ AI-powered paraphrasing & rewriting
- ✓ Plagiarism detection across 8B+ web pages
- ✓ Works everywhere (web, Google Docs, Word, Gmail)

CTA Button: "Start Writing Free" (primary)
Secondary CTA: "Watch Demo Video" (secondary)

Visual: 
- Animated writing interface mockup
- Live grammar checking demo
- Error highlighting animation

SEO Optimization:
- H1: "AI Writing Assistant for Perfect Grammar & Style"
- Meta Description: "Free AI grammar checker, plagiarism detector & writing assistant. 
  Get real-time suggestions for grammar, tone, and plagiarism. No credit card required."
- Schema.org: SoftwareApplication markup
- Keywords: AI writing assistant, grammar checker, plagiarism detector, writing tool
```

**Mobile Considerations:**
- Stacked layout (vertical)
- Touch-optimized buttons (48px min)
- Video autoplay disabled
- Responsive typography (16px base on mobile)

#### 1.2 VALUE PROPOSITION SECTION
**Content:**
```
Section Title: "Why Choose GrammarPro?"

3-Column Layout:
1. ✓ 99% Accurate Grammar Detection
   - spaCy + BERT AI models
   - Context-aware corrections
   - Explains every error

2. ✓ Save 10+ Hours Per Week
   - Auto-save documents
   - Real-time suggestions
   - One-click improvements

3. ✓ Works Everywhere You Write
   - Web editor
   - Google Docs
   - Microsoft Word
   - Gmail integration

Visual: Icons + short descriptions
CTA: "Get Started Free"
```

#### 1.3 FEATURES SHOWCASE SECTION
**Content:**
```
Section Title: "Powerful Features, Simple to Use"

Feature Carousel (4 features):
1. Grammar & Spelling
   - Real-time detection
   - Instant corrections
   - Full explanation

2. Plagiarism Check
   - Scan against 8B+ pages
   - Originality percentage
   - Source citations

3. Tone & Style
   - Detect writing tone
   - Adjust formality level
   - Match brand voice

4. Paraphrasing & Rewriting
   - Multiple rewrite options
   - Maintain meaning
   - Change style/tone

Visuals: Screenshots + animations
Mobile: Vertical scroll instead of carousel
```

#### 1.4 PRICING PREVIEW SECTION
**Content:**
```
Section Title: "Plans for Every Writer"

3-Column Pricing Cards:

FREE - $0/month
- 5 documents
- Basic grammar
- 100 AI prompts
- 1GB storage
CTA: "Start Free"

PRO - $10/month (annual)
- Unlimited documents
- Advanced grammar
- 2,000 AI prompts
- 50GB storage
- Plagiarism check
- Browser extension
HIGHLIGHT: "Most Popular" badge
CTA: "Start 7-Day Trial"

BUSINESS - Custom pricing
- Everything in PRO
- Unlimited team
- Advanced analytics
- Admin panel
- SSO login
CTA: "Contact Sales"

Mobile: Stacked cards, scrollable
```

#### 1.5 SOCIAL PROOF SECTION
**Content:**
```
Section Title: "Trusted by 100,000+ Writers"

Statistics:
- 100,000+ Active Users
- 50M+ Documents Checked
- 4.8/5 Average Rating
- 99% Accuracy Rate

Testimonials (3 cards):
1. Student Quote:
   "Improved my grades by 15% in the first month."
   - Sarah M., University Student

2. Professional Quote:
   "Saves me hours every week on writing."
   - John P., Content Creator

3. Team Quote:
   "Best investment for our writing team."
   - Emily K., Marketing Manager

Visuals: Profile pics + names + role
Mobile: Vertical scroll
```

#### 1.6 FAQ SECTION
**Content:**
```
Section Title: "Common Questions"

Expandable Q&A (5 items):
1. Q: Is GrammarPro really free?
   A: Yes! Free plan includes basic grammar checking, 5 documents, 
      and 100 AI prompts per month.

2. Q: How accurate is the grammar detection?
   A: 99% accurate using advanced AI models (spaCy + BERT). 
      We use the same technology as professional editors.

3. Q: Can I use it with Google Docs?
   A: Yes! Browser extension works with Google Docs, Gmail, and most websites.

4. Q: Is my data secure?
   A: Yes. AES-256 encryption, GDPR/SOC 2 compliant.

5. Q: What payment methods do you accept?
   A: Credit card (Visa, Mastercard), PayPal, and Apple Pay.

Mobile: Collapsible accordion
```

#### 1.7 CTA FOOTER SECTION
**Content:**
```
Section Title: "Start Writing Better Today"

Main CTA: "Start Writing Free - No Credit Card Required"
Secondary: "Schedule Demo"

Social Proof: "Join 100,000+ writers already improving"

Footer:
- Links: Features, Pricing, Blog, About, Contact
- Legal: Privacy Policy, Terms of Service
- Social: Twitter, LinkedIn, GitHub
- Contact: support@grammarpro.com
```

---

## 📝 2. SIGN UP PAGE

### Page Purpose
Convert visitors to users (Free tier signup)

### URL Structure
- `/signup` (public)
- Mobile responsive: Yes
- SEO Priority: Medium

### Subsections

#### 2.1 SIGNUP FORM SECTION
**Content:**
```
Headline: "Join 100,000+ Writers"
Subheading: "Sign up now and get immediate access to GrammarPro"

Form Fields:
1. Full Name (text input)
2. Email (email input)
3. Password (password input, strength indicator)
4. Confirm Password (password input)

Form Features:
- Real-time validation
- Password strength meter (Weak/Fair/Strong)
- Show/hide password toggle
- Remember me checkbox
- Terms & Privacy checkbox

CTA Button: "Create Account" (primary button, 48px height)
Link: "Already have an account? Log in"

Visual: Left side - form, Right side - Benefits list

Mobile:
- Single column layout
- Larger touch targets (56px buttons)
- Optimized for thumbs
```

#### 2.2 BENEFITS SIDEBAR (DESKTOP ONLY)
**Content:**
```
Why Sign Up Now:
✓ Free forever - No credit card needed
✓ Instant access to all free features
✓ 5 documents included
✓ 100 AI prompts/month
✓ Real-time grammar checking
✓ Plagiarism detection basics

Visual: Icons + checkmarks
Background: Subtle gradient
```

#### 2.3 SOCIAL LOGIN SECTION
**Content:**
```
"Or sign up with:"

Buttons:
- Google Login (OAuth)
- GitHub Login (OAuth)

Visual: Centered, below form
Mobile: Full-width buttons
```

---

## 🔑 3. LOGIN PAGE

### Page Purpose
User authentication

### URL Structure
- `/login` (public)
- Mobile responsive: Yes

### Subsections

#### 3.1 LOGIN FORM
**Content:**
```
Headline: "Welcome Back"
Subheading: "Sign in to your account"

Form Fields:
1. Email (email input)
2. Password (password input)
3. Remember me (checkbox)

CTA Button: "Sign In" (primary)
Link: "Forgot password?"

Social Login:
- Google
- GitHub

Link: "Don't have an account? Sign up"

Mobile: Optimized form, full-width inputs
```

---

## 🏠 4. USER DASHBOARD

### Page Purpose
User workspace, document management hub

### URL Structure
- `/dashboard` (authenticated)
- Mobile responsive: Yes

### Subsections

#### 4.1 HEADER / NAVIGATION
**Content:**
```
Left: GrammarPro Logo + "Dashboard"
Center: Search bar ("Search documents...")
Right: 
- Upgrade button (Free → Pro upgrade CTA)
- Profile menu
  - Account settings
  - Billing
  - Logout

Mobile: Hamburger menu, stacked layout
```

#### 4.2 WELCOME BANNER
**Content:**
```
"Welcome back, [User Name]!"
Quick stats:
- 3 documents created
- 2,450 grammar errors fixed
- 15 hours writing time

CTA: "Create New Document" (primary)
Secondary: "View all documents"

Mobile: Stacked, compact design
```

#### 4.3 QUICK ACTIONS SECTION
**Content:**
```
3 Primary Actions:
1. + New Document
2. 📤 Upload File
3. 📚 Browse Templates

Buttons: Icon + Label, 56px height
Mobile: Vertical stack
```

#### 4.4 RECENT DOCUMENTS SECTION
**Content:**
```
Title: "Recent Documents"

Document Cards (Grid):
Each card shows:
- Document title
- Word count
- Last edited (timestamp)
- Grammar score (%)
- 3-dot menu (actions)
  - Rename
  - Share
  - Delete
  - Move to trash

Actions: Click to open editor
Mobile: Single column list view

If no documents:
Empty state message:
"No documents yet. Create your first one to get started!"
CTA: "Create Document"
```

#### 4.5 PLAN INFORMATION SECTION
**Content:**
```
Title: "Your Current Plan: Free"

Plan Details:
- Documents used: 3/5
- Storage used: 850 MB / 1 GB
- AI prompts: 45/100 used this month
- Features available: [list]

Progress bars for each metric

CTA: "Upgrade to Pro" (highlight in color)
Benefits of upgrade:
- Unlimited documents
- 50GB storage
- 2,000 AI prompts/month
- Plagiarism detection
- Browser extension

Mobile: Cards layout, stacked
```

---

## 📖 5. EDITOR / WRITING INTERFACE

### Page Purpose
Main writing workspace where users compose and edit documents

### URL Structure
- `/editor/[document-id]` (authenticated)
- Mobile responsive: Yes (simplified on mobile)

### Technical Stack
- Lexical editor (rich text)
- Real-time Supabase sync
- WebSocket for live updates

### Subsections

#### 5.1 TOP TOOLBAR
**Content:**
```
Left:
- Document title (editable)
- Status: Unsaved/Saved
- Auto-save indicator

Center:
- Bold, Italic, Underline buttons
- Text color picker
- Highlight color picker
- Text size selector

Right:
- Share button
- Export (PDF/DOCX)
- Settings
- Menu (more options)

Mobile: Simplified toolbar, essentials only
```

#### 5.2 LEFT SIDEBAR (DESKTOP)
**Content:**
```
Collapsible sidebar:
- Document info
  - Word count
  - Character count
  - Reading time
  - Grammar score
- Quick links
  - Go to grammar issues
  - Go to plagiarism
  - Go to tone issues
- Document history

Mobile: Hidden, accessible via menu
```

#### 5.3 MAIN EDITOR AREA
**Content:**
```
Large text area with:
- Line numbers
- Syntax highlighting (code blocks)
- Real-time spell-check (red underlines)
- Grammar highlighting (grammar errors)
- Paragraph breaks
- Auto-save (every 5 seconds)
- Cursor position indicator

Mobile:
- Simplified layout
- Larger text for readability
- Touch-optimized keyboard
- Simplified toolbar
```

#### 5.4 RIGHT PANEL - SUGGESTIONS & CORRECTIONS
**Content:**
```
Collapsible panel showing:

Title: "Writing Suggestions"

Tabs:
1. Grammar Issues
   - List of errors
   - Error type (icon)
   - Line number
   - Suggested correction
   - Explanation (collapsible)
   - Accept/Ignore buttons

2. Tone & Style
   - Tone detection: "Professional/Casual/Academic"
   - Suggestions for improvement
   - Style consistency warnings

3. Plagiarism (PRO+)
   - Plagiarism percentage
   - Flagged sections
   - Source matches
   - Recommended actions

4. Stats
   - Word count
   - Readability score
   - Average sentence length
   - Grammar score

Mobile: Vertical list, swiping between tabs
```

#### 5.5 FLOATING ACTION BUTTONS (MOBILE)
**Content:**
```
Bottom-right corner:
- Check Grammar (floating button)
- Check Plagiarism (PRO+ only)
- AI Rewrite (PRO+ only)
- Save (always visible)

Swipe up to reveal more options
```

#### 5.6 FOOTER
**Content:**
```
Left: Document status
Center: Character count | Word count | Reading time
Right: Export | Share | Save

Mobile: Compact, essential info only
```

---

## 📄 6. DOCUMENTS LIST PAGE

### Page Purpose
Organized view of all user documents

### URL Structure
- `/documents` (authenticated)
- Mobile responsive: Yes

### Subsections

#### 6.1 HEADER
**Content:**
```
Title: "My Documents"
Subtitle: "You have 3 documents"

Search bar: "Search documents..."
Sort options: 
- Recent
- Name (A-Z)
- Word count
- Last edited

View toggle: Grid | List
Filter: All | Draft | Published | Archived
```

#### 6.2 DOCUMENT LIST/GRID
**Content:**
```
Grid layout (3 columns on desktop):
Each document card:
- Thumbnail/Title
- Document name
- Type (essay, article, email)
- Word count
- Last edited (time)
- Grammar score (%)
- 3-dot menu:
  - Open
  - Rename
  - Share
  - Move to trash
  - Download (PDF/DOCX)

On click: Open in editor

Mobile: Single column list view
```

#### 6.3 BULK ACTIONS (IF MULTIPLE SELECTED)
**Content:**
```
Checkboxes for multi-select
Bulk action toolbar:
- Delete selected
- Archive selected
- Export selected
- Move to folder

Mobile: Hidden until items selected
```

#### 6.4 EMPTY STATE
**Content:**
```
If no documents:
Icon: Empty folder
Heading: "No documents yet"
Subheading: "Create your first document to get started"
CTA: "Create Document"
```

---

## Phase 1A Summary

**Pages Completed:** 6 pages  
**Status:** MVP Foundation  
**Next:** Continue to login flow and authentication pages  

---

# PHASE 1 PART B: AUTHENTICATION & CORE FEATURES (Weeks 2-3)

## 🔐 7. FORGOT PASSWORD PAGE

### URL Structure
- `/forgot-password` (public)

### Subsections

#### 7.1 FORM
**Content:**
```
Headline: "Reset Your Password"
Subheading: "Enter your email and we'll send you a link to reset your password"

Form:
- Email input
- Submit button: "Send Reset Link"

Link: "Back to login"

Success state:
"Check your email! We've sent you a password reset link.
If you don't see it, check your spam folder."

Mobile: Full-width form
```

---

## 🔄 8. RESET PASSWORD PAGE

### URL Structure
- `/reset-password/[token]` (public)

### Subsections

#### 8.1 FORM
**Content:**
```
Headline: "Create New Password"

Form:
- New Password (with strength meter)
- Confirm Password
- Submit button: "Reset Password"

Success:
"Password reset successfully! Redirecting to login..."

Mobile: Optimized form
```

---

## ✅ 9. EMAIL VERIFICATION PAGE

### URL Structure
- `/verify-email/[token]` (public)

### Subsections

#### 9.1 VERIFICATION STATES
**Content:**
```
Loading state:
"Verifying your email..."

Success state:
"Email verified! Redirecting to dashboard..."

Error state:
"Verification link expired. Resend verification email?"
CTA: "Send verification email"

Mobile: Centered, simple layout
```

---

## 💳 PRICING PAGE (Phase 1B, Week 4)

### Page Purpose
Convert free users to paying customers

### URL Structure
- `/pricing` (public)
- Mobile responsive: Yes
- SEO Priority: High

### Subsections

#### PRICING.1 HERO SECTION
**Content:**
```
Headline: "Simple, Transparent Pricing"
Subheading: "Choose the perfect plan for your needs. Always flexible to scale."

Monthly/Annual toggle (saves 33%)

SEO:
- H1: "GrammarPro Pricing Plans - Affordable AI Writing Tools"
- Meta: "Compare our Free, Pro, and Business plans. 
  No credit card required. Cancel anytime."
```

#### PRICING.2 PRICING CARDS
**Content:**
```
3-Column layout:

CARD 1: FREE
- $0/month
- "Perfect for getting started"
- Features:
  ✓ 5 documents
  ✓ 1GB storage
  ✓ Basic grammar
  ✓ 100 AI prompts
  ✗ No plagiarism
  ✗ No advanced features
- CTA: "Start Free"
- Note: "No credit card required"

CARD 2: PRO (HIGHLIGHTED - "Most Popular")
- $10/month annual ($15 monthly)
- "For professional writers"
- Features list (20+ items)
- Popular badge
- CTA: "Start 7-Day Free Trial"
- Note: "All FREE features plus..."

CARD 3: BUSINESS
- Starting at $25/user/month
- "For teams and enterprises"
- Features: (Everything + enterprise)
- CTA: "Contact Sales"
- Note: "Volume discounts available"

Mobile: Stacked vertically, full-width
```

#### PRICING.3 FEATURE COMPARISON TABLE
**Content:**
```
Detailed comparison table:
Rows: All features
Columns: FREE | PRO | BUSINESS

Features:
- Documents (5 | Unlimited | Unlimited)
- Storage (1GB | 50GB | 500GB/user)
- AI Prompts (100 | 2000 | Unlimited)
- Plagiarism Detection (No | Yes | Yes)
- Team Members (1 | 3 | Unlimited)
- Browser Extension (No | Yes | Yes)
- Support (Email 72h | Email 24h | Phone 1h)
- [and 15+ more...]

Mobile: Horizontal scroll table or tabbed
```

#### PRICING.4 FAQ SECTION
**Content:**
```
Common questions:
Q: Can I upgrade anytime?
A: Yes, upgrade anytime and we'll prorate charges.

Q: What's your refund policy?
A: 30-day money-back guarantee.

Q: Do I need a credit card for Free?
A: No credit card required.

Q: Can I change plans?
A: Yes, change or cancel anytime.

Mobile: Expandable accordion
```

#### PRICING.5 CTA FOOTER
**Content:**
```
Still unsure?
"Try Pro free for 7 days. No credit card required."
CTA: "Start Free Trial"

Or
"Talk to our sales team"
CTA: "Schedule Demo"
```

---

## 💰 BILLING & SUBSCRIPTION PAGE

### URL Structure
- `/settings/billing` (authenticated)

### Subsections

#### 10.1 CURRENT PLAN SECTION
**Content:**
```
Title: "Current Plan"

Plan details:
- Plan name: "Pro Annual"
- Status: Active
- Renewal date: Dec 4, 2026
- Cost: $120/year

Actions:
- Upgrade/Downgrade plan
- Cancel subscription
- View invoice history

Visual: Card layout, clear hierarchy
```

#### 10.2 PAYMENT METHOD
**Content:**
```
Title: "Payment Method"

Current card:
- Visa ending in 4242
- Expires: 12/2025

Actions:
- Update payment method
- Add new card
- Set as default

Visual: Card icon + details
```

#### 10.3 BILLING HISTORY
**Content:**
```
Title: "Billing History"

Table:
- Date
- Description
- Amount
- Status
- Action (Download Invoice)

Most recent first
Pagination: 10 items per page
```

#### 10.4 UPGRADE SECTION (If on Free/Pro)
**Content:**
```
If on FREE:
"Unlock Premium Features"
Highlight Pro features
CTA: "Upgrade to Pro"

If on PRO:
"Scale to Business"
Highlight Business features
CTA: "Contact Sales"

Visual: Colored card, prominent
```

---

## 🔧 ACCOUNT SETTINGS PAGE

### URL Structure
- `/settings/account` (authenticated)

### Subsections

#### 11.1 PROFILE INFORMATION
**Content:**
```
Section: Basic Info
- Profile picture (upload)
- Full name
- Email
- Time zone

Save button

Mobile: Single column, touch-friendly inputs
```

#### 11.2 PASSWORD & SECURITY
**Content:**
```
Section: Security
- Current password
- New password (with strength meter)
- Confirm password
- Change password button

Two-factor authentication:
- Enable 2FA toggle
- Backup codes download

Recent activity:
- Show login history (last 10)
- Device name
- Location
- Date/time
- Sign out button

Mobile: Expandable sections
```

#### 11.3 PREFERENCES
**Content:**
```
Section: Preferences
- Language (dropdown)
- Theme (Light/Dark/Auto)
- Email notifications (toggles)
  - Weekly digest
  - New features
  - Tips & tricks
  - Security alerts
- Grammar preference:
  - English variant (US/UK/Canada/Australia)
  - Tone detection sensitivity

Save button
```

#### 11.4 CONNECTED ACCOUNTS
**Content:**
```
Section: Connected Apps
- Google account (connected/not connected)
  - Connect button or Disconnect button
- GitHub account
- Microsoft account

Benefits text: "Connect to use GrammarPro with these apps"
```

---

## 📊 ANALYTICS DASHBOARD PAGE

### URL Structure
- `/analytics` (authenticated)

### Subsections

#### 12.1 OVERVIEW CARDS
**Content:**
```
Top metrics (4 cards):
1. Total documents
   "15 documents"
   Change: +3 this month

2. Total words written
   "45,230 words"
   Change: +12,450 this month

3. Grammar score
   "94% accuracy"
   Trend: Improving

4. Time saved
   "12.5 hours"
   By using GrammarPro

Cards: Icons + large numbers + trend

Mobile: Vertical stack, 2x2 grid
```

#### 12.2 CHARTS SECTION
**Content:**
```
3-Column layout (2 columns on tablet, 1 on mobile):

1. Writing Activity Chart
   - Line chart: Documents written per week
   - 12-week view
   - Hover tooltip

2. Grammar Improvements
   - Bar chart: Grammar errors found
   - Top error types (pie chart)

3. Word Count Trend
   - Area chart: Total words over time

Mobile: Stacked vertically, smaller charts
```

#### 12.3 ERROR BREAKDOWN
**Content:**
```
Title: "Top Grammar Issues"

Table:
- Error type (Grammar, Spelling, Tone, etc)
- Count
- Percentage
- Trend (up/down)

Sort by: Count | Type | Trend
```

#### 12.4 EXPORT ANALYTICS
**Content:**
```
Button: "Export Report"
- Generate PDF
- Generate CSV
- Email report

Date range selector: Last 30/90/365 days
```

---

# PHASE 1 IMPLEMENTATION PLAN

## Week-by-Week Breakdown

### Week 1-3: MVP Development

**Team:** 1 Frontend + 1 Backend Developer (with Cursor)

#### Days 1-3: Setup & Foundation
```
✓ Next.js project setup + TypeScript
✓ NestJS backend setup
✓ Supabase database setup
✓ Authentication schema (users table)
✓ Document schema (documents table)
✓ Environment variables configuration
✓ Cursor .cursorules file creation
```

**Cursor Prompt:**
```
@agent Setup Next.js 14 + React 18 with TypeScript, 
TailwindCSS, and shadcn/ui. Create auth routes, 
dashboard layout, and Supabase integration with proper types.
```

#### Days 4-7: Authentication System
```
✓ Email/Password signup
✓ Email/Password login
✓ JWT authentication
✓ Password reset flow
✓ Email verification
✓ Session management
✓ Protected routes
```

**Cursor Prompt:**
```
@agent Implement NextAuth.js integration with Supabase. 
Create signup, login, forgot-password, reset-password flows. 
Add email verification with nodemailer.
```

#### Days 8-10: Core Pages
```
✓ Landing page (hero + CTA)
✓ Pricing page (basic)
✓ Dashboard page
✓ Documents list
✓ Navigation & header
✓ Mobile responsiveness
```

**Cursor Prompt:**
```
@agent Create landing page with hero section, 
features showcase, pricing cards, testimonials, 
and FAQ section. Make fully responsive and SEO-optimized.
```

#### Days 11-15: Editor & Real-time Sync
```
✓ Lexical editor integration
✓ Supabase real-time sync
✓ Document auto-save
✓ Text formatting (bold, italic, etc)
✓ Edit history tracking
✓ Mobile editor UI
```

**Cursor Prompt:**
```
@agent Integrate Lexical editor with Supabase real-time. 
Implement auto-save every 5 seconds, version history, 
and collaborative cursor positions.
```

### Week 4-7: Core Features

#### Days 1-4: Grammar Checking Integration
```
✓ spaCy microservice setup
✓ API integration (NestJS)
✓ Grammar error detection
✓ Real-time suggestions
✓ Error highlighting in editor
✓ Suggestion panel UI
```

**Cursor Prompt:**
```
@agent Create Python FastAPI microservice for spaCy 
grammar checking. Set up NestJS API endpoint that calls 
microservice and returns real-time suggestions.
```

#### Days 5-7: Payment System
```
✓ Stripe integration (NestJS)
✓ Payment method management
✓ Subscription plan setup
✓ Webhook handlers
✓ Invoice generation
```

**Cursor Prompt:**
```
@agent Integrate Stripe with NestJS. Create subscription 
plans (Free, Pro, Business), handle payments, webhooks, 
and invoice generation.
```

#### Days 8-11: Pricing Page & Billing
```
✓ Pricing page completion
✓ Billing dashboard
✓ Plan upgrade/downgrade
✓ Subscription management
✓ Invoice history
```

#### Days 12-14: Testing & Optimization
```
✓ Unit tests (Jest)
✓ Integration tests
✓ E2E tests (Cypress)
✓ Performance optimization
✓ Load testing
✓ Security audit
```

#### Days 15-18: Deployment
```
✓ Frontend deployment (Vercel)
✓ Backend deployment (Railway)
✓ Database setup (Supabase)
✓ Environment configuration
✓ Monitoring setup (Sentry)
✓ Analytics setup (Mixpanel)
```

---

## API REQUIREMENTS - PHASE 1

### APIs TO BUILD (Custom)

#### 1. Authentication APIs
```
POST /api/auth/signup
- Email, password, name
- Returns: User object, JWT token
- Sends: Verification email

POST /api/auth/login
- Email, password
- Returns: User object, JWT token

POST /api/auth/verify-email
- Token (from email)
- Returns: Verification status

POST /api/auth/forgot-password
- Email
- Sends: Reset link

POST /api/auth/reset-password
- Token, new password
- Returns: Success/error

POST /api/auth/refresh-token
- Refresh token
- Returns: New access token
```

#### 2. Document APIs
```
GET /api/documents
- Returns: List of user documents (paginated)

POST /api/documents
- Title, type, content
- Returns: Created document

GET /api/documents/:id
- Returns: Full document object

PUT /api/documents/:id
- Title, content, metadata
- Returns: Updated document

DELETE /api/documents/:id
- Soft delete

GET /api/documents/:id/history
- Returns: Version history

POST /api/documents/:id/export
- Format (pdf, docx, md)
- Returns: File download URL
```

#### 3. Grammar Checking APIs
```
POST /api/grammar/check
- Text (document content)
- Returns: Array of grammar errors with suggestions
- Error structure:
  {
    id: string,
    type: "GRAMMAR" | "SPELLING" | "PUNCTUATION",
    start: number,
    end: number,
    original: string,
    suggestions: string[],
    explanation: string,
    confidence: 0-100
  }

GET /api/grammar/stats/:documentId
- Returns: Grammar statistics
```

#### 4. User APIs
```
GET /api/user/profile
- Returns: User profile data

PUT /api/user/profile
- Name, timezone, language_preference
- Returns: Updated profile

GET /api/user/preferences
- Returns: User preferences

PUT /api/user/preferences
- Theme, notifications, etc
- Returns: Updated preferences

POST /api/user/change-password
- Current password, new password
- Returns: Success/error

GET /api/user/activity
- Returns: Recent activity log

DELETE /api/user/account
- Permanent deletion
```

#### 5. Billing APIs
```
GET /api/billing/subscription
- Returns: Current subscription

PUT /api/billing/subscription
- Plan ID
- Returns: Updated subscription

POST /api/billing/payment-method
- Card details
- Returns: Payment method ID

GET /api/billing/invoices
- Returns: List of invoices

GET /api/billing/invoices/:id
- Returns: Invoice details (PDF URL)

POST /api/billing/cancel-subscription
- Reason (optional)
- Returns: Cancellation confirmation
```

### Third-Party APIs TO INTEGRATE

#### 1. Stripe API
```
Purpose: Payment processing
Endpoints:
- Create payment intent
- Create subscription
- Manage payment methods
- Handle webhooks (payment.success, payment.failed)

NestJS Package: @nestjs/stripe
```

#### 2. SendGrid API
```
Purpose: Email delivery
Endpoints:
- Send verification email
- Send password reset email
- Send invoice email
- Send notification emails

NestJS Package: @sendgrid/mail
```

#### 3. Supabase APIs
```
Purpose: Database & real-time
Endpoints:
- Create/Read/Update/Delete operations
- Real-time subscriptions
- Storage for file uploads
- Authentication

NestJS Package: @supabase/supabase-js
```

#### 4. spaCy API (Custom Microservice)
```
Purpose: Grammar checking
Endpoint: POST /check-grammar
Input: { text: string }
Output: { errors: Error[] }

Technology: Python FastAPI
Deployment: Docker container on Railway
```

---

## SUPABASE SCHEMA - PHASE 1

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR NOT NULL,
  content TEXT,
  document_type VARCHAR, -- essay, article, email, etc
  word_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- Document versions (for history)
CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  plan_type VARCHAR, -- FREE, PRO, BUSINESS
  stripe_subscription_id VARCHAR,
  status VARCHAR, -- active, cancelled, past_due
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

---

## USER FLOWS - PHASE 1

### Flow 1: New User Sign-Up
```
Landing Page
    ↓ Click "Start Free"
Signup Page
    ↓ Fill form (name, email, password)
Backend validates
    ↓ Create user in Supabase
Send verification email
    ↓ User clicks verification link
Email verified
    ↓ Redirect to dashboard
Dashboard shown
    ↓ Free plan activated
Ready to create document
```

### Flow 2: Document Creation & Grammar Check
```
Dashboard
    ↓ Click "Create Document"
Create Document modal
    ↓ Enter title, type
Document created
    ↓ Open in editor
Editor loads
    ↓ User types text
Real-time grammar check
    ↓ spaCy API called every 2 seconds
Grammar errors highlighted
    ↓ User clicks error
Suggestion panel opens
    ↓ User accepts/ignores
Document updated
```

### Flow 3: Free to Pro Upgrade
```
Dashboard / Free user
    ↓ Click "Upgrade" button
Pricing page shown
    ↓ Click "Pro - Start Trial"
Signup for trial (if not logged in)
    ↓ Already logged in
Redirect to payment page
    ↓ Stripe payment modal
Enter card details
    ↓ Payment processed
Subscription created
    ↓ Redirect to dashboard
Pro features unlocked
    ↓ Pro badge shown
Can now use advanced features
```

---

## TECHNICAL ARCHITECTURE - PHASE 1

```
User (Browser)
    ↓ HTTPS
    ↓
Next.js Frontend (Vercel)
├─ Pages (Landing, Signup, Login, Dashboard, Editor)
├─ Components (Header, Editor, Sidebar)
├─ Real-time Sync (WebSocket)
└─ State Management (Zustand)
    ↓ REST API + WebSocket
    ↓
NestJS Backend (Railway)
├─ Auth Controller
├─ Documents Controller
├─ Users Controller
├─ Billing Controller
├─ Middleware (JWT validation)
└─ Services
    ↓ Database operations
    ↓
Supabase (PostgreSQL)
├─ users table
├─ documents table
├─ subscriptions table
└─ document_versions table

External Services:
├─ Stripe (payments)
├─ SendGrid (emails)
├─ spaCy microservice (grammar)
└─ Sentry (error tracking)
```

---

## CONVERSION FUNNEL - PHASE 1

### Visitor → Signup Conversion
1. **Landing Page**: Hero section converts 3-5% to signup
2. **Value Proposition**: Features section improves conversion +2%
3. **Pricing Preview**: Shows affordability, improves +1%
4. **Social Proof**: Testimonials improve +2%
5. **CTA Placement**: Multiple CTAs improve +2%

**Target:** 10-12% visitor → signup conversion

### Signup → Free Plan User Conversion
1. **Easy signup**: Single-page form (name, email, password)
2. **Email verification**: Quick 1-click verification
3. **Onboarding**: Show dashboard, suggest first document
4. **Welcome email**: Reinforce value

**Target:** 90%+ signup → active user (after 7 days)

### Free → Pro Conversion
1. **Free tier limitations**: 5 documents max (drives upgrade)
2. **Pro benefits**: Show what Pro users can do
3. **Low friction**: 1-click upgrade
4. **Trial period**: 7-day free trial (builds habit)
5. **Email nurture**: Weekly tips, conversion prompts

**Target:** 5-8% free → pro conversion (30-day)

---

## MOBILE RESPONSIVENESS - PHASE 1

### Breakpoints
```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
```

### Key Mobile Optimizations

**Landing Page:**
- Full-height hero section
- Stacked features carousel
- Vertical pricing cards
- Touch-friendly buttons (56px)
- Large text (16px minimum)

**Signup/Login:**
- Full-width form
- No side column on mobile
- Touch-friendly inputs
- Large submit button

**Dashboard:**
- Hamburger menu
- Single-column document list
- Card-based layout
- Bottom action buttons

**Editor:**
- Simplified toolbar
- Full-width text area
- Side panel slides over
- Touch-optimized keyboard

---

## SEO OPTIMIZATION - PHASE 1

### On-Page SEO

**Landing Page:**
```
H1: "AI Writing Assistant for Perfect Grammar & Style"
Meta Description: "Free AI grammar checker, plagiarism detector & 
  writing assistant with real-time suggestions. No credit card required."
Focus Keywords: AI writing assistant, grammar checker, plagiarism detector
Long-tail: best free grammar checker, AI writing tool, online editor

Schema:
- SoftwareApplication
- Organization
- BreadcrumbList
- FAQPage
```

**Pricing Page:**
```
H1: "GrammarPro Pricing Plans - Affordable AI Writing Tools"
Meta Description: "Compare our Free, Pro, and Business plans. 
  Start free, upgrade anytime. All plans include advanced grammar checking."
Focus Keywords: pricing plans, affordable, SaaS pricing
```

### Technical SEO
```
✓ Mobile-first indexing (mobile responsive)
✓ Fast page load (< 2.5s LCP)
✓ Core Web Vitals optimization
✓ XML sitemap
✓ robots.txt
✓ Canonical URLs
✓ Open Graph tags
✓ Twitter Card tags
✓ Structured data (Schema.org)
✓ HTTPS (security)
```

### Content Strategy
```
Pages optimized for: 25-30 keywords
Blog post strategy: 2-3 posts per week (not in Phase 1)
Keyword difficulty: Low to Medium
Content depth: 1500-3000 words per page
Internal linking: 3-5 links per page
```

---

## PERFORMANCE TARGETS - PHASE 1

```
Metric              Target    Tool
─────────────────────────────────────
First Contentful Paint (FCP)  < 1.5s      Lighthouse
Largest Contentful Paint (LCP) < 2.5s     Lighthouse
Cumulative Layout Shift (CLS)  < 0.1      Lighthouse
Time to Interactive (TTI)      < 3s       Lighthouse
Page Size                      < 200KB    Chrome DevTools
API Response Time             < 200ms    Custom monitoring
Database Query Time           < 100ms    Supabase monitoring
```

---

## SECURITY CONSIDERATIONS - PHASE 1

```
✓ HTTPS only
✓ JWT token authentication
✓ Password hashing (bcryptjs)
✓ CORS configuration
✓ Rate limiting on APIs
✓ Input validation & sanitization
✓ XSS protection
✓ CSRF tokens
✓ SQL injection prevention (Prisma ORM)
✓ Secure headers (HSTS, CSP, etc)
✓ Environment variables for secrets
✓ No sensitive data in logs
```

---

## MONITORING & ANALYTICS - PHASE 1

```
Error Tracking:      Sentry
Analytics:           Mixpanel or Segment
Performance:         Vercel Analytics + Custom
Database Monitoring: Supabase Monitoring
Uptime Monitoring:   UptimeRobot
```

---

## PHASE 1 DELIVERABLES

✅ **6 Core Pages** (Landing, Signup, Login, Dashboard, Documents, Editor)
✅ **Authentication System** (Email/password, verification, password reset)
✅ **Real-time Editor** (Lexical integration, auto-save, document sync)
✅ **Basic Grammar Checking** (spaCy integration, real-time suggestions)
✅ **Payment System** (Stripe integration, subscription management)
✅ **Supabase Backend** (Database, real-time, authentication)
✅ **Mobile Responsive** (All pages optimized for mobile)
✅ **SEO Optimized** (Meta tags, schema, sitemap, structured data)
✅ **Deployment Ready** (Vercel frontend, Railway backend)
✅ **Documentation** (API docs, database schema, deployment guide)

---

## PHASE 1 METRICS

- **Development Time:** 7 weeks (MVP + Core)
- **Team Size:** 2 developers (1 frontend + 1 backend)
- **Pages Delivered:** 12 pages
- **APIs Built:** 15+ endpoints
- **Test Coverage:** 60%+
- **Performance Score:** 85+/100
- **SEO Score:** 90+/100
- **Accessibility Score:** 85+/100

---

**End of Phase 1 Document**

Phase 2 (Weeks 8-13) includes: Advanced features, team collaboration, advanced analytics, and enterprise features.

Would you like me to proceed with Phase 2 documentation?
