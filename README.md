# Spirit OS

**Spirit OS** is an accessible, AI-powered desktop operating system that runs entirely in the browser. It turns a web page into a full desktop-style workspace — complete with draggable windows, a taskbar, app launcher, virtual filesystem, voice control, hand gestures, eye tracking, sign-language input, and an AI assistant that can execute real OS-level actions.

> Built for low-vision users, motor-impaired users, elderly users, Alzheimer's/dementia caregivers, and anyone who needs an accessible computing experience — without installing anything.

---

## ✨ Key Features

### 🖥️ Desktop Environment
- Full browser-based desktop with draggable, resizable windows
- Taskbar with pinned and running app indicators
- App Launcher (grid) with keyboard and voice navigation
- Boot screen, lock screen, and desktop icon grid
- Context menus, quick-settings panel, and feature bar
- Spotlight-style global search across apps and files
- Notification center and toast alerts

### 🤖 AI Assistant (Iris Engine)
- Multi-tier AI cascade: **Gemini → Sarvam → OpenRouter (Groq) → Spirit (offline)**
- Tool-calling agent that can open apps, set reminders, read files, run terminal commands, and search the web
- Persistent memory via `mem0ai` — the assistant remembers user preferences across sessions
- Voice-first interaction with Indic language normalization (Hindi, Gujarati, Marathi, Tamil, and more)
- Offline deterministic fallback via the **Spirit NLP engine** — works without any API keys

### 🎙️ Voice & Language
- Real-time voice command recognition via Web Speech API
- Gemini Live voice loop (`useGeminiVoice`) for conversational assistant mode
- **Sarvam AI** integration for Indic-language TTS, STT, and translation
- Indian-language command normalization (handles STT errors in Indic scripts)
- Configurable voice languages via `voiceLanguages.js` (20+ languages)
- Audio output coordinator (`speechBus.js`) prevents simultaneous TTS conflicts

### 👁️ Accessibility & Input Modalities
- **Hand Gesture Control** — MediaPipe Hands WASM for pinch-to-click, swipe navigation
- **Eye Tracking** — TensorFlow.js gaze estimation for cursor-free navigation
- **Sign Language Input** — custom classifier trained on hand landmarks
- **Face Recognition** — face-api.js for user identification and lock screen
- **Alzheimer Support Mode** — simplified UI, large text, guided navigation
- **Accessibility Profiles** — high-contrast, large-font, reduced-motion, caregiver modes in Settings

### 📁 Virtual Filesystem (Server-side)
- Full CRUD file operations via REST API (`/api/fs/*`)
- Safe sandboxed demo filesystem (`demo-filesystem/`)
- File upload via multipart (`/api/upload`)
- Document parsing: PDF (`pdf-parse`), Word (`mammoth`), web pages (`cheerio`), OCR (`tesseract.js`)
- Vector similarity search across file contents

### 🔐 Security & Vault
- Session-based authentication (`express-session` + `bcryptjs`)
- Scope-based permission middleware
- **Secure Vault** — AES-encrypted credential and password storage
- Vault UI with master-password protection

### 🚨 Emergency & Caregiver Tools
- **SOS Panel** — one-tap emergency alert with configurable contacts
- **Known Book** — manage trusted contacts with photos and call shortcuts
- **Reminder System** — spoken reminders with recurring schedule support, medication alerts
- Reminder voice commands in Hindi: `मेरे लिए रिमाइंडर सेट कर दो रोज 5:00 p.m दवाई लेने के लिए`

### 🧰 Built-in Applications (15 Apps)

| App | Description |
|-----|-------------|
| **File Explorer** | Virtual filesystem browser with tree view, file grid, and upload |
| **Terminal** | AI-powered virtual terminal with safe command execution |
| **Settings** | Accessibility profiles, theme, language, voice, gesture, and eye settings |
| **Notes** | Rich text notes with Ask AI (rewrite/improve) and insert/copy flow |
| **Calculator** | Full scientific calculator |
| **Reminders** | Spoken, recurring task and medication reminders |
| **Browser** | In-app iframe web browser with URL bar |
| **Translator** | Real-time multi-language text translation via Sarvam |
| **Mail** | Mock email client UI |
| **Presentation** | Interactive slide builder with AI assistance |
| **PDF Viewer** | Native PDF rendering |
| **Image Viewer** | Full-screen image browser |
| **Vault** | Encrypted password and credential manager |
| **Emergency** | SOS panel with emergency contact dispatch |
| **Known Book** | Trusted contacts list |

