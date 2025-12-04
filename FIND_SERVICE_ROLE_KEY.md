# How to Find Service Role Key in Supabase

## 🔍 Step-by-Step Instructions

### Method 1: Settings → API (Most Common)

1. **Go to Supabase Dashboard**
   - Open: https://supabase.com/dashboard
   - Select your project

2. **Click Settings** (⚙️ gear icon in left sidebar)

3. **Click API** (in the settings menu)

4. **Scroll down to "Project API keys" section**

5. **Look for TWO keys:**
   - ✅ **`anon` `public`** - You already found this one!
   - 🔑 **`service_role` `secret`** - This is the one you need

6. **If you don't see `service_role`:**
   - The key might be hidden
   - Look for a key labeled **`secret`** or **`service_role`**
   - It might be collapsed/folded - try expanding the section

### Method 2: Check if it's Hidden

Sometimes the Service Role Key is:
- **Hidden by default** (for security)
- **Below the anon key** (scroll down)
- **In a collapsed section** (click to expand)
- **Labeled differently** (might say "secret" instead of "service_role")

### Method 3: Visual Guide

In the API settings page, you should see:

```
Project API keys
┌─────────────────────────────────────┐
│ anon        public                  │  ← You found this ✅
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...    │
│ [👁️] [Copy]                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ service_role  secret                │  ← Look for this! 🔑
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...    │
│ [👁️] [Copy]                         │
└─────────────────────────────────────┘
```

### Method 4: Alternative Location

If you still can't find it:

1. **Settings → General**
   - Sometimes shown in project settings

2. **Settings → Database**
   - Check connection strings section

3. **Project Settings → API**
   - Try different settings sections

## ⚠️ Important Notes

- **Service Role Key has ADMIN access** - It can bypass RLS policies
- **Keep it secret** - Never share publicly or commit to GitHub
- **It's a long string** - Similar format to anon key (starts with `eyJ...`)
- **It might be labeled as "secret"** instead of "service_role"

## 🔄 If You Still Can't Find It

**Option 1: Regenerate it**
1. Settings → API
2. Look for "Reset" or "Regenerate" button next to service_role key
3. ⚠️ This will invalidate the old key

**Option 2: Use Anon Key for Now**
- We can start with just the anon key
- Service role key is mainly for backend admin operations
- We can add it later if needed

## ✅ What to Do Next

1. **Try scrolling down** in the API settings page
2. **Look for any key labeled "secret"**
3. **Check if sections are collapsed** (click to expand)
4. **If found, copy it and add to .env.local**
5. **If not found, let me know** - we can proceed with anon key for now

