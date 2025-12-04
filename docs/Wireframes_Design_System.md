# 📐 WIREFRAME & UI/UX DESIGN SYSTEM DOCUMENT
## GrammarPro - Website Version

**Document Version:** 1.0  
**Created:** December 4, 2025  
**Audience:** Design Team, Frontend Developers, Cursor AI  
**Status:** Ready for Implementation  

---

## 🎨 DESIGN SYSTEM FOUNDATION

### 1. COLOR PALETTE

#### Primary Colors
```
Primary Blue: #2180E0
├─ Light: #E3F0FF
├─ Dark: #1565C0
├─ RGB: rgb(33, 128, 224)
└─ Usage: CTA buttons, links, hover states

Accent Teal: #208A8A
├─ Light: #E0F7F7
├─ Dark: #0F6666
├─ RGB: rgb(32, 138, 138)
└─ Usage: Success states, highlights

Secondary Orange: #FF6B35
├─ Light: #FFE5D9
├─ Dark: #CC5629
├─ RGB: rgb(255, 107, 53)
└─ Usage: Warnings, important alerts
```

#### Neutral Colors
```
White: #FFFFFF
├─ Background: #FAFAFA
├─ Light Gray: #F5F5F5
├─ Medium Gray: #E8E8E8
├─ Dark Gray: #404040
└─ Black: #000000

Grayscale Palette:
├─ 50: #F9FAFB
├─ 100: #F3F4F6
├─ 200: #E5E7EB
├─ 300: #D1D5DB
├─ 400: #9CA3AF
├─ 500: #6B7280
├─ 600: #4B5563
├─ 700: #374151
├─ 800: #1F2937
└─ 900: #111827
```

#### Semantic Colors
```
Success: #10B981 (Green)
├─ Light: #D1FAE5
├─ Dark: #047857
└─ RGB: rgb(16, 185, 129)

Error: #EF4444 (Red)
├─ Light: #FEE2E2
├─ Dark: #DC2626
└─ RGB: rgb(239, 68, 68)

Warning: #F59E0B (Amber)
├─ Light: #FEF3C7
├─ Dark: #D97706
└─ RGB: rgb(245, 158, 11)

Info: #3B82F6 (Blue)
├─ Light: #DBEAFE
├─ Dark: #1D4ED8
└─ RGB: rgb(59, 130, 246)
```

---

### 2. TYPOGRAPHY SYSTEM

#### Font Families
```
Primary Font: 'Inter' (System Stack Fallback)
Font Stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif

Monospace Font: 'Fira Code' / 'Monaco'
Font Stack: 'Fira Code', 'Monaco', 'Courier New', monospace

Display Font (Headlines): 'Poppins'
Font Stack: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

#### Font Sizes & Scale
```
Display XL (48px): font-size: 48px, line-height: 56px
├─ Font Weight: 700
├─ Letter Spacing: -1.5px
└─ Usage: Page hero headlines

Display LG (40px): font-size: 40px, line-height: 48px
├─ Font Weight: 700
├─ Letter Spacing: -1px
└─ Usage: Major section headings

Display MD (36px): font-size: 36px, line-height: 44px
├─ Font Weight: 600
├─ Letter Spacing: -0.5px
└─ Usage: Section titles

Heading XL (32px): font-size: 32px, line-height: 40px
├─ Font Weight: 600
└─ Usage: H1 tags

Heading LG (28px): font-size: 28px, line-height: 36px
├─ Font Weight: 600
└─ Usage: H2 tags

Heading MD (24px): font-size: 24px, line-height: 32px
├─ Font Weight: 600
└─ Usage: H3 tags

Heading SM (20px): font-size: 20px, line-height: 28px
├─ Font Weight: 600
└─ Usage: H4 tags

Heading XS (16px): font-size: 16px, line-height: 24px
├─ Font Weight: 600
└─ Usage: H5 tags

Body LG (18px): font-size: 18px, line-height: 28px
├─ Font Weight: 400
├─ Letter Spacing: 0px
└─ Usage: Large body text, lead paragraphs

Body Regular (16px): font-size: 16px, line-height: 24px
├─ Font Weight: 400
└─ Usage: Default paragraph text

Body SM (14px): font-size: 14px, line-height: 20px
├─ Font Weight: 400
└─ Usage: Secondary text, descriptions

