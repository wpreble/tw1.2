# The Way - Mobile App

A Christ-centered spiritual formation platform that helps believers disconnect from the world, renew their minds through Scripture, and clarify God-given vision.

## Overview

The Way is a mobile-first chat application built with React Native/Expo that integrates with OpenAI's API to provide spiritually-guided conversations through different frameworks:

- **General**: Open conversation about faith and spiritual growth
- **Scripture Study**: Deep dive into God's Word with context and application
- **Prayer Guide**: Facilitate conversation with God and prayer practices
- **Word → Action**: Translate Scripture into practical obedience
- **Vision Clarity**: Discern and clarify God-given calling

## Architecture

```
/api                    # Express backend API server
  └── server.ts         # OpenAI integration with spiritual guardrails

/src
  ├── components/       # Reusable UI components
  ├── screens/          # Screen components
  │   └── ChatScreen.tsx
  ├── services/         # Business logic
  │   ├── api.ts        # API client
  │   └── storage.ts    # Local persistence
  ├── types/            # TypeScript types
  └── constants/        # Framework definitions

App.tsx                 # Root component
```

## Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- OpenAI API key
- iOS Simulator (Mac) or Android Emulator, or Expo Go app on your phone

## Setup

### 1. Clone and Install

```bash
cd tw1.2
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_actual_api_key_here
```

⚠️ **IMPORTANT**: Never commit `.env.local` to git. It's already in `.gitignore`.

### 3. Run the Application

You have two options:

**Option A: Run everything together (recommended)**
```bash
npm run dev
```
This starts both the API server and Expo simultaneously.

**Option B: Run separately**

Terminal 1 (API Server):
```bash
npm run api
```

Terminal 2 (Expo):
```bash
npm start
```

### 4. Open the App

After running `npm start` or `npm run dev`, you'll see a QR code in the terminal.

- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`
- **Physical Device**: Scan the QR code with the Expo Go app
- **Web Browser**: Press `w` (for testing only, mobile experience recommended)

## Usage

1. **Select a Framework**: Tap the framework selector at the top to choose a conversation mode
2. **Start Chatting**: Type your message and tap Send
3. **Spiritual Guidance**: The AI will respond according to the selected framework's spiritual guardrails
4. **Persistent History**: Your conversations are saved locally and will persist between sessions
5. **Clear Chat**: Tap "Clear" to start a new conversation

## Frameworks Explained

### General
Open-ended spiritual conversations anchored in Scripture and focused on formation rather than just information.

### Scripture Study
- Explains passages in historical and biblical context
- Asks reflective questions
- Highlights God's character
- Encourages practical application

### Prayer Guide
- Facilitates conversation with God
- Suggests prayer practices (ACTS model)
- Encourages silence and listening
- Never claims to speak for God

### Word → Action
- Helps translate Scripture into embodied obedience
- Asks clarifying questions about context
- Suggests practical next steps
- Avoids legalism and performance-based spirituality

### Vision Clarity
- Helps discern what God is revealing
- Asks reflective questions about patterns and convictions
- Tests visions against Scripture
- Encourages community confirmation

## AI Spiritual Guardrails

The Way implements strict spiritual safeguards in all AI responses:

✅ **AI Must:**
- Always anchor responses in Scripture
- Cite biblical references
- Ask reflective questions
- Encourage discernment and dependence on the Holy Spirit
- Focus on formation, not just information

❌ **AI Must NOT:**
- Claim divine authority
- Say "God says..." or give prophetic declarations
- Replace prayer or the Holy Spirit
- Provide "the" definitive interpretation
- Encourage dependence on AI over God

## Project Structure Details

### Backend API (`/api/server.ts`)
- Express server running on port 3000
- Secures OpenAI API key on server-side
- Implements framework-specific system prompts
- Provides `/api/chat` endpoint for message streaming
- Health check endpoint at `/health`

### Frontend (`/src`)
- React Native with TypeScript
- AsyncStorage for chat persistence
- Framework-based conversation flows
- Clean, reverent UI design
- Offline-capable (chat history)

## Development

### Available Scripts

```bash
npm start          # Start Expo dev server
npm run api        # Start API server with hot reload
npm run dev        # Start both API and Expo concurrently
npm run android    # Open on Android
npm run ios        # Open on iOS
npm run web        # Open in web browser
```

### API Endpoints

**POST /api/chat**
```json
{
  "messages": [
    { "role": "user", "content": "What does this verse mean?" }
  ],
  "framework": "scripture"
}
```

Response:
```json
{
  "message": "AI response here...",
  "framework": "scripture"
}
```

**GET /health**
```json
{
  "status": "ok",
  "message": "The Way API is running"
}
```

## Troubleshooting

### API Key Issues
- Verify `.env.local` exists and contains valid `OPENAI_API_KEY`
- Restart the API server after changing environment variables
- Check OpenAI API key at https://platform.openai.com/api-keys

### Connection Issues
- Ensure API server is running (`npm run api`)
- Check API URL in `app.json` matches your server
- For physical devices, use your computer's local IP instead of `localhost`
- Check firewall settings

### Expo Issues
- Clear Expo cache: `expo start -c`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Update Expo: `npm install expo@latest`

## Security Notes

1. **Never expose your OpenAI API key**:
   - Keep it in `.env.local` (already gitignored)
   - Never commit it to version control
   - Rotate immediately if exposed

2. **Backend API**:
   - API key stays on server-side only
   - Mobile app never directly accesses OpenAI
   - CORS enabled for local development

3. **Data Privacy**:
   - Chat history stored locally on device
   - No data sent to external servers except OpenAI
   - No analytics or tracking

## Future Enhancements

- [ ] User authentication
- [ ] Cloud sync for chat history
- [ ] Push notifications for daily prompts
- [ ] Offline mode with cached responses
- [ ] Voice input/output
- [ ] Share conversations
- [ ] Community features
- [ ] Mentor connections

## Technical Stack

- **Frontend**: React Native 0.81, Expo 54, TypeScript 5
- **Backend**: Express 5, Node.js
- **AI**: OpenAI GPT-4
- **Storage**: AsyncStorage (local)
- **State**: React hooks (no external state management)

## License

Private - Internal use only

## Contact

For questions or support, contact the development team.

---

Built with reverence. For Kingdom impact.
