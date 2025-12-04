# 🚀 Quick Setup Instructions

## Step 1: Get Supabase Credentials

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `purplemerit.co`

2. **Go to Settings → API**
   - Click **Settings** (⚙️ gear icon) in left sidebar
   - Click **API** in the menu

3. **Copy These 3 Values:**
   - **Project URL**: `https://purplemerit.co.supabase.co` (or copy from dashboard)
   - **Anon Key**: Click 👁️ next to `anon public` → Copy
   - **Service Role Key**: Click 👁️ next to `service_role secret` → Copy

---

## Step 2: Create .env.local File

1. **In your project folder** (`grammarpro/`)
2. **Create a new file** called `.env.local`
3. **Copy this template** and paste your credentials:

```env
# SUPABASE (Required - Get from Supabase Dashboard → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://purplemerit.co.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here

# JWT SECRETS (Required - Generate random strings)
JWT_SECRET=your_random_secret_key_min_64_characters_long
JWT_REFRESH_SECRET=your_random_refresh_secret_key

# APPLICATION
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_BASE_URL=http://localhost:3001
PORT=3001
```

**Replace:**
- `paste_your_anon_key_here` → Your Anon Key from Supabase
- `paste_your_service_role_key_here` → Your Service Role Key from Supabase
- `your_random_secret_key_min_64_characters_long` → Generate a random string (64+ chars)
- `your_random_refresh_secret_key` → Generate another random string

---

## Step 3: Generate JWT Secrets (Quick)

You can use this online tool or generate in terminal:

**Option 1: Online**
- Go to: https://generate-secret.vercel.app/64
- Generate 2 random strings (one for JWT_SECRET, one for JWT_REFRESH_SECRET)

**Option 2: Terminal**
```bash
# Generate JWT_SECRET (64 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_REFRESH_SECRET (64 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 4: Verify Setup

After creating `.env.local` with all values:

1. ✅ Check file exists: `grammarpro/.env.local`
2. ✅ All 3 Supabase values filled in
3. ✅ JWT secrets generated and added
4. ✅ Ready to proceed!

---

## 📋 Checklist

- [ ] Opened Supabase Dashboard → Settings → API
- [ ] Copied Project URL
- [ ] Copied Anon Key
- [ ] Copied Service Role Key
- [ ] Created `.env.local` file
- [ ] Pasted all Supabase credentials
- [ ] Generated JWT secrets
- [ ] Added JWT secrets to `.env.local`

---

## ✅ Once Complete

**Tell me when you're done**, and I'll:
1. Test the connection
2. Set up authentication system
3. Continue with PROMPT #3: Authentication System

---

## 🆘 Need Help?

**Can't find Settings?**
- Look for ⚙️ gear icon in left sidebar
- Or click your project name at top

**Can't see keys?**
- Click the 👁️ eye icon to reveal
- Keys are very long (hundreds of characters)

**File location:**
- Create `.env.local` in: `C:\Users\viraa\Downloads\Grammerly\grammarpro\.env.local`