Body XS (12px): font-size: 12px, line-height: 16px
├─ Font Weight: 400
└─ Usage: Helper text, captions, labels

Caption (11px): font-size: 11px, line-height: 14px
├─ Font Weight: 500
├─ Letter Spacing: 0.5px
└─ Usage: Very small captions
```

#### Font Weights
```
Thin: 100 (Not typically used)
Light: 300 (Rare, premium feel)
Regular: 400 (Body text, descriptions)
Medium: 500 (UI labels, badges)
Semibold: 600 (Headings, emphasis)
Bold: 700 (Strong emphasis, CTA text)
Extrabold: 800 (Not typically used)
```

---

### 3. SPACING SYSTEM

```
Spacing Scale (Based on 4px unit):
├─ xs-0: 0px
├─ xs-1: 2px
├─ xs-2: 4px
├─ sm-1: 8px (Tightest spacing)
├─ sm-2: 12px
├─ md-1: 16px (Default spacing)
├─ md-2: 20px
├─ md-3: 24px
├─ lg-1: 32px
├─ lg-2: 40px
├─ lg-3: 48px
├─ xl-1: 64px
├─ xl-2: 80px
├─ xl-3: 96px
├─ 2xl-1: 128px (Maximum)
└─ 2xl-2: 160px

Typical Usage:
├─ Component padding: 16px (md-1)
├─ Section margin: 48px (lg-3)
├─ Card spacing: 20px (md-2)
├─ List items gap: 12px (sm-2)
└─ Form input gap: 16px (md-1)
```

---

### 4. GRID SYSTEM

```
Desktop Grid (1024px+):
├─ Columns: 12
├─ Column Width: 76px
├─ Gutter: 24px
├─ Margin: 40px
├─ Max Width: 1200px
└─ Breakpoint: max-width: 1200px

Tablet Grid (768px - 1023px):
├─ Columns: 8
├─ Column Width: 64px
├─ Gutter: 20px
├─ Margin: 32px
└─ Max Width: 768px

Mobile Grid (320px - 767px):
├─ Columns: 4
├─ Column Width: Auto
├─ Gutter: 16px
├─ Margin: 16px
└─ Max Width: 100%
```

---

### 5. BORDER RADIUS

```
Rounded Corners:
├─ none: 0px
├─ xs: 2px (Subtle)
├─ sm: 4px (Minor elements)
├─ base: 8px (Default, cards)
├─ md: 12px (Larger components)
├─ lg: 16px (Large elements)
├─ xl: 20px (Extra large)
├─ 2xl: 24px (Maximum)
└─ full: 9999px (Circles, badges)

Typical Usage:
├─ Card: 12px (md)
├─ Button: 8px (base)
├─ Input: 8px (base)
├─ Modal: 16px (lg)
├─ Avatar: 9999px (full - circle)
└─ Badge: 4px (sm)
```

---

### 6. SHADOW SYSTEM

```
Elevation Shadows (Z-index based):

Shadow XS (Subtle):
└─ box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)

Shadow SM (Slight elevation):
└─ box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)

Shadow MD (Standard):
└─ box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

Shadow LG (Prominent):
└─ box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)

Shadow XL (Strong):
└─ box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)

Shadow 2XL (Maximum):
└─ box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

Inset Shadow (Sunken):
└─ box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)

Typical Usage:
├─ Cards: Shadow MD
├─ Modals: Shadow XL
├─ Hover state: Shadow LG
├─ Buttons: None (use color instead)
└─ Dropdowns: Shadow LG
```

---

### 7. BUTTONS

#### Button Styles

```
PRIMARY BUTTON
├─ Background: #2180E0
├─ Text Color: #FFFFFF
├─ Padding: 12px 24px (height 44px)
├─ Border Radius: 8px
├─ Font Weight: 600
├─ Font Size: 16px
├─ Cursor: pointer
├─ Transition: all 200ms ease
├─ Hover State: #1565C0 (darker)
├─ Active State: #0F4A8F (even darker)
├─ Focus State: Box shadow + outline
└─ Disabled: Opacity 50%, cursor not-allowed

SECONDARY BUTTON
├─ Background: #F3F4F6
├─ Text Color: #374151
├─ Padding: 12px 24px (height 44px)
├─ Border: 1px solid #E5E7EB
├─ Border Radius: 8px
├─ Font Weight: 600
├─ Hover State: #E5E7EB background
├─ Active State: #D1D5DB background
└─ Focus State: Blue outline

