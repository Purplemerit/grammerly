# 📋 PRODUCT REQUIREMENT DOCUMENT (PRD) - PHASE 2
## GrammarPro - Advanced Features & Scale

**Document Version:** 1.0  
**Created:** December 4, 2025  
**Audience:** CTO, CXO, Product Team  
**Status:** Ready for Implementation  

---

## 🎯 PHASE 2: ADVANCED FEATURES & SCALE (Weeks 8-13)

### Phase 2 Objective
Scale the platform with advanced features, team collaboration, mobile/desktop apps, multilingual support, and enterprise capabilities.

### Phase 2 Timeline
- **Weeks 8-10:** Advanced Features (BERT, Plagiarism, Paraphrasing)
- **Weeks 11-12:** Team Collaboration & Apps
- **Weeks 13:** Polish & Enterprise Features

---

# PHASE 2 PART A: ADVANCED FEATURES (Weeks 8-10)

## 🎨 NEW PAGES - PHASE 2A

### 1. PLAGIARISM DETECTOR PAGE (STANDALONE)

**URL:** `/tools/plagiarism` (public tool page)  
**Purpose:** Standalone plagiarism checker, drives conversion  
**Mobile Responsive:** Yes  

#### 1.1 HERO SECTION
```
Headline: "Check Your Document for Plagiarism"
Subheading: "Scan against 8B+ web pages in seconds. 
            Get detailed originality reports."

Visual: Animated plagiarism scan
CTA: "Check for Free" (primary)

Mobile: Full-width, stacked layout
```

#### 1.2 UPLOAD / PASTE SECTION
```
Two options:
1. Upload Document
   - Drag & drop area
   - File input (max 25MB)
   - Supported: PDF, DOCX, TXT, RTF

2. Paste Text
   - Large textarea
   - Max 50,000 characters

CTA Button: "Check Plagiarism"

Mobile: Stacked options, full-width inputs
```

#### 1.3 RESULTS SECTION (After scan)
```
Plagiarism Score:
- Large circular percentage display (0-100%)
- Color coded:
  - 0-25%: Green (original)
  - 25-50%: Yellow (moderate)
  - 50-75%: Orange (significant)
  - 75-100%: Red (high plagiarism)

Results table:
- Flagged text
- Source match
- Similarity %
- Date detected

Actions:
- Download report (PDF)
- Export sources (CSV)
- Share report

Mobile: Simplified display, horizontal scroll for table
```

#### 1.4 BENEFITS SECTION
```
Why use GrammarPro plagiarism:
✓ Scans 8B+ web pages
✓ Real-time results (< 30 seconds)
✓ Detailed source citations
✓ Academic & web content
✓ Detects paraphrasing
✓ Original research

Visual: Icons + descriptions
```

#### 1.5 FAQ SECTION
```
Q: How accurate is plagiarism detection?
A: 99.8% accurate using advanced algorithms.

Q: How many documents can I check?
A: Free: 5/month. Pro: Unlimited.

Q: Can I check someone else's work?
A: Yes, but respect copyright.

Q: How long does scanning take?
A: Average 10-30 seconds depending on document size.

Mobile: Expandable accordion
```

---

### 2. PARAPHRASER TOOL PAGE

**URL:** `/tools/paraphraser` (public tool page)  
**Purpose:** Rewrite & paraphrase tool, drives engagement  

#### 2.1 HERO SECTION
```
Headline: "Rewrite Your Text with AI"
Subheading: "Generate 5+ paraphrasing options instantly. 
            Maintain meaning, change style."

Visual: Before/after example
CTA: "Start Paraphrasing Free"
```

#### 2.2 INPUT SECTION
```
Textarea:
- Paste or type text
- Min: 10 words
- Max: 5,000 words

Controls:
- Tone selector: 
  - Formal
  - Casual
  - Academic
  - Simple
  - Professional

- Intensity slider:
  - Light (minimal changes)
  - Medium (balanced)
  - Heavy (significant changes)

CTA: "Generate Options"

Mobile: Full-width textarea, stacked controls
```

#### 2.3 OUTPUT SECTION (After generation)
```
Display 5 paraphrased versions:
Each version card shows:
- Rewritten text
- Word count
- Readability score
- Copy button
- Use button

Actions:
- Copy to clipboard
- Regenerate
- Combine variations
- Export all

Mobile: Vertical cards, swipeable carousel
```

