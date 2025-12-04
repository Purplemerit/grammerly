# Quick Supabase Credentials Setup

## 🎯 What You Need (3 Things)

1. **Project URL** - `https://purplemerit.co.supabase.co`
2. **Anon Key** - Public key (safe to use in frontend)
3. **Service Role Key** - Secret key (backend only, keep private!)

---

## 📍 Where to Find Them

### In Supabase Dashboard:

1. **Click Settings** (⚙️ gear icon in left sidebar)
2. **Click API** (in the settings menu)
3. **You'll see:**

```
Project URL
https://purplemerit.co.supabase.co

Project API keys
┌─────────────────────────────────────┐
│ anon        public                  │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...    │  ← Copy this (Anon Key)
│ [👁️] [Copy]                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ service_role  secret                │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...    │  ← Copy this (Service Role Key)
│ [👁️] [Copy]                         │
└─────────────────────────────────────┘
```

---

## 📝 Create .env.local File

1. Go to your project: `grammarpro/`
2. Copy `.env.example` → rename to `.env.local`
3. Open `.env.local` and paste your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://purplemerit.co.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_paste_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_paste_here
```

---

## ✅ Done!

Once you've added the credentials to `.env.local`, let me know and I'll:
1. Test the connection
2. Set up authentication system
3. Continue with PROMPT #3

---

## 🔒 Security Reminder

- ✅ `.env.local` is already in `.gitignore`
- ⚠️ Never share Service Role Key publicly
- ✅ Anon Key is safe for frontend