TERTIARY BUTTON
├─ Background: transparent
├─ Text Color: #2180E0
├─ Padding: 12px 24px
├─ Border: None
├─ Font Weight: 600
├─ Hover State: #E3F0FF background
├─ Active State: #D1E7FF background
└─ Focus State: Blue outline

DANGER BUTTON
├─ Background: #EF4444
├─ Text Color: #FFFFFF
├─ Padding: 12px 24px
├─ Border Radius: 8px
├─ Font Weight: 600
├─ Hover State: #DC2626 (darker)
├─ Active State: #B91C1C (even darker)
└─ Focus State: Red outline

GHOST BUTTON
├─ Background: transparent
├─ Text Color: #6B7280
├─ Border: 1px solid #D1D5DB
├─ Padding: 12px 24px
├─ Hover State: #F9FAFB background
└─ Active State: #F3F4F6 background
```

#### Button Sizes

```
Small Button
├─ Padding: 8px 16px (height 32px)
├─ Font Size: 14px
└─ Usage: Compact areas

Regular Button
├─ Padding: 12px 24px (height 44px)
├─ Font Size: 16px
└─ Usage: Default everywhere

Large Button
├─ Padding: 16px 32px (height 52px)
├─ Font Size: 18px
└─ Usage: Hero CTA

Full Width Button
├─ Width: 100%
├─ Height: 44px
└─ Usage: Forms, mobile
```

---

### 8. FORM ELEMENTS

#### Input Fields

```
Text Input
├─ Height: 44px
├─ Padding: 12px 16px
├─ Background: #FFFFFF
├─ Border: 1px solid #E5E7EB
├─ Border Radius: 8px
├─ Font Size: 16px
├─ Color: #1F2937
├─ Placeholder Color: #9CA3AF
├─ Focus: Border #2180E0, box-shadow: 0 0 0 3px rgba(33, 128, 224, 0.1)
├─ Error: Border #EF4444, background #FEF2F2
├─ Disabled: Background #F9FAFB, cursor not-allowed
└─ Read-only: Background #F3F4F6, cursor default

Textarea
├─ Min Height: 120px
├─ Same styling as text input
├─ Resize: vertical
└─ Font Family: sans-serif (not monospace)

Select/Dropdown
├─ Height: 44px
├─ Padding: 12px 16px
├─ Appearance: none (custom arrow)
├─ Arrow: SVG icon on right
├─ Background: white with dropdown icon
└─ Same focus/error states as text input

Checkbox
├─ Size: 20px × 20px
├─ Border: 2px solid #D1D5DB
├─ Border Radius: 4px
├─ Checked: Background #2180E0
├─ Focus: Blue outline
└─ Label padding: 8px left

Radio Button
├─ Size: 20px × 20px
├─ Border: 2px solid #D1D5DB
├─ Border Radius: 50%
├─ Checked: Inner circle #2180E0
├─ Focus: Blue outline
└─ Label padding: 8px left

Toggle/Switch
├─ Width: 48px
├─ Height: 24px
├─ Border Radius: 12px
├─ Off: Background #D1D5DB
├─ On: Background #10B981
├─ Circle: 20px, smooth transition
└─ Transition: 200ms ease
```

#### Form Labels

```
Label Text
├─ Font Size: 14px
├─ Font Weight: 500
├─ Color: #374151
├─ Margin Bottom: 8px
├─ Display: block
├─ Required asterisk: Color #EF4444
└─ Letter Spacing: -0.25px

Placeholder Text
├─ Font Size: 16px
├─ Font Weight: 400
├─ Color: #9CA3AF
└─ Letter Spacing: 0px

Helper Text
├─ Font Size: 12px
├─ Font Weight: 400
├─ Color: #6B7280
├─ Margin Top: 4px
└─ Display: block