#### 2.4 COMPARISON SECTION
```
Side-by-side comparison:
- Original text (left)
- Selected version (right)
- Highlight differences
- Show word changes

Visual: Color highlighting for changed words
Mobile: Stacked, scrollable
```

---

### 3. TONE ANALYZER PAGE

**URL:** `/tools/tone-analyzer` (public)  

#### 3.1 HERO SECTION
```
Headline: "Detect & Adjust Your Writing Tone"
Subheading: "Analyze tone and get suggestions to match 
            your intended audience."

CTA: "Analyze Tone Free"
```

#### 3.2 INPUT SECTION
```
Textarea: Paste/type text

Tone selector: Choose target tone
- Friendly
- Professional
- Formal
- Creative
- Academic
- Casual
- Confident
- Urgent
- Cautious
- Optimistic

CTA: "Analyze"
```

#### 3.3 RESULTS SECTION
```
Current Tone Analysis:
- Detected tone (primary)
- Tone percentage (80% professional)
- Secondary tones (20% friendly)

Visual: Pie chart of tone distribution

Suggestions:
- If tone mismatches target:
  "Your text is 60% casual but target is professional"
  Suggested improvements:
  - Replace "gonna" with "will"
  - Add formal language
  - Remove contractions

Improvement tips:
- List of specific phrases to change
- Before/after examples

Mobile: Simplified chart, stacked suggestions
```

---

### 4. CITATION GENERATOR PAGE

**URL:** `/tools/citation` (public)  

#### 4.1 HERO SECTION
```
Headline: "Generate Perfect Citations in Seconds"
Subheading: "Support 10,000+ citation formats. 
            APA, MLA, Chicago, Harvard, and more."

CTA: "Generate Citations Free"
```

#### 4.2 SOURCE INPUT
```
Form fields:
- Source type dropdown:
  - Website
  - Book
  - Journal Article
  - Video
  - Podcast
  - Social Media
  - Report
  - Interview

Dynamic fields based on type:
If Website:
  - URL
  - Access date
  - Author (optional)
  - Title (auto-populated)

If Book:
  - Author
  - Title
  - Publisher
  - Year
  - ISBN (optional)

CTA: "Generate Citation"
```

#### 4.3 RESULTS SECTION
```
Generated citations in multiple formats:
- APA
- MLA
- Chicago
- Harvard
- IEEE
- Vancouver
- [10+ more]

Each citation:
- Full formatted text
- Copy button
- Use in document button

Additional:
- Bibliography generator
- Save citations (Pro+)
- Create bibliography

Mobile: Swipeable tabs for formats, copy buttons prominent
```

---

## PLAGIARISM DETECTION - TECHNICAL DETAILS

### Integration: Copyleaks API

```
Endpoint: POST /api/plagiarism/check
Input: {
  text: string,
  documentType: "web" | "academic" | "all"
}

Output: {
  plagiarismPercentage: 0-100,
  scanTime: milliseconds,
  flaggedSections: [
    {
      original: string,
      source: {
        title: string,
        url: string,
        similarity: 0-100
      }
    }
  ]
}

Flow:
1. User submits text
2. NestJS sends to Copyleaks API
3. Wait for scan completion
4. Return results with flagged sections
5. Store results in Supabase
6. Display to user
```

### Features
```
✓ Real-time scanning
✓ Multiple content sources (web, academic, social)
✓ Detailed source citations
✓ Paraphrase detection
✓ Quote detection
✓ Citation checking
✓ Export reports (PDF/CSV)
✓ Revision tracking
```

---

## ADVANCED GRAMMAR WITH BERT

### Implementation

```
Endpoint: POST /api/grammar/check-advanced
Input: { text: string, context: string }

Processing:
1. Tokenize text (BERT tokenizer)
2. Run through BERT model
3. Identify:
   - Grammar errors
   - Spelling mistakes
   - Style issues
   - Readability problems
4. Generate suggestions using GPT-3.5

Output: {
  errors: [
    {
      type: "GRAMMAR" | "STYLE" | "TONE",
      severity: "LOW" | "MEDIUM" | "HIGH",
      position: { start, end },
      original: string,
      suggestions: string[],
      explanation: string,
      confidence: 0-100
    }
  ],
  readabilityScore: 0-100,
  sentenceComplexity: average
}

Deployment: 
- BERT model on microservice
- GPU required (RTX 3080+)
- Docker container on Railway
```

