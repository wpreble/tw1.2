# The Way - Setup Guide

Complete setup instructions for launching The Way mobile app with authentication and database.

---

## Prerequisites Completed

✅ React Native/Expo app initialized
✅ Supabase project created
✅ OpenAI API key configured
✅ Environment variables set up
✅ Auth screens built (Login + Chat)
✅ Google Sign-In configured
✅ Apple Sign-In configured

---

## Next Steps to Launch

### 1. Create Supabase Database Tables

1. Go to your Supabase dashboard: https://app.supabase.com/project/gbcptmhtegfbntbhithe
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `supabase-schema.sql` and paste into the editor
5. Click **Run** to create all tables and policies

This will create:
- `chat_sessions` table (stores user chat sessions)
- `messages` table (stores individual messages)
- Row Level Security (RLS) policies (users can only access their own data)
- Helper functions

---

### 2. Configure Google OAuth in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. You'll need to create a Google Cloud Project:
   - Go to https://console.cloud.google.com
   - Create a new project (or use existing)
   - Enable **Google+ API**
   - Create **OAuth 2.0 Client IDs**:
     - **Web client** (for Supabase redirect)
     - **iOS client** (for native iOS app)
   - Copy the Web Client ID and Client Secret
4. In Supabase, paste:
   - **Client ID** (Web)
   - **Client Secret**
5. Copy the redirect URL from Supabase and add it to Google Cloud Console

**Add redirect URL to Google:**
- In Google Cloud Console → Credentials → Your OAuth Client
- Add: `https://gbcptmhtegfbntbhithe.supabase.co/auth/v1/callback`

---

### 3. Configure Apple Sign In (iOS Only)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Apple** provider
3. You'll need an Apple Developer Account ($99/year):
   - Go to https://developer.apple.com/account
   - Navigate to **Certificates, Identifiers & Profiles**
   - Create a **Service ID** for Sign in with Apple
   - Create a **Key** for Sign in with Apple
   - Download the key file (.p8)
4. In Supabase, configure:
   - **Services ID**
   - **Key ID**
   - **Team ID**
   - Upload the **.p8 key file**

**Add redirect URL to Apple:**
- In Apple Developer Portal → Service ID
- Add: `https://gbcptmhtegfbntbhithe.supabase.co/auth/v1/callback`

---

### 4. Get Supabase Service Role Key

You need the **service role key** for the backend API:

1. In Supabase dashboard, go to **Project Settings** → **API**
2. Copy the **service_role** key (secret key)
3. Update `.env.local`:

```bash
SUPABASE_SERVICE_KEY=eyJhbG...your_service_key_here
```

⚠️ **Important**: The service role key bypasses RLS. Never expose it to the client!

---

### 5. Update Google Client IDs in Code

Update `/home/user/tw1.2/src/services/auth.ts`:

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID.apps.googleusercontent.com',
});
```

Also update `app.config.js` if needed for EAS builds.

---

### 6. Run the App Locally

**Terminal 1 - Start Backend API:**
```bash
npm run api
```

**Terminal 2 - Start Expo:**
```bash
npm start
```

**Test on device:**
- Scan QR code with Expo Go (limited - won't work with native modules)
- OR build development client (recommended):
  ```bash
  eas build --profile development --platform ios
  ```

---

### 7. Test Authentication Flow

1. Open the app
2. You should see the Login screen
3. Try **Continue with Google**:
   - Opens Google sign-in
   - Returns to app
   - Should redirect to Chat screen
4. Try **Continue with Apple** (iOS only):
   - Opens Apple sign-in
   - Returns to app
   - Should redirect to Chat screen
5. Try sending a message:
   - Should get a response from OpenAI
   - Message should be saved to Supabase
6. Try **Sign Out**:
   - Should return to Login screen

---

### 8. Verify Database

Check that data is being stored:

1. In Supabase dashboard, go to **Table Editor**
2. Check `chat_sessions` table - should have a row
3. Check `messages` table - should have your test messages
4. Check `auth.users` table - should have your user account

---

## Troubleshooting

### Google Sign-In Not Working

- Make sure redirect URL is added to Google Cloud Console
- Check that Web Client ID is correct in Supabase
- Check that iOS Client ID is correct in `auth.ts`
- Expo Go doesn't support native Google Sign-In - need development build

### Apple Sign-In Not Working

- Only works on iOS devices (not simulator in many cases)
- Requires Apple Developer account
- Check that Service ID and redirect URL are configured
- Need development build (Expo Go won't work)

### API Calls Failing with 401

- Check that Supabase credentials are correct in `.env.local`
- Verify service role key is set
- Check that auth token is being sent in requests
- Check backend logs for auth errors

### Backend Can't Connect to OpenAI

- Verify `OPENAI_API_KEY` in `.env.local`
- Check that API key is valid (rotate if exposed)
- Check backend logs for OpenAI errors

### Messages Not Saving to Database

- Verify database tables were created (run `supabase-schema.sql`)
- Check RLS policies are enabled
- Check that user is authenticated
- Look at Supabase logs for errors

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Deploy backend API to Railway/Render/etc
- [ ] Update `eas.json` with production API URL
- [ ] Rotate OpenAI API key (the one shared earlier is exposed)
- [ ] Get real Google OAuth credentials (not test)
- [ ] Get real Apple Sign In credentials
- [ ] Update bundle identifiers in `app.config.js`
- [ ] Build production apps with EAS
- [ ] Submit to App Store / Play Store
- [ ] Set up Sentry or error tracking
- [ ] Set up analytics

---

## Environment Variables Reference

**Backend (.env.local):**
```
OPENAI_API_KEY=sk-proj-...
OPENAI_STORED_PROMPT_ID=pmpt_6959a1b03ca88193b5ce74fb8c9c5de70f5c1fe2161cb1a9
SUPABASE_URL=https://gbcptmhtegfbntbhithe.supabase.co
SUPABASE_ANON_KEY=sb_publishable_r_y3Ccjz6UJoe1ijd6GfKg_oMJ-T_DO
SUPABASE_SERVICE_KEY=YOUR_SERVICE_KEY_HERE
```

**Expo (app.config.js):**
```javascript
extra: {
  apiUrl: process.env.API_URL || "http://localhost:3000",
  supabaseUrl: "https://gbcptmhtegfbntbhithe.supabase.co",
  supabaseAnonKey: "sb_publishable_r_y3Ccjz6UJoe1ijd6GfKg_oMJ-T_DO",
}
```

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start backend API
npm run api

# Start Expo
npm start

# Run both simultaneously
npm run dev

# Build development client
eas build --profile development --platform ios
eas build --profile development --platform android

# Build preview (for testing)
eas build --profile preview --platform all

# Build production
eas build --profile production --platform all
```

---

## Support

If you run into issues:
1. Check this setup guide
2. Review `README.md`
3. Check Supabase logs (dashboard → Logs)
4. Check backend API logs (`npm run api` output)
5. Check Expo logs

---

**You're ready to launch!** 🙏