Error Message
├─ Font Size: 12px
├─ Font Weight: 400
├─ Color: #EF4444
├─ Margin Top: 4px
├─ Icon: ⓘ or ✕
└─ Display: block
```

---

## 📱 WIREFRAMES - WEBSITE VERSION

### LANDING PAGE WIREFRAME

```
┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION BAR (Fixed, Height: 80px)                        │
├─────────────────────────────────────────────────────────────┤
│ Logo | Nav Menu | CTA Button                                │
│ (Home, Pricing, Features, About) | "Start Free"             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ HERO SECTION (Height: 600px)                                │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐  ┌─────────────────────────┐        │
│  │ Headline           │  │ Animated Hero Image     │        │
│  │ "Write Better..."  │  │ (Live Grammar Demo)     │        │
│  │                    │  │                         │        │
│  │ Subheading         │  │                         │        │
│  │ "Professional..."  │  │                         │        │
│  │                    │  │                         │        │
│  │ CTA: Primary Btn   │  │                         │        │
│  │ "Start Free"       │  │                         │        │
│  │ Secondary: "Demo"  │  │                         │        │
│  └────────────────────┘  └─────────────────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ VALUE PROPOSITION (Height: 400px)                           │
├─────────────────────────────────────────────────────────────┤
│ Section Title: "Why Choose GrammarPro?"                     │
│                                                              │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│ │  Card 1      │  │  Card 2      │  │  Card 3      │       │
│ │  Icon        │  │  Icon        │  │  Icon        │       │
│ │  Title       │  │  Title       │  │  Title       │       │
│ │  Description │  │  Description │  │  Description │       │
│ └──────────────┘  └──────────────┘  └──────────────┘       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ FEATURES SHOWCASE (Height: 500px)                           │
├─────────────────────────────────────────────────────────────┤
│ "Powerful Features, Simple to Use"                          │
│                                                              │
│ Feature 1    Feature 2    Feature 3    Feature 4            │
│ [Image]      [Image]      [Image]      [Image]              │
│ Title        Title        Title        Title                │
│ Desc         Desc         Desc         Desc                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ PRICING PREVIEW (Height: 450px)                             │
├─────────────────────────────────────────────────────────────┤
│ "Plans for Every Writer"                                    │
│                                                              │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│ │ FREE $0    │  │ PRO $10 ⭐ │  │ BUSINESS   │             │
│ │            │  │            │  │ Custom     │             │
│ │ Features   │  │ Features   │  │ Features   │             │
│ │            │  │            │  │            │             │
│ │ [Button]   │  │ [Button]   │  │ [Button]   │             │
│ └────────────┘  └────────────┘  └────────────┘             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ SOCIAL PROOF (Height: 350px)                                │
├─────────────────────────────────────────────────────────────┤
│ "Trusted by 100,000+ Writers"                               │
│                                                              │
│ [Stat] [Stat] [Stat] [Stat]                                 │
│                                                              │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│ │ Testimonial 1        │  │ Testimonial 2    │              │
│ │ [Avatar] [Name]      │  │ [Avatar] [Name]  │              │
│ │ "Quote..."           │  │ "Quote..."       │              │
│ └──────────┘  └──────────┘  └──────────┘                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ FAQ SECTION (Height: 400px)                                 │
├─────────────────────────────────────────────────────────────┤
│ "Common Questions"                                          │
│                                                              │
│ [Expandable Q&A Items] × 5                                  │
│ [Q] - [>] (Click to expand)                                 │
│ [Q] - [>]                                                   │
│ [Q] - [>]                                                   │
│ [Q] - [>]                                                   │
│ [Q] - [>]                                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ CTA FOOTER (Height: 250px)                                  │
├─────────────────────────────────────────────────────────────┤
│ "Start Writing Better Today"                                │
│ [Primary Button: "Start Free"]                              │
│ [Secondary: "Schedule Demo"]                                │
│                                                              │
│ Footer Links & Social Icons                                 │
└─────────────────────────────────────────────────────────────┘
```

### DASHBOARD PAGE WIREFRAME

```
┌─────────────────────────────────────────────────────────────┐
│ TOP BAR (Height: 64px)                                      │
├─────────────────────────────────────────────────────────────┤
│ Logo | "Dashboard" | [Search] [Upgrade] [Profile Menu]     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────────────────────────────────────────────────┤
│ │ SIDEBAR (Width: 250px, Fixed)                            │
│ ├─────────────────────────────────────────────────────────┤
│ │                                                          │
│ │ • Dashboard (Active)                                    │
│ │ • My Documents                                          │
│ │ • Create New                                            │
│ │ • Grammar Checker                                       │
│ │ • Plagiarism Detector                                   │
│ │ • Analytics                                             │
│ │                                                          │
│ │ ───────────────────────────────────────                 │
│ │ • Account Settings                                      │
│ │ • Billing                                               │
│ │ • Logout                                                │
│ │                                                          │
│ ├─────────────────────────────────────────────────────────┤
│ │ MAIN CONTENT AREA                                       │
│ ├─────────────────────────────────────────────────────────┤
│ │                                                          │
│ │ "Welcome back, [User Name]!"                            │
│ │                                                          │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │ │ Stat 1  │ │ Stat 2  │ │ Stat 3  │ │ Stat 4  │        │
│ │ │ Number  │ │ Number  │ │ Number  │ │ Number  │        │
│ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│ │                                                          │
│ │ ┌──────────────────────────────────────────────────┐    │
│ │ │ Recent Documents                                │    │
│ │ ├──────────────────────────────────────────────────┤    │
│ │ │ Doc 1  │ Word Count │ Score │ Date │ [...]     │    │
│ │ │ Doc 2  │ Word Count │ Score │ Date │ [...]     │    │
│ │ │ Doc 3  │ Word Count │ Score │ Date │ [...]     │    │
│ │ └──────────────────────────────────────────────────┘    │
│ │                                                          │
│ │ ┌──────────────────────────────────────────────────┐    │
│ │ │ Plan Information                                │    │
│ │ ├──────────────────────────────────────────────────┤    │
│ │ │ Current Plan: Free                              │    │
│ │ │ Documents: 3/5 [Progress Bar]                   │    │
│ │ │ Storage: 850MB/1GB [Progress Bar]               │    │
│ │ │ [Upgrade to Pro Button]                         │    │
│ │ └──────────────────────────────────────────────────┘    │
│ │                                                          │
│ └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