### Accuracy Metrics
```
✓ Grammar Detection: 96%+ accuracy
✓ Spelling Detection: 99% accuracy
✓ Tone Detection: 92% accuracy
✓ Style Issues: 88% accuracy
✓ False Positives: < 2%
```

---

## PARAPHRASING WITH CLAUDE API

### Implementation

```
Endpoint: POST /api/paraphrase/generate
Input: {
  text: string,
  tone: "formal" | "casual" | "academic" | "simple",
  intensity: "light" | "medium" | "heavy",
  count: 1-5  // Number of variations
}

Processing:
1. Send to Claude API with system prompt
2. Request N paraphrasing variations
3. Filter results (relevance, length)
4. Return top 5

Output: {
  original: string,
  variations: [
    {
      text: string,
      wordCount: number,
      readabilityScore: number
    }
  ]
}

Cost: ~$0.02-0.05 per API call
```

---

## 👥 TEAM COLLABORATION PAGES (Weeks 11-12)

### 5. TEAMS / WORKSPACES PAGE

**URL:** `/teams` (authenticated)  
**Purpose:** Manage team workspaces and members  

#### 5.1 TEAMS LIST
```
Section: "Your Teams"

Teams grid/list:
Each team card:
- Team name
- Member count
- Total documents
- Role (Owner/Admin/Member)
- Last active (date)
- Action menu:
  - Open workspace
  - Settings
  - Leave team (if not owner)

Empty state:
"No teams yet. Create one to collaborate!"
CTA: "Create Team"

Mobile: Single column list
```

#### 5.2 CREATE TEAM MODAL
```
Form:
- Team name (text input)
- Description (textarea)
- Privacy: Private/Public

CTA: "Create Team"

Mobile: Full-height modal
```

#### 5.3 TEAM SETTINGS
```
Tab navigation:
- General
- Members
- Permissions
- Billing
- Integrations

General tab:
- Team name (editable)
- Description (editable)
- Logo upload
- Delete team (owner only)

Mobile: Stacked tabs
```

---

### 6. INVITE MEMBERS PAGE

**URL:** `/teams/:id/invite` (authenticated)  

#### 6.1 INVITE FORM
```
Form:
- Email input (multiple addresses)
- Role selector: Admin/Editor/Viewer
- Permission level
- Custom message (optional)

CTA: "Send Invites"

Bulk import:
- Paste emails
- Upload CSV

Results:
- Pending invites list
- Email addresses
- Sent status
- Resend button

Mobile: Full-width form, stacked sections
```

---

### 7. REAL-TIME COLLABORATION INTERFACE

**URL:** `/editor/:docId/collaborate` (authenticated)  

#### 7.1 COLLABORATION HEADER
```
Team members working on document:
- Avatar row (shows who's editing)
- Active users count
- Online status
- "View only" badge if read-only

Comments count: "[3] Comments"
CTA: "Show comments"

Mobile: Compact header, expand on tap
```

#### 7.2 COLLABORATIVE EDITOR
```
Features:
✓ Real-time text sync
✓ Cursor positions shown (colored cursors)
✓ Live typography updates
✓ Change highlighting (different colors per user)
✓ Cursor tracking animation
✓ Automatic conflict resolution (Operational Transform)

Performance:
- < 100ms latency
- Support 10+ concurrent users
- Automatic reconnection

Mobile:
- Simplified collaboration UI
- Show only primary collaborators
- Hide cursor positions for clarity
```

#### 7.3 COMMENTS & SUGGESTIONS PANEL
```
Sidebar showing:

Active comments:
- Author name
- Avatar
- Comment text
- Timestamp
- Resolved status
- Reply count
- Resolve button

Replies:
- Nested under comment
- Author, text, timestamp
- Add reply input

Suggestions:
- User who suggested
- Before/after text
- Accept/Reject buttons
- Comments on suggestion

Mobile: Bottom sheet modal, swipeable
```

#### 7.4 CHAT WIDGET
```
Corner chat for team communication:
- Live messages
- Typing indicators
- Mention notifications
- Read receipts
- Search messages

Minimizable chat
Quick access team members

Mobile: Full-screen chat when expanded
```

---

## 📊 ADVANCED ANALYTICS DASHBOARD