---

## 🛠️ Technology Stack

### Frontend — `client/`

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React | 18.2.0 |
| Build Tool | Vite | 8.x |
| Styling | Tailwind CSS | 3.4.x |
| Animations | Framer Motion | 11.x |
| Icons | lucide-react | 0.363.x |
| State Management | Zustand + Immer | 4.5.x + 11.x |
| Window Manager | react-rnd | 10.4.x |
| HTTP Client | axios | 1.6.x |
| Hand Gesture ML | @mediapipe/hands | 0.4.x |
| Vision ML | @mediapipe/tasks-vision | 0.10.x |
| Neural Network | @tensorflow/tfjs | 4.22.x |
| Face Recognition | face-api.js | 0.22.2 |
| Testing | Vitest + Testing Library | 1.6.x |

### Backend — `server/`

| Category | Technology | Version |
|----------|-----------|---------|
| Runtime | Node.js (CommonJS) | >= 20.0.0 |
| Framework | Express | 4.19.x |
| Database ORM | Prisma | 5.22.0 |
| Database | SQLite | via Prisma |
| Sessions | express-session | 1.18.x |
| WebSockets | ws | 8.17.x |
| File Uploads | multer | 2.1.x |
| Validation | zod | 3.22.x |
| Auth | bcryptjs | 2.4.x |
| Rate Limiting | express-rate-limit | 7.2.x |
| AI Memory | mem0ai | 3.1.x |

### AI Providers

| Provider | SDK / Method | Role |
|----------|-------------|------|
| **Google Gemini** | `@google/generative-ai` | Primary tool-calling agent |
| **Sarvam AI** | REST API | Indic-language LLM, TTS, STT |
| **OpenRouter** | fetch (openRouterClient.js) | Free-model LLM fallback |
| **Groq** | `groq-sdk` | Fast inference fallback |
| **Spirit** | Local NLP engine | Offline deterministic fallback |

### Document & Vision Processing

| Tool | Purpose |
|------|---------|
| `pdf-parse` | PDF text extraction |
| `mammoth` | Word document (.docx) parsing |
| `tesseract.js` | OCR for images and screenshots |
| `screenshot-desktop` | Desktop screenshot capture |
| `cheerio` | HTML/web page parsing |
| `compromise` | NLP entity extraction |
| `chrono-node` | Natural language date/time parsing |
| `fuse.js` | Fuzzy search |

---

## 📁 Folder Structure

```
Master-Piece/
├── client/             ← Frontend: React + Vite app
│   ├── public/         ← Static assets (fonts, models, sounds)
│   └── src/            ← App source code
│       ├── landing/    ← Landing pages & components
│       └── ...         ← Desktop apps, stores, controllers
│
├── server/             ← Backend: Node.js + Express API
│   ├── routes/         ← API route handlers
│   ├── lib/            ← AI engines, parsers, utilities
│   ├── middleware/     ← Auth, validation middleware
│   ├── prisma/         ← Database schema & migrations
│   └── data/           ← Persistent data, workflow rules
│
├── demo-filesystem/    ← Virtual user filesystem for demo
├── docs/               ← Project documentation
├── uploads/            ← User-uploaded files (git-ignored)
├── README.md
└── LICENSE
```

---
## ⚙️ Quick Start

### Prerequisites
- Node.js >= 20.0.0
- npm

### Install & Run

```powershell
# 1. Install server dependencies and set up database
cd server
npm install
copy .env.example .env
npm run db:generate

# 2. Install client (also copies MediaPipe WASM assets)
cd ../client
npm install

# 3. Start both servers (separate terminals)
cd ../server && npm run dev    # http://localhost:3001
cd ../client && npm run dev    # http://localhost:5173
```

**Windows one-click launcher:**
```bat
start-demo.cmd
```

### Default URLs

