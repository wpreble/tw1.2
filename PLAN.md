# The Way — Ship It Plan

Goal: Get the app from current state to App Store + Play Store submission.

---

## Phase 1: Auth — Make It Actually Work

The biggest functional blocker. Google OAuth creds are empty, web auth bypass is hardcoded, Apple Sign-In isn't configured.

**Tasks:**
1. **Google OAuth credentials** — Add real `webClientId` and `iosClientId` to `src/services/auth.ts`. Requires creating OAuth 2.0 credentials in Google Cloud Console and registering the iOS bundle ID (`com.theway.app`).
2. **Apple Sign-In** — Add Supabase Apple provider configuration. iOS-only, requires Apple Developer account. Configure the `auth.ts` signInWithApple flow to pass the necessary `nonce`.
3. **Remove web auth bypass** — `App.tsx` line 11: `const skipAuth = Platform.OS === 'web'`. Either remove web support entirely or implement proper web auth.
4. **Session persistence** — Verify that `expo-secure-store` is properly set as the Supabase storage adapter so sessions survive app restarts.
5. **Sign-out from providers** — Ensure `signOut()` in `auth.ts` also calls the native Google/Apple sign-out so tokens are fully cleared.

---

## Phase 2: Backend — Deploy to Production

The app is hardcoded to `localhost:3000` with a placeholder production URL. This must be deployed before any real builds.

**Tasks:**
1. **Choose a hosting platform** — Railway or Render (both support Node.js, free tiers available). The Express server in `api/server.ts` is simple and stateless — easy to deploy.
2. **Set environment variables** — `OPENAI_API_KEY`, `OPENAI_STORED_PROMPT_ID`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY` must all be set in the hosting platform's dashboard.
3. **Update `eas.json`** — Replace `https://your-production-api-url.com` (line 28) with the real deployed URL.
4. **Update `app.config.js`** — Ensure `API_URL` env var is wired through correctly to Expo's extra config.
5. **Verify health check** — `GET /health` should return `{ status: 'ok' }` from the deployed URL.

---

## Phase 3: EAS Build Configuration

Several placeholder values block building.

**Tasks:**
1. **EAS project setup** — Run `eas build:configure` to populate the real EAS project ID in `app.config.js` (currently `"your-project-id-here"`).
2. **iOS submission credentials** — Fill in `eas.json` submit section:
   - `appleId`: Apple ID email used for App Store Connect
   - `ascAppId`: Numeric App Store Connect app ID (created in App Store Connect)
   - `appleTeamId`: 10-character Apple Developer Team ID
3. **Android submission credentials** — Set up a Google Play service account and attach the JSON key to EAS.
4. **Build number management** — `autoIncrement: true` is already set in `eas.json` for Android. Confirm iOS build number handling.

---

## Phase 4: App Store Compliance

Legal and listing requirements before submission is accepted.

**Tasks:**
1. **Privacy Policy** — Required by both Apple and Google. Must cover: data collected (chat messages, account info), third-party services used (OpenAI, Supabase, Google, Apple), data retention. Host it publicly (GitHub Pages, Notion, or simple webpage).
2. **App Store Connect entry** — Create the iOS app in App Store Connect: name, subtitle, description, keywords, screenshots (6.7" and 5.5" iPhone required), support URL.
3. **Google Play Console entry** — Create the Android app: store listing (description, screenshots, feature graphic), content rating questionnaire, data safety form.
4. **Screenshots** — Minimum: iPhone 6.7" (iPhone 15 Pro Max), iPhone 5.5". For Play Store: phone screenshots + optional tablet. These can be taken from the Expo dev client or simulator.
5. **Support contact** — An email or URL for user support is required by both stores.

---

## Phase 5: Polish Before Submission

Small but important improvements that affect review approval and user experience.

**Tasks:**
1. **Error boundary** — Wrap root app in a React error boundary so crashes show a graceful message instead of a white screen. Prevents store rejection for crashing on launch.
2. **Loading states** — Ensure the auth loading state shows a proper splash/spinner, not a flash of the wrong screen.
3. **Chat persistence after app restart** — Verify AsyncStorage is loading chat history correctly on mount. Currently in `ChatScreen.tsx` but should be confirmed working.
4. **Keyboard behavior** — Test `KeyboardAvoidingView` on both iOS and Android. Ensure the message input isn't hidden by the keyboard.
5. **Empty state** — If chat history is empty, show a helpful prompt/question to get users started instead of a blank screen.
6. **Handle API errors gracefully** — If the backend is unreachable or returns an error, show a user-friendly message in the chat (not just console logs).

---

## Phase 6: Test Builds & Submit

**Tasks:**
1. **Preview build (internal testing)** — `eas build --profile preview --platform all`. Test on real devices via TestFlight (iOS internal) and direct APK install (Android).
2. **Device testing checklist:**
   - [ ] Google Sign-In completes and user reaches chat
   - [ ] Apple Sign-In completes (iOS)
   - [ ] Chat messages send and receive responses
   - [ ] Framework selector changes AI behavior
   - [ ] Sign out returns to login screen
   - [ ] App restores session after backgrounding/killing
   - [ ] Keyboard doesn't cover input
3. **Production build** — `eas build --profile production --platform all`
4. **Submit to stores** — `eas submit --platform ios` and `eas submit --platform android`
5. **Monitor review** — Apple review typically 1-3 days. Google Play typically 3-7 days for first submission.

---

## What We Are NOT Doing (Scope Limits)

To stay focused on shipping:
- No database integration for cloud chat history (AsyncStorage is fine for v1)
- No push notifications
- No voice input/output
- No community features
- No password/email auth (OAuth only is simpler for v1)
- No tests (manual device testing is sufficient for v1)
- No analytics (can add post-launch)
- No error tracking service like Sentry (nice-to-have, not blocking)

These can all come in v1.1 after the app is live.

---

## Order of Operations

Phase 1 → Phase 2 → Phase 3 (in parallel with Phase 4) → Phase 5 → Phase 6

Auth and backend must work before any meaningful testing. EAS config and store listings can be done while development continues. Polish before the final production build.