### 8. ANALYTICS PAGE (Enhanced)

**URL:** `/analytics` (authenticated)  

#### 8.1 OVERVIEW METRICS
```
Cards (6 metrics):
1. Documents created
   - Number + trend

2. Words written
   - Total + avg per doc

3. Writing time
   - Hours + breakdown by type

4. Grammar score
   - Overall + improvement trend

5. Errors found & fixed
   - Count + categories

6. Most used features
   - Grammar check, plagiarism, paraphrase

Mobile: Vertical scroll, 2-column grid on tablet
```

#### 8.2 WRITING PATTERNS CHART
```
Time series chart:
- Y-axis: Documents/Words
- X-axis: Time (weekly)
- 12-week view
- Hover tooltips
- Toggle metrics

Insights:
- "Most productive day: Thursday"
- "Average 2,450 words per week"
- "5% improvement vs last month"

Mobile: Simplified chart, smaller view
```

#### 8.3 ERROR BREAKDOWN
```
Doughnut chart:
- Grammar (45%)
- Spelling (20%)
- Punctuation (18%)
- Style (12%)
- Tone (5%)

Click to drill down:
- Show specific errors
- Repeated mistakes
- Suggestions to improve

Mobile: Vertical bar chart
```

#### 8.4 DOCUMENT PERFORMANCE
```
Table:
- Document name
- Date created
- Word count
- Grammar score
- Reading level
- Time to write
- Sort/filter options

Mobile: Horizontal scroll table or card view
```

#### 8.5 GOALS & ACHIEVEMENTS
```
Progress section:
- Current writing goal
- Words toward goal
- Progress bar
- Days remaining

Achievements:
- Badges for milestones
- "First 1000 words"
- "7-day streak"
- "Fix 100 errors"
- "Master grammar"

Mobile: Badge grid, scrollable
```

---

## 📱 MOBILE & DESKTOP APPS (Weeks 11-12)

### 9. DESKTOP APP (Windows/Mac/Linux)

**Technology:** Electron + React  
**Distribution:** Direct download + auto-updates  

#### 9.1 FEATURES
```
✓ Full feature parity with web
✓ Offline mode (draft locally)
✓ System tray integration
✓ Keyboard shortcuts
✓ File system integration:
  - Open local files (.docx, .pdf, .txt)
  - Auto-save to local folder
  - Cloud sync when online
✓ Native notifications
✓ Dark/light theme
✓ System preferences integration
```

#### 9.2 INTERFACE
```
Layout:
- Top menu bar (File, Edit, View, Help)
- Sidebar with documents
- Main editor area
- Right panel for suggestions
- Bottom status bar

Shortcuts:
- Cmd+S / Ctrl+S: Save
- Cmd+Shift+X: Check grammar
- Cmd+Z: Undo
- Cmd+Y: Redo
[and more standard shortcuts]

Native integration:
- Open with (system context menu)
- Share menu (system share)
- Clipboard integration
```

---

### 10. MOBILE APP (iOS/Android)

**Technology:** React Native or Flutter  
**Distribution:** App Store & Google Play  

#### 10.1 FEATURES
```
✓ Full grammar checking
✓ Document creation & editing
✓ Plagiarism detection
✓ Paraphrasing tool
✓ Camera: Capture text from images (OCR)
✓ Voice input: Dictation
✓ Offline mode
✓ Cloud sync
✓ Push notifications
✓ Apple/Google authentication
```

#### 10.2 CORE SCREENS
```
1. Tab Navigation (5 tabs):
   - Documents (home)
   - Write (new document)
   - Tools (plagiarism, paraphrase, etc)
   - Analytics
   - Profile

2. Document Screen:
   - List of documents
   - Search
   - New document button
   - Pull to refresh

3. Editor Screen:
   - Full text editor
   - Bottom toolbar
   - Floating grammar button
   - Suggestions panel (swipe from right)

4. Tools Screen:
   - Card grid of tools
   - Plagiarism checker
   - Paraphraser
   - Tone analyzer
   - Citation generator

5. Profile Screen:
   - User info
   - Subscription
   - Settings
   - Logout

Mobile optimization:
- Touch-friendly (56px buttons)
- Thumb-reachable layout
- Bottom tab navigation
- One-handed usage support
```

---

## 🔗 BROWSER EXTENSIONS (Weeks 11-12)