### EDITOR PAGE WIREFRAME

```
┌─────────────────────────────────────────────────────────────┐
│ EDITOR HEADER (Height: 64px)                                │
├─────────────────────────────────────────────────────────────┤
│ [Back] │ Document Title (Editable) │ [Save Status]         │
│        │ [Bold] [Italic] [...]     │ [Export] [Share]      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ LEFT SIDEBAR (250px)       │ MAIN EDITOR (500px)      │  │
│ ├──────────────────────────┼──────────────────────────┤  │
│ │ • Word Count: 2450      │  ┌────────────────────┐   │  │
│ │ • Reading Time: 8 min   │  │                    │   │  │
│ │ • Grammar Score: 94%    │  │ [Editable Content] │   │  │
│ │                         │  │                    │   │  │
│ │ Quick Links:            │  │ Real-time text     │   │  │
│ │ • Go to errors          │  │ editing area       │   │  │
│ │ • Go to plagiarism      │  │                    │   │  │
│ │ • Go to tone issues     │  │ Red underlines     │   │  │
│ │                         │  │ for errors         │   │  │
│ │ Document History        │  │                    │   │  │
│ │ [View Versions]         │  │ Grammar errors     │   │  │
│ │                         │  │ highlighted        │   │  │
│ │                         │  └────────────────────┘   │  │
│ ├────────────────────────┼──────────────────────────┤  │
│ │ RIGHT SIDEBAR (Suggestions Panel - 250px)         │  │
│ ├──────────────────────────────────────────────────┤  │
│ │ SUGGESTIONS                                       │  │
│ │ [Tabs: Grammar │ Tone │ Plagiarism │ Stats]     │  │
│ │                                                  │  │
│ │ Grammar Issues:                                  │  │
│ │ ┌────────────────────────────────────────────┐  │  │
│ │ │ Error 1: Subject-verb agreement            │  │  │
│ │ │ "The team ARE..." → "The team IS..."       │  │  │
│ │ │ [Accept] [Ignore]                          │  │  │
│ │ └────────────────────────────────────────────┘  │  │
│ │                                                  │  │
│ │ ┌────────────────────────────────────────────┐  │  │
│ │ │ Error 2: Punctuation                       │  │  │
│ │ │ [Accept] [Ignore]                          │  │  │
│ │ └────────────────────────────────────────────┘  │  │
│ │                                                  │  │
│ │ [More suggestions...]                           │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
│ FLOATING ACTION BUTTONS (Bottom Right, Mobile)       │
│ [Check Grammar] [Check Plagiarism] [More]            │
└────────────────────────────────────────────────────────┘
```

### PRICING PAGE WIREFRAME

