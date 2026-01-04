# The Way - EAS Deployment Guide

## Prerequisites

- [x] Expo account (sign up at https://expo.dev)
- [x] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Apple Developer account ($99/year) - for iOS
- [ ] Google Play Developer account ($25 one-time) - for Android
- [ ] Backend API deployed (see Backend Deployment below)

## Current Status

✅ EAS configuration created (`eas.json`)
✅ App configuration with bundle identifiers (`app.config.js`)
✅ Build profiles set up (development, preview, production)

## 🚨 Important: Backend API Required

Your mobile app currently connects to a backend API. **You must deploy the backend first** before building production apps.

### Backend Deployment Options

#### Option 1: Railway (Recommended - Easiest)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Create new project in Railway dashboard at railway.app

# 4. Link to project
railway link

# 5. Deploy the API
railway up

# 6. Add environment variables in Railway dashboard:
# - OPENAI_API_KEY=your_key_here
# - OPENAI_STORED_PROMPT_ID=pmpt_6959a1b03ca88193b5ce74fb8c9c5de70f5c1fe2161cb1a9
# - PORT=3000

# 7. Get your production URL (e.g., https://your-app.up.railway.app)
```

#### Option 2: Render

```bash
# 1. Create account at render.com
# 2. New Web Service → Connect your repo
# 3. Build Command: npm install
# 4. Start Command: npm run api
# 5. Add environment variables in dashboard
# 6. Deploy
```

#### Option 3: Heroku, DigitalOcean, AWS, etc.

Any Node.js hosting works. Just deploy the Express API from the `/api` folder.

---

## Step 1: Initialize EAS

```bash
# Login to Expo
eas login

# Configure EAS for your project
eas build:configure
```

This will:
- Create/update `eas.json`
- Add a project ID to `app.config.js`
- Link your local project to Expo

---

## Step 2: Update Production API URL

After deploying your backend, update `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "API_URL": "https://your-actual-backend-url.com"
      }
    }
  }
}
```

---

## Step 3: Build for Testing (Preview)

### iOS Preview Build

```bash
# Build for iOS simulator (Mac only)
eas build --platform ios --profile preview

# Or build for physical device (requires Apple Developer account)
eas build --platform ios --profile preview --local
```

### Android Preview Build

```bash
# Build APK for testing
eas build --platform android --profile preview

# Download and install the APK on Android device
```

After build completes, you'll get a download link for:
- iOS: `.app` file (simulator) or `.ipa` (device)
- Android: `.apk` file

---

## Step 4: Test the Preview Build

1. Download the build from EAS dashboard
2. Install on device or simulator
3. Test all features:
   - [ ] Chat functionality
   - [ ] Framework switching
   - [ ] Message persistence
   - [ ] API connectivity
   - [ ] Stored prompt integration

---

## Step 5: Production Build (App Store & Play Store)

### iOS Production Build

```bash
# 1. Update app.config.js with your Apple details:
#    - bundleIdentifier: "com.yourcompany.theway"
#    - Apple Team ID

# 2. Build for production
eas build --platform ios --profile production

# 3. Submit to App Store
eas submit --platform ios
```

You'll need:
- Apple ID
- App-specific password
- App Store Connect app created

### Android Production Build

```bash
# 1. Build for production
eas build --platform android --profile production

# 2. Submit to Play Store
eas submit --platform android
```

You'll need:
- Google Play service account JSON key
- Play Console app created

---

## Build Profiles Explained

### `development`
- Development client build
- Internal distribution only
- Hot reloading enabled
- Connects to local API (21.0.0.206:3000)

### `preview`
- Testing/beta builds
- Internal distribution (TestFlight/APK)
- Production-like environment
- Still uses local/test API

### `production`
- App Store/Play Store builds
- Public distribution
- Production API URL
- Auto-increment version numbers

---

## Environment Variables per Build

### Development
```
API_URL=http://21.0.0.206:3000
```

### Preview
```
API_URL=http://21.0.0.206:3000
# Or use staging API if available
```

### Production
```
API_URL=https://your-production-api.com
```

---

## Testing Checklist

Before submitting to stores:

- [ ] Backend API deployed and accessible
- [ ] OpenAI API key configured on backend
- [ ] Stored prompt ID configured
- [ ] App connects to production API
- [ ] Chat functionality works
- [ ] Messages persist locally
- [ ] Framework switching works
- [ ] Error handling tested
- [ ] Offline behavior tested (chat history)
- [ ] App icons and splash screen look good
- [ ] Privacy policy added (required for App Store)
- [ ] Terms of service added (if applicable)

---

## Common EAS Commands

```bash
# Login to EAS
eas login

# Check build status
eas build:list

# View build logs
eas build:view [build-id]

# Configure project
eas build:configure

# Build for specific platform
eas build --platform ios
eas build --platform android
eas build --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android

# Update app over-the-air (for minor changes)
eas update
```

---

## Troubleshooting

### Build Fails

1. Check build logs: `eas build:view [build-id]`
2. Common issues:
   - Missing bundle identifier
   - Invalid credentials
   - Dependency conflicts
   - Environment variables not set

### App Can't Connect to API

1. Check API URL in build: `eas build:view [build-id]`
2. Test API endpoint directly
3. Check CORS settings on backend
4. Verify environment variables are set

### iOS Certificate Issues

```bash
# Let EAS manage certificates
eas credentials

# Or provide your own in eas.json
```

---

## Cost Breakdown

### EAS Builds (Free Tier)
- **Free**: 30 builds/month
- **Paid**: $29/month for unlimited builds

### App Store Distribution
- **iOS**: $99/year (Apple Developer)
- **Android**: $25 one-time (Google Play)

### Backend Hosting
- **Railway**: ~$5-20/month (usage-based)
- **Render**: Free tier available, $7/month for production
- **Heroku**: $7/month for Eco dyno

---

## Next Steps

1. **Deploy Backend API** (Railway/Render/etc)
2. **Update production API URL** in `eas.json`
3. **Run `eas build:configure`**
4. **Build preview version**: `eas build --platform all --profile preview`
5. **Test thoroughly**
6. **Build production**: `eas build --platform all --profile production`
7. **Submit to stores**: `eas submit --platform all`

---

## Quick Start (Testing)

If you just want to test EAS builds without deploying backend:

```bash
# 1. Configure EAS
eas build:configure

# 2. Build for Android (faster than iOS)
eas build --platform android --profile preview

# 3. Download APK and install on device
# Note: API won't work until you deploy the backend
```

---

## Support

- EAS Docs: https://docs.expo.dev/build/introduction/
- Expo Forums: https://forums.expo.dev/
- Discord: https://chat.expo.dev/

---

**Ready to build?** Start with deploying the backend API, then run `eas build:configure`!