### 11. CHROME EXTENSION

**Purpose:** Integrate GrammarPro into Gmail, Google Docs, web forms  

#### 11.1 FEATURES
```
✓ Grammar checking in text areas
✓ Google Docs integration
✓ Gmail integration (check before send)
✓ Real-time suggestions
✓ Context menu integration
✓ Floating widget on any webpage
✓ Account sync
✓ Settings access
```

#### 11.2 UI COMPONENTS
```
Popup (on click):
- Quick stats
- Account info
- Settings link
- Update status

Content script:
- Floating icon on text areas
- Click to open suggestions panel
- Icon appears when hovering over textarea

Context menu:
- Right-click in text area
- "Check Grammar" option

Google Docs integration:
- Sidebar panel
- Real-time suggestions
- Apply corrections

Mobile: N/A (extensions not on mobile browsers)
```

---

## 🌍 MULTILINGUAL SUPPORT

### 12. LANGUAGE SETTINGS PAGE

**URL:** `/settings/languages` (authenticated)  

#### 12.1 SUPPORTED LANGUAGES
```
Currently supported:
- English (US, UK, CA, AU, IN)
- Spanish (ES, MX)
- French (FR, CA)
- German (DE, AT, CH)
- Italian (IT)
- Portuguese (BR, PT)
- Dutch (NL)
- Swedish (SE)
- Polish (PL)
- Russian (RU)
- Japanese (JP)
- Chinese (Simplified, Traditional)
- Korean (KO)
- Hindi (IN)
- [+10 more]

Total: 20+ languages
```

#### 12.1 LANGUAGE SELECTOR
```
Primary language (for writing):
- Dropdown selector
- Auto-detect option
- Recommended based on region

UI language (for interface):
- Separate selector
- 15+ UI languages

Grammar checking language:
- Dropdown
- Auto-detect in document
- Manual override

Mobile: Simplified selectors
```

---

## 📐 SSO & ENTERPRISE FEATURES (Weeks 12-13)

### 13. ENTERPRISE ADMIN PANEL

**URL:** `/admin` (admin only)  

#### 13.1 DASHBOARD
```
Key metrics:
- Active users
- Subscription revenue
- Support tickets
- System health
- Performance metrics

Quick actions:
- View users
- Manage billing
- Create announcement
- View analytics

Mobile: Simplified dashboard
```

#### 13.2 USER MANAGEMENT
```
User table:
- Email
- Subscription plan
- Joined date
- Last active
- Status (active/inactive/suspended)
- Actions: Edit, Suspend, Delete

Filters:
- Plan type
- Status
- Join date range
- Search

Bulk actions:
- Export CSV
- Send message
- Change plan
- Suspend

Mobile: Card view with actions
```

#### 13.3 BILLING & REVENUE
```
Revenue metrics:
- Monthly recurring revenue (MRR)
- Annual recurring revenue (ARR)
- Churn rate
- Customer lifetime value
- ARPU (average revenue per user)

Charts:
- Revenue trend
- Plan distribution
- Churn analysis
- Payment success rate

Invoices:
- List of all invoices
- Download/resend
- Refund management

Mobile: Key metrics visible
```

#### 13.4 SSO SETUP
```
Configuration:
- OAuth provider setup
- SAML 2.0 config
- Azure AD integration
- Okta integration
- Google Workspace setup

Steps:
1. Select provider
2. Enter credentials
3. Configure mappings
4. Test connection
5. Deploy

Status: Active/Inactive

Mobile: Scroll to view all fields
```

---

## API REQUIREMENTS - PHASE 2

### APIs TO BUILD

#### 1. Plagiarism Checking APIs
```
POST /api/plagiarism/check
- Text or file upload
- Returns: Plagiarism percentage, flagged sections

POST /api/plagiarism/cancel
- Cancel ongoing scan

GET /api/plagiarism/history
- Returns: Past plagiarism checks
```

#### 2. Paraphrasing APIs
```
POST /api/paraphrase/generate
- Text, tone, intensity, count
- Returns: Array of paraphrased versions

GET /api/paraphrase/history
- Returns: Past paraphrase requests
```

#### 3. Tone Analysis APIs
```
POST /api/tone/analyze
- Text, target tone
- Returns: Tone distribution, suggestions

GET /api/tone/suggestions
- Text
- Returns: Tone improvement suggestions
```