```
┌─────────────────────────────────────────────────────────────┐
│ PRICING HEADER                                              │
├─────────────────────────────────────────────────────────────┤
│ "Simple, Transparent Pricing"                               │
│ "Choose the perfect plan for your needs"                    │
│                                                              │
│ [Monthly] [Annual - Save 33%]                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ PRICING CARDS (3-Column Layout)                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │
│ │ FREE           │  │ PRO ⭐         │  │ BUSINESS       │ │
│ │ $0/month       │  │ Most Popular   │  │ Custom         │ │
│ │                │  │ $10/month      │  │ $25+/user      │ │
│ │ ✓ 5 docs       │  │                │  │                │ │
│ │ ✓ 1GB storage  │  │ ✓ Unlimited    │  │ ✓ Unlimited    │ │
│ │ ✓ Basic grammar│  │ ✓ 50GB storage │  │ ✓ 500GB/user   │ │
│ │ ✗ Plagiarism   │  │ ✓ Plagiarism   │  │ ✓ Plagiarism   │ │
│ │ ✗ Team         │  │ ✓ 3 members    │  │ ✓ Unlimited    │ │
│ │                │  │ ✓ Support 24h  │  │ ✓ SSO          │ │
│ │ [Start Free]   │  │ [Try 7 Days]   │  │ [Contact Sales]│ │
│ └────────────────┘  └────────────────┘  └────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ FEATURE COMPARISON TABLE                                    │
├─────────────────────────────────────────────────────────────┤
│ Feature             │ FREE  │ PRO   │ BUSINESS │             │
│ ─────────────────────┼───────┼───────┼──────────┤             │
│ Documents           │ 5     │ ∞     │ ∞        │             │
│ Storage             │ 1GB   │ 50GB  │ 500GB    │             │
│ Grammar Checking    │ ✓     │ ✓     │ ✓        │             │
│ Plagiarism Detection│ ✗     │ ✓     │ ✓        │             │
│ Team Members        │ 1     │ 3     │ ∞        │             │
│ Browser Extension   │ ✗     │ ✓     │ ✓        │             │
│ Mobile App          │ ✗     │ ✗     │ ✓        │             │
│ Desktop App         │ ✗     │ ✗     │ ✓        │             │
│ SSO                 │ ✗     │ ✗     │ ✓        │             │
│ API Access          │ ✗     │ ✗     │ ✓        │             │
│ [More rows...]      │       │       │          │             │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ FAQ SECTION                                                 │
├─────────────────────────────────────────────────────────────┤
│ [Expandable Q&A] × 5                                        │
│                                                              │
│ CTA FOOTER: "Ready to get started?"                         │
│ [Start Free Trial]                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 RESPONSIVE DESIGN BREAKPOINTS

```
Mobile First Approach:

Breakpoint 1: Mobile (320px - 639px)
├─ Single column layout
├─ Full-width elements
├─ Bottom navigation
├─ Stacked components
└─ Simplified UI

Breakpoint 2: Tablet (640px - 1023px)
├─ 2-column layout
├─ Sidebar appears
├─ Optimized spacing
├─ Grid elements adapt
└─ Touch-friendly targets

Breakpoint 3: Desktop (1024px+)
├─ 3-column layout
├─ Full features
├─ Rich interactions
├─ Hover states
└─ Full navigation