| Service | URL |
|---------|-----|
| Spirit OS Desktop | `http://localhost:5173` |
| API Server | `http://localhost:3001` |
| Health Check | `http://localhost:3001/api/health` |

---

## 🔑 Environment Variables — `server/.env`

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `SESSION_SECRET` | Yes | — | Session signing secret |
| `DATABASE_URL` | Yes | `file:./savitaos.db` | SQLite database path |
| `FS_ROOT` | No | `./demo-filesystem` | File Explorer sandbox root |
| `GEMINI_API_KEY` | No | — | Google Gemini tool-calling engine |
| `SARVAM_API_KEY` | No | — | Indic-language AI, TTS, STT |
| `OPENROUTER_API_KEY` | No | — | OpenRouter free-model fallback |
| `GROQ_API_KEY` | No | — | Groq fast inference |
| `TAVILY_API_KEY` | No | — | Web search tool |
| `AI_ENGINE_ORDER` | No | `gemini,sarvam,openrouter,spirit` | AI cascade order |

> Without any AI keys, Spirit OS still runs with the offline **Spirit** deterministic assistant.

---

## 🧪 Testing

```powershell
# Server: 34 tests (NLP, tool protocol, smoke)
cd server && npm test

# Client: 27 tests (window store, OS store, commands, camera, smoke)
cd client && npm test

# Client production build verification
cd client && npm run build
```

**API Testing with Keploy:**
```bash
cd server && keploy test -c "node index.js" --delay 10
```
Covered: `/api/health`, `/api/voice/status`, `/api/voice/tts`, `/api/reminders`, `/api/agent/chat`

---

## 🏗️ Architecture Overview

```
Browser (React Desktop)
    |
    +-- Desktop Shell (Desktop.jsx + WindowFrame.jsx + Taskbar.jsx)
    |       `-- Apps (15 self-contained modules in src/apps/)
    |
    +-- Input Controllers (src/input/)
    |       +-- Voice      -> VoiceController + useGeminiVoice
    |       +-- Gesture    -> GestureController (MediaPipe Hands WASM)
    |       +-- Eye        -> EyeTracker (TensorFlow.js)
    |       +-- Sign       -> SignLanguageController (custom TF classifier)
    |       `-- Face       -> FaceRecognition (face-api.js)
    |
    +-- State (src/store/)
    |       +-- windowStore  -> window lifecycle, focus, z-order
    |       `-- osStore      -> theme, language, accessibility, voice
    |
    `-- API calls (axios -> /api/*)
            |
            v
    Express Server (server/index.js)
            |
            +-- Routes (server/routes/*.js)
            |       `-- agent, auth, fs, voice, reminders, vault, ...
            |
            +-- AI Cascade (server/lib/irisEngine.js)
            |       `-- Gemini -> Sarvam -> OpenRouter/Groq -> Spirit
            |
            +-- Prisma + SQLite (reminders, vault, contacts, presentations)
            |
            `-- WebSocket (server/ws.js) -> real-time event broadcasting
```

---

## 📝 Developer Notes

- **Module format**: Server uses **CommonJS** (`require/module.exports`). Client uses **ESM** (`import/export`).
- **Two independent npm packages**: Run `npm install` separately in `server/` and `client/`. No root workspace.
- **Adding a new app**: Create `client/src/apps/YourApp/index.jsx`, then add an entry to `client/src/config/appConfig.js`.
- **Adding a new API route**: Create `server/routes/yourRoute.js` and mount it in `server/index.js` with `app.use('/api/yourRoute', require('./routes/yourRoute'))`.
- **Legacy naming**: Internal DB names and some files use `savitaos`. Do not rename without a Prisma migration.
- **Git-ignored**: `.env`, SQLite databases, `node_modules/`, `client/dist/`, runtime `uploads/`.

---

## 📄 Documentation

| Document | Contents |
|----------|---------|
| [System Documentation](docs/SYSTEM_DOCUMENTATION.md) | Full architecture, all API endpoints, AI engine internals, app workflows, data model |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Pre-push verification, git hygiene, smoke-test steps |
| [Gesture Logic](docs/YOLO_HAND_GESTURE_LOGIC.md) | Hand gesture ML pipeline documentation |

---

## 📜 License

MIT-style license — see [LICENSE](LICENSE).