#### 4. Citation APIs
```
POST /api/citation/generate
- Source details, format
- Returns: Formatted citation

GET /api/citation/formats
- Returns: List of supported formats

POST /api/citation/bibliography
- Array of citations
- Returns: Formatted bibliography
```

#### 5. Collaboration APIs
```
POST /api/teams/create
- Team name, description
- Returns: Created team object

POST /api/teams/:id/members/invite
- Email, role
- Returns: Invitation sent

GET /api/teams/:id/members
- Returns: Team members list

PUT /api/teams/:id/members/:memberId
- Role, permissions
- Returns: Updated member

DELETE /api/teams/:id/members/:memberId
- Remove member

POST /api/teams/:id/documents
- Returns: Team's documents

WebSocket: /ws/collaboration/:docId
- Real-time document updates
- Cursor positions
- Presence
```

#### 6. Advanced Analytics APIs
```
GET /api/analytics/overview
- Returns: Overview metrics

GET /api/analytics/writing-patterns
- Date range
- Returns: Writing activity data

GET /api/analytics/error-breakdown
- Returns: Error statistics

GET /api/analytics/goals
- Returns: User goals, progress

GET /api/analytics/export
- Format (pdf, csv, json)
- Returns: Export file URL
```

#### 7. Admin APIs
```
GET /api/admin/users
- Pagination, filters
- Returns: User list

PUT /api/admin/users/:id
- Admin updates
- Returns: Updated user

DELETE /api/admin/users/:id
- Admin delete

GET /api/admin/revenue
- Date range
- Returns: Revenue metrics

GET /api/admin/sso
- Returns: SSO configuration

POST /api/admin/sso
- Provider, config
- Returns: SSO setup
```

### Third-Party APIs TO INTEGRATE

#### 1. Copyleaks API (Plagiarism)
```
Endpoint: https://api.copyleaks.com/v3/submit/file
Purpose: Document plagiarism scanning
Pricing: $0.10 per scan (bulk rates available)
Rate limit: 100 scans/day
```

#### 2. Claude API (Paraphrasing)
```
Endpoint: https://api.anthropic.com/v1/messages
Purpose: AI paraphrasing generations
Pricing: $0.01-0.03 per request
Model: Claude 3 Sonnet
```

#### 3. Okta API (SSO)
```
Endpoint: https://[domain].okta.com/api/v1
Purpose: Enterprise single sign-on
Pricing: Enterprise custom
Scopes: OIDC, SAML 2.0
```

#### 4. Stripe API (Advanced)
```
Additional endpoints for Phase 2:
- Billing portal
- Custom invoice
- Usage-based billing
- Dunning management
```

#### 5. AWS Comprehend (Sentiment Analysis)
```
Purpose: Enhanced tone detection
Pricing: $0.0001 per unit (100 units = $0.01)
Alternative: Use BERT instead (local model)
```

---

## SUPABASE SCHEMA - PHASE 2

```sql
-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- Team members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  user_id UUID NOT NULL REFERENCES users(id),
  role VARCHAR, -- OWNER, ADMIN, EDITOR, VIEWER
  permissions JSONB,
  joined_at TIMESTAMP DEFAULT NOW()
);

-- Plagiarism scans
CREATE TABLE plagiarism_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  document_id UUID REFERENCES documents(id),
  plagiarism_percentage DECIMAL,
  flagged_sections JSONB,
  sources JSONB,
  scan_time INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Collaboration sessions
CREATE TABLE collaboration_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id),
  active_users JSONB, -- Array of user IDs
  last_active TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments on documents
CREATE TABLE document_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id),
  user_id UUID NOT NULL REFERENCES users(id),
  text TEXT NOT NULL,
  position INT, -- Character position in document
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_teams_owner_id ON teams(owner_id);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_plagiarism_scans_user_id ON plagiarism_scans(user_id);
CREATE INDEX idx_document_comments_document_id ON document_comments(document_id);
```

---

## TECHNICAL ARCHITECTURE - PHASE 2