CSS Media Queries:
@media (max-width: 639px) { /* Mobile */ }
@media (min-width: 640px) and (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

---

## 🔧 COMPONENT SPECIFICATIONS

### Navigation Component
```
Fixed Height: 80px
├─ Logo (left): 40px × 40px
├─ Nav Menu (center): flex gap 32px
├─ CTA Button (right): 44px height
├─ Padding: 16px 40px
├─ Background: White
├─ Border Bottom: 1px solid #E5E7EB
├─ Shadow: Shadow SM
├─ Z-index: 100
├─ Sticky: Yes (fixed position)
└─ Mobile: Hamburger menu at 640px

Mobile Navigation:
├─ Full screen overlay
├─ Slide from left
├─ Z-index: 999
└─ Close button (top right)
```

### Card Component
```
Border: 1px solid #E5E7EB
├─ Border Radius: 12px
├─ Padding: 24px
├─ Background: #FFFFFF
├─ Box Shadow: Shadow MD
├─ Transition: all 200ms ease
├─ Hover: Box Shadow LG
├─ Max Width: 100%
└─ Mobile: 16px padding, full width

Card Header:
├─ Font Size: 18px
├─ Font Weight: 600
├─ Margin Bottom: 16px
└─ Color: #1F2937

Card Body:
├─ Font Size: 14px
├─ Line Height: 1.6
└─ Color: #6B7280

Card Footer:
├─ Border Top: 1px solid #E5E7EB
├─ Padding Top: 16px
├─ Margin Top: 16px
└─ Text align: right
```

### Modal Component
```
Backdrop:
├─ Background: rgba(0, 0, 0, 0.5)
├─ Position: fixed, full screen
├─ Z-index: 1000
└─ Transition: opacity 300ms

Modal Content:
├─ Width: 90% (mobile) / 600px (desktop)
├─ Max Width: 600px
├─ Border Radius: 16px
├─ Background: White
├─ Box Shadow: Shadow XL
├─ Position: center (fixed + transform)
├─ Z-index: 1001
└─ Animation: slide-up 300ms ease

Modal Header:
├─ Padding: 24px
├─ Border Bottom: 1px solid #E5E7EB
├─ Font Size: 20px
├─ Font Weight: 600
└─ Close button (top right)

Modal Footer:
├─ Padding: 24px
├─ Border Top: 1px solid #E5E7EB
├─ Text align: right
├─ Button gap: 12px
└─ [Cancel] [Action]
```

---

## 📐 LAYOUT SPECIFICATIONS

### Container
```
Max Width: 1200px
Padding: 40px (desktop) / 32px (tablet) / 16px (mobile)
Margin: 0 auto
Background: #FFFFFF
```

### Section Spacing
```
Section Margin: 48px (vertical gap between sections)
Section Padding: 64px (top/bottom padding)
Mobile Section Padding: 32px
```

### Component Gaps
```
Horizontal Gap: 24px (default)
Vertical Gap: 32px (default)
Card Grid Gap: 20px
Form Elements Gap: 16px
List Items Gap: 12px
```

---

## ✨ ANIMATION & TRANSITIONS

```
Standard Transition: 200ms ease
├─ Button hover/active states
├─ Link underlines
├─ Color changes
└─ Minor interactions

Element Transition: 300ms ease-out
├─ Modal appearance
├─ Slide animations
├─ Fade transitions
└─ Major layout changes

Spring Animation: cubic-bezier(0.16, 1, 0.3, 1)
├─ Bounce effects
├─ Interactive feedback
└─ Positive moments

Disable Animations:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎨 ACCESSIBILITY SPECIFICATIONS

### Color Contrast
```
Text on Background:
├─ Normal text: 4.5:1 minimum (WCAG AA)
├─ Large text (18px+): 3:1 minimum
├─ Button text: 4.5:1 minimum
└─ Important text: 7:1 preferred (WCAG AAA)

Example:
├─ Black text (#1F2937) on white: 21:1 ✓
├─ Gray text (#6B7280) on white: 5.3:1 ✓
├─ Light text on colored bg: Check ratio
└─ Use contrast checker tool
```

### Focus States
```
All interactive elements must have visible focus:
├─ Button: 2px blue outline, 4px offset
├─ Input: 3px blue box-shadow
├─ Link: 2px underline + outline
├─ Keyboard navigation: Tab key support
└─ Focus-visible pseudo-class
```

### Screen Reader Support
```
Landmarks:
├─ <header>: Navigation
├─ <main>: Primary content
├─ <nav>: Navigation menu
└─ <footer>: Footer

ARIA Labels:
├─ aria-label: "Close menu"
├─ aria-describedby: Helper text
├─ aria-hidden: Decorative elements
└─ role: For custom components
```

---

## 📊 VISUAL SPECIFICATIONS SUMMARY

| Element | Value | Notes |
|---------|-------|-------|
| Primary Color | #2180E0 | Used for main CTAs |
| Secondary Color | #208A8A | Accents & success |
| Text Color | #1F2937 | Body text |
| Background | #FFFFFF | Default |
| Border Color | #E5E7EB | Subtle borders |
| Border Radius | 8-12px | Cards & inputs |
| Shadow | MD standard | Depth system |
| Font | Inter | Primary font |
| Line Height | 1.5-1.6 | Readability |
| Letter Spacing | Normal | Except headings |

---

**Document Status:** ✅ COMPLETE  
**Ready for:** Figma design, React components, Frontend development  
**Implementation:** Use TailwindCSS / styled-components  
**Cursor Understanding:** High-level system defined, ready for component generation

