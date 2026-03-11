# Things You Need to Do Before Launch

These require accounts, credentials, or decisions that can't be automated.
Check them off as you go.

---

## Accounts & Credentials

- [ ] **Google Cloud Console** — Create OAuth 2.0 credentials
  - Go to console.cloud.google.com → APIs & Services → Credentials
  - Create OAuth Client ID for "Web application" → copy `webClientId`
  - Create OAuth Client ID for "iOS" (use bundle ID `com.theway.app`) → copy `iosClientId`
  - Add both to your `.env` file as `GOOGLE_WEB_CLIENT_ID` and `GOOGLE_IOS_CLIENT_ID`

- [ ] **Supabase** — Enable Apple Sign-In provider
  - Dashboard → Authentication → Providers → Apple
  - Requires Apple Developer account (see below)

- [ ] **Apple Developer Account** — $99/year at developer.apple.com
  - Needed for: Apple Sign-In, iOS builds, TestFlight, App Store submission
  - Note your **Team ID** (10-char string, shown in Membership section)

- [ ] **App Store Connect** — Create the app entry
  - appstoreconnect.apple.com → Apps → "+" → New App
  - Note the **App ID** (numeric, shown in App Information)
  - Fill in: name, subtitle, description, keywords, support URL, privacy policy URL

- [ ] **Google Play Console** — $25 one-time at play.google.com/console
  - Create app, complete store listing, content rating, and data safety form

---

## Backend Deployment

- [ ] Deploy `api/server.ts` to a hosting platform
  - Recommended: Railway (railway.app) or Render (render.com) — both have free tiers
  - Set these environment variables in the platform dashboard:
    - `OPENAI_API_KEY`
    - `OPENAI_STORED_PROMPT_ID`
    - `SUPABASE_URL`
    - `SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_KEY`
- [ ] Copy the deployed URL and update `eas.json` line 28 (`https://your-production-api-url.com`)

---

## EAS Build Setup

- [ ] Run `eas build:configure` in the project root — this populates the EAS project ID in `app.config.js`
- [ ] Fill in `eas.json` submit section:
  ```json
  "appleId": "your@email.com",
  "ascAppId": "1234567890",
  "appleTeamId": "XXXXXXXXXX"
  ```
- [ ] For Android: create a Google Play service account and download the JSON key, add to EAS

---

## Legal & Store Listings

- [ ] **Privacy Policy** — Host `PRIVACY_POLICY.md` publicly (GitHub Pages, Notion, a simple webpage)
  - Fill in `[YOUR SUPPORT EMAIL]` before publishing
  - Copy the public URL — you'll need it for both stores

- [ ] **Support email** — Decide on a support contact email and add it to the privacy policy

- [ ] **App Store listing copy** (needed in App Store Connect):
  - Description (up to 4000 chars)
  - Keywords (100 chars)
  - Subtitle (30 chars)
  - What's New text for v1.0

- [ ] **App screenshots**
  - Required sizes: iPhone 6.7" (15 Pro Max) and iPhone 5.5"
  - Optional but good: iPad 12.9"
  - For Play Store: at least 2 phone screenshots + 1 feature graphic (1024x500)
  - Can be taken from simulator/emulator or real device

---

## Final Steps

- [ ] Build preview version: `eas build --profile preview --platform all`
- [ ] Test on real devices (use TestFlight for iOS, direct APK for Android)
  - [ ] Google Sign-In works end-to-end
  - [ ] Apple Sign-In works on iOS
  - [ ] Chat sends and receives responses
  - [ ] Framework selector changes behavior
  - [ ] Sign out returns to login screen
  - [ ] Session restores after killing the app
- [ ] Build production version: `eas build --profile production --platform all`
- [ ] Submit: `eas submit --platform ios` and `eas submit --platform android`
- [ ] Monitor Apple review (1–3 days) and Google Play review (3–7 days)