```
Existing from Phase 1 +

Microservices:
├─ BERT Grammar Service (GPU required)
│  └─ Python FastAPI
│
├─ Plagiarism Integration (Copyleaks)
│  └─ REST client
│
└─ Paraphrase Service (Claude API wrapper)
   └─ REST wrapper

Desktop Apps:
├─ Electron (Windows/Mac/Linux)
└─ React components shared

Mobile Apps:
├─ React Native (iOS/Android)
└─ Shared business logic

Real-time Services:
├─ WebSocket server (NestJS)
│  ├─ Collaborative editing
│  ├─ Presence tracking
│  └─ Live comments
└─ Redis cache layer

Admin Panel:
├─ Next.js (separate domain)
├─ Protected routes
└─ Admin-only features

Browser Extensions:
├─ Chrome Extension
├─ Firefox Add-on
└─ Safari App Extension
```

---

## USER FLOWS - PHASE 2

### Flow 1: Create Team & Collaborate
```
Dashboard
    ↓ Click "Create Team"
Create team modal
    ↓ Enter name, description
Team created
    ↓ Team workspace opens
Team dashboard
    ↓ Click "Invite members"
Invite form
    ↓ Enter emails, select role
Send invites
    ↓ Emails sent to invited members
Invited users click link
    ↓ Join team
Team member added
    ↓ Access team documents
Can now collaborate
```

### Flow 2: Real-time Collaboration
```
Editor (User A)
    ↓ Invite User B
User B receives invite
    ↓ Accept
Open shared document
    ↓ Both users editing same doc
Real-time sync
    ↓ Text appears instantly for both
See each other's cursors
    ↓ Color-coded cursor positions
Add comment
    ↓ Creates comment node
User B replies
    ↓ Comment thread
Save collaboration session
```

### Flow 3: Plagiarism Check (Standalone)
```
Plagiarism tool page
    ↓ Paste or upload text
Click "Check"
    ↓ API submits to Copyleaks
Scanning (progress bar)
    ↓ 10-30 seconds
Results displayed
    ↓ Plagiarism %, flagged sections
View sources
    ↓ Click matched section
Show source website
    ↓ Download report PDF
Export or share results
```

### Flow 4: Paraphrase Text
```
Paraphrase tool
    ↓ Paste text
Select tone & intensity
    ↓ Formal, heavy changes
Click "Generate"
    ↓ API calls Claude
Generate 5 variations
    ↓ Display results
Select variation
    ↓ Copy to clipboard
Use in document
```

---

## MOBILE RESPONSIVENESS - PHASE 2

### Key Changes from Phase 1

**Editor on Mobile:**
- Simplified toolbar (bold, italic, only essentials)
- Larger text (18px+ on mobile)
- Touch-optimized suggestions (large buttons)
- Bottom sheet for advanced options
- Floating action button for check grammar

**Collaboration on Mobile:**
- Hide cursor positions (cleaner UI)
- Show only active users
- Comments as bottom sheet
- Simplified chat

**Analytics on Mobile:**
- Smaller charts
- Vertical layout
- Swipeable chart variations
- Simplified metrics

**Apps on Mobile:**
- Native app experience
- Full feature set
- Touch gestures (swipe, pinch)
- Bottom tab navigation

---

## PERFORMANCE TARGETS - PHASE 2

```
Metric                Target    Current P1
─────────────────────────────────────────────
FCP                   < 1.5s    < 1.5s
LCP                   < 2.5s    < 2.5s
CLS                   < 0.1     < 0.1
Plagiarism API        < 30s     -
Paraphrase API        < 5s      -
Collaboration latency < 100ms   -
Mobile app load       < 2s      -
Desktop app load      < 3s      -
```

---

## SECURITY - PHASE 2

**Addition to Phase 1:**

```
✓ End-to-end encryption (documents in transit)
✓ Data residency options (EU, US, etc)
✓ Advanced DLP (Data Loss Prevention)
✓ Audit logs for enterprises
✓ SOC 2 Type II compliance
✓ GDPR Data Processing Agreement
✓ HIPAA compliance (healthcare)
✓ FedRAMP readiness
```

---

## PHASE 2 DELIVERABLES

✅ **Plagiarism Detection** (Copyleaks integration)  
✅ **Advanced Paraphrasing** (Claude API)  
✅ **Tone Analysis** (BERT model)  
✅ **Citation Generator** (10,000+ formats)  
✅ **Team Collaboration** (Real-time editing)  
✅ **Desktop App** (Windows/Mac/Linux)  
✅ **Mobile App** (iOS/Android)  
✅ **Browser Extensions** (Chrome/Firefox)  
✅ **Multilingual Support** (20+ languages)  
✅ **Admin Panel** (Enterprise features)  
✅ **Advanced Analytics** (New dashboard)  
✅ **SSO Integration** (Okta/Azure AD)  
✅ **API Documentation** (For developers)  

