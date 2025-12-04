# Step-by-Step: Get Supabase Credentials & Connect

## 📋 What Credentials We Need

We need **3 pieces of information** from your Supabase project:

1. **Project URL** - Your Supabase project URL
2. **Anon Key** - Public key for client-side access
3. **Service Role Key** - Secret key for server-side operations (keep this private!)

---

## 🔑 Step 1: Get Your Project URL

1. In Supabase Dashboard, look at your browser's address bar
2. You should see: `https://purplemerit.co.supabase.co` (or similar)
3. **Copy this URL** - This is your Project URL
   - Format: `https://[your-project-id].supabase.co`

**OR**

1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **API** in the settings menu
3. Under **Project URL**, you'll see your URL
4. **Copy it**

---

## 🔑 Step 2: Get Your Anon Key (Public Key)

1. In Supabase Dashboard, click **Settings** (gear icon) in left sidebar
2. Click **API** in the settings menu
3. Scroll down to **Project API keys** section
4. Find the key labeled **`anon` `public`** (or just **`anon`**)
5. Click the **eye icon** 👁️ to reveal the key (or click **Copy** button)
6. **Copy this key** - This is your Anon Key
   - It looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long string)

---

## 🔑 Step 3: Get Your Service Role Key (Secret Key)

⚠️ **IMPORTANT:** This key has admin access. Keep it secret!

1. Still in **Settings → API**
2. Scroll to **Project API keys** section
3. Find the key labeled **`service_role` `secret`**
4. Click the **eye icon** 👁️ to reveal the key
5. **Copy this key** - This is your Service Role Key
   - It also looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long string)
6. **⚠️ DO NOT share this publicly or commit it to GitHub!**

---

## 📝 Step 4: Create Environment File

Now we'll add these credentials to your project:

1. In your project folder (`grammarpro`), look for `.env.example` file
2. Copy it and create a new file called `.env.local`
3. Open `.env.local` in your code editor

---

## ✏️ Step 5: Fill in Your Credentials

Open `.env.local` and fill in your credentials:

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://purplemerit.co.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here

# Database URL (optional, for direct connection)
# You can find this in Settings → Database → Connection string
# Format: postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
DATABASE_URL=your_database_connection_string_here
```

**Replace:**
- `https://purplemerit.co.supabase.co` with your actual Project URL
- `paste_your_anon_key_here` with your Anon Key
- `paste_your_service_role_key_here` with your Service Role Key

---

## ✅ Step 6: Verify Your Setup

After adding credentials, I'll help you:
1. Test the connection
2. Verify authentication works
3. Proceed with PROMPT #3: Authentication System

---

## 🔒 Security Notes

- ✅ `.env.local` is already in `.gitignore` (won't be committed)
- ✅ Never commit `.env.local` to GitHub
- ✅ Service Role Key has admin access - keep it secret
- ✅ Anon Key is safe for client-side use

---

## 📸 Visual Guide Locations

In Supabase Dashboard:
- **Settings** → Left sidebar, gear icon ⚙️
- **API** → Under Settings menu
- **Project URL** → Top of API page
- **Project API keys** → Scroll down on API page
  - `anon` key → For client-side
  - `service_role` key → For server-side (secret!)

---

## 🆘 Troubleshooting

**Can't find Settings?**
- Look for gear icon ⚙️ in left sidebar
- Or click your project name at top → Settings

**Can't see the keys?**
- Click the eye icon 👁️ to reveal hidden keys
- Or click the copy button to copy directly

**Key looks wrong?**
- Keys are very long (hundreds of characters)
- They start with `eyJ...` (JWT format)
- Make sure you copied the entire key

---

## 📋 Quick Checklist

- [ ] Project URL copied
- [ ] Anon Key copied
- [ ] Service Role Key copied
- [ ] `.env.local` file created
- [ ] All credentials added to `.env.local`
- [ ] Ready to proceed with authentication setup