**Total New Pages:** 30 pages
**Total Pages (cumulative):** 42 pages

---

## PHASE 2 METRICS

- **Development Time:** 6 weeks (Weeks 8-13)
- **Team Size:** 2-3 developers
- **New Pages:** 30+ pages
- **New APIs:** 20+ endpoints
- **External Integrations:** 5+ APIs
- **Mobile Platforms:** 2 (iOS, Android)
- **Desktop Platforms:** 3 (Windows, Mac, Linux)
- **Languages Supported:** 20+
- **Test Coverage:** 70%+
- **Performance Score:** 85+/100

---

## IMPLEMENTATION PROCESS - PHASE 2

### Week 8: Plagiarism & Paraphrasing
```
Days 1-3: Copyleaks integration
Days 4-5: Plagiarism detector page
Days 6-7: Claude API integration
Days 8-10: Paraphraser tool page
Days 11-14: Tone analyzer page
Days 15: Testing & optimization
```

### Week 9: Advanced Grammar
```
Days 1-5: BERT model setup
Days 6-10: Advanced grammar checking API
Days 11-14: Integration with editor
Days 15: Performance optimization
```

### Week 10: Citation & Collaboration Setup
```
Days 1-5: Citation generator page
Days 6-7: Citation API development
Days 8-10: Team workspace structure
Days 11-15: Collaboration APIs (WebSocket setup)
```

### Week 11: Team Collaboration & Apps
```
Days 1-5: Real-time collaboration UI
Days 6-8: Comments system
Days 9-10: Desktop app scaffolding
Days 11-15: Mobile app scaffolding
```

### Week 12: Mobile & Desktop Apps
```
Days 1-7: Desktop app development
Days 8-14: Mobile app development
Days 15: Cross-platform testing
```

### Week 13: Polish & Enterprise
```
Days 1-5: Browser extensions
Days 6-10: Admin panel
Days 11-12: SSO setup
Days 13-15: Testing, documentation, deployment
```

---

## CONVERSION FUNNEL - PHASE 2

### Free → Pro Conversion (Improved)
```
New CTAs:
1. Plagiarism Detection: "Upgrade to check plagiarism"
2. Paraphrasing: "Pro feature - try now"
3. Team collaboration: "Upgrade for team features"
4. Advanced analytics: "Pro only - upgrade"
5. Email campaigns: "Here's what Pro users are doing"

Conversion target: 8-12% (up from 5-8%)
```

### Pro → Business Conversion
```
Triggers:
1. 5+ team members: "Consider Business plan"
2. 100+ documents: "Business plan recommended"
3. 50GB+ storage: "Business plan available"

Benefits messaging:
- Unlimited team members
- Advanced analytics
- SSO login
- Priority support
- Dedicated account manager

Conversion target: 15-20% of Pro users
```

---

## PHASE 2 SUMMARY

**Weeks 8-13:** Advanced features, team collaboration, mobile/desktop apps  
**Deliverables:** 30+ new pages, enterprise features, 5+ integrations  
**Outcomes:** Full-featured SaaS platform ready for enterprise market  

---

## COMPLETE PROJECT TIMELINE

```
Phase 1 (Weeks 1-7):   MVP + Core features → 12 pages
Phase 2 (Weeks 8-13):  Advanced + Scale   → 30+ pages
─────────────────────────────────────────────────
Total:                 9-13 weeks → 67 pages ✓
```

---

**End of Phase 2 Document**

## 📚 ADDITIONAL RESOURCES

**Total Documentation:**
- PRD Phase 1: 50+ pages
- PRD Phase 2: 40+ pages
- API Specifications: 20+ pages
- Database Schema: 10+ pages
- Deployment Guide: 15+ pages
- **Total: 135+ pages of documentation**

**Ready for:**
✅ CTO review and approval
✅ Budget finalization
✅ Team assignment
✅ Development kickoff
✅ Investor presentations

---

**Document prepared by:** Product & Design Team  
**Date:** December 4, 2025  
**Status:** APPROVED FOR DEVELOPMENT

