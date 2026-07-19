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

## 📁 Detailed Folder Structure

> **For AI/LLM Integration**: Each folder below is annotated with its purpose so an AI assistant knows exactly where to place new code (e.g., a landing page, a new app, or a new API route).

```
Agents-For-OS/                          <- Repository root
|
|-- README.md                           <- This file
|-- LICENSE                             <- MIT-style license
|-- start-demo.cmd                      <- Windows one-click demo launcher
|
|-- docs/                               <- Project documentation
|   |-- SYSTEM_DOCUMENTATION.md         <- Full architecture, API, and engine docs
|   |-- RELEASE_CHECKLIST.md            <- Pre-push verification checklist
|   `-- YOLO_HAND_GESTURE_LOGIC.md      <- Hand gesture ML documentation
|
|-- demo-filesystem/                    <- Virtual user filesystem for demo/testing
|   |-- Desktop/
|   |   |-- welcome.txt
|   |   `-- scenery_wallpaper.png
|   |-- Documents/
|   |   |-- notes.md
|   |   |-- todo.txt
|   |   |-- Alzheimer_Tips.txt
|   |   `-- Medical_Prescription.txt
|   |-- Downloads/
|   |   |-- report.txt
|   |   `-- spiritos_quickstart.txt
|   `-- Projects/
|       |-- demo-app/
|       |   |-- index.html
|       |   `-- style.css
|       `-- savitaos/
|           |-- README.md
|           `-- config.json
|
|-- uploads/                            <- User-uploaded files (git-ignored except .gitkeep)
|
|
|-- client/                             <- FRONTEND: React + Vite app
|   |
|   |-- index.html                      <- HTML entry point
|   |-- package.json                    <- Client npm config
|   |-- vite.config.js                  <- Vite build config (proxy: /api -> localhost:3001)
|   |-- tailwind.config.js              <- Tailwind CSS config
|   |-- postcss.config.js               <- PostCSS config
|   |-- eslint.config.js                <- ESLint rules
|   |-- vitest.config.js                <- Test runner config
|   |-- vercel.json                     <- Vercel SPA rewrites for deployment
|   |-- .env.example                    <- Client env template
|   |
|   |-- scripts/
|   |   `-- copy-mediapipe.mjs          <- Copies MediaPipe WASM to public/ on install/build
|   |
|   |-- public/                         <- Static assets served at root URL
|   |   |-- mediapipe-hands/            <- MediaPipe Hands WASM runtime (14 files)
|   |   |-- mediapipe-wasm/             <- MediaPipe Tasks-Vision WASM runtime (6 files)
|   |   |-- models/                     <- ML models for face recognition and gesture
|   |   |   |-- gesture_recognizer.task <- MediaPipe gesture recognizer
|   |   |   |-- face_expression_model-* <- Face expression weights
|   |   |   |-- face_landmark_68_model-*<- Face landmark weights
|   |   |   |-- face_recognition_model-*<- Face recognition weights
|   |   |   `-- tiny_face_detector_model-* <- Face detection weights
|   |   `-- sounds/
|   |       `-- Spirit_Awake.mp3        <- Assistant wake-up sound
|   |
|   `-- src/                            <- All React source code
|       |
|       |-- main.jsx                    <- React root - mounts <App /> to #root
|       |-- App.jsx                     <- Root component - Desktop + all input controllers
|       |-- index.css                   <- Global CSS, Tailwind base, design tokens
|       |
|       |-- __tests__/
|       |   |-- setup.js                <- Vitest jsdom + testing-library setup
|       |   `-- smoke.test.js           <- App smoke test
|       |
|       |-- config/                     <- App-wide configuration constants
|       |   |-- appConfig.js            <- App registry: name, icon, size, singleInstance flag
|       |   |-- gestureConfig.js        <- Gesture-to-action mappings
|       |   `-- voiceLanguages.js       <- Supported voice/language list (20+ languages)
|       |
|       |-- store/                      <- Zustand global state stores
|       |   |-- windowStore.js          <- Window lifecycle: open, close, focus, minimize, maximize
|       |   |-- osStore.js              <- OS state: theme, language, accessibility, voice, notifications
|       |   |-- chatStore.js            <- AI assistant chat message history
|       |   `-- __tests__/
|       |       |-- windowStore.test.js
|       |       `-- osStore.test.js
|       |
|       |-- hooks/                      <- Custom React hooks
|       |   |-- useGeminiVoice.js       <- Gemini Live voice assistant loop
|       |   |-- useTTS.js               <- Text-to-speech abstraction (browser + Sarvam)
|       |   |-- useSarvamTTS.js         <- Sarvam AI TTS integration
|       |   |-- useAccessibility.js     <- Accessibility profile application hook
|       |   |-- useAlzheimerSupport.js  <- Alzheimer/dementia UI support mode
|       |   |-- usePathGuidance.js      <- Step-by-step UI guidance for assisted navigation
|       |   |-- useReminderScheduler.js <- Client-side reminder polling and spoken alerts
|       |   |-- useSystemInfo.js        <- Battery, network, time system info queries
|       |   `-- useWindowShortcuts.js   <- Global keyboard shortcut handler
|       |
|       |-- lib/                        <- Pure utility/helper libraries
|       |   |-- commands.js             <- Voice command parser and dispatcher
|       |   |-- indianVoiceNormalize.js <- Fixes STT errors in Hindi/Indic commands
|       |   |-- speechBus.js            <- Single TTS coordinator (prevents overlapping speech)
|       |   |-- connectivity.js         <- Online/offline detection with retry logic
|       |   `-- __tests__/
|       |       `-- commands.test.js
|       |
|       |-- utils/                      <- Small one-off utilities
|       |   `-- terminalLogger.js       <- Terminal session log formatter
|       |
|       |-- desktop/                    <- Desktop shell components
|       |   |-- Desktop.jsx             <- Root desktop canvas: wallpaper, icons, overlays
|       |   |-- WindowFrame.jsx         <- Draggable/resizable window + lazy app loader
|       |   |-- Taskbar.jsx             <- Bottom taskbar with app buttons and clock
|       |   |-- AppLauncher.jsx         <- Full-screen app grid launcher
|       |   |-- BootScreen.jsx          <- Animated boot/loading screen
|       |   |-- LockScreen.jsx          <- Lock screen with face-recognition unlock
|       |   |-- DesktopIcon.jsx         <- Individual desktop icon component
|       |   |-- ContextMenu.jsx         <- Right-click context menu
|       |   |-- QuickSettings.jsx       <- Quick-access settings panel (tray)
|       |   |-- FeatureBar.jsx          <- Floating accessibility/AI feature toolbar
|       |   |-- SOSButton.jsx           <- Persistent SOS emergency button overlay
|       |   `-- HelpButton.jsx          <- Contextual help button
|       |
|       |-- components/                 <- Reusable global UI components
|       |   |-- NotificationCenter.jsx  <- Notification panel and badge manager
|       |   |-- Toast.jsx               <- Auto-dismiss toast notification
|       |   |-- Spotlight.jsx           <- Global spotlight search UI
|       |   |-- VisualAlert.jsx         <- Large visual alert overlay (accessibility)
|       |   `-- ErrorBoundary.jsx       <- React error boundary wrapper
|       |
|       |-- input/                      <- Multimodal input controllers
|       |   |-- VoiceController.jsx     <- Push-to-talk voice command controller
|       |   |-- GestureController.jsx   <- MediaPipe Hands gesture recognition loop
|       |   |-- EyeTracker.jsx          <- TensorFlow.js gaze-based cursor control
|       |   |-- FaceRecognition.jsx     <- face-api.js detection/recognition
|       |   |-- SignLanguageController.jsx <- Sign language command recognition
|       |   |-- sharedCamera.js         <- Shared camera stream manager
|       |   |-- loadMediaPipeHands.js   <- Lazy MediaPipe Hands WASM loader
|       |   |-- voiceIntents.js         <- Voice intent definitions and matching rules
|       |   |-- signLanguage/
|       |   |   |-- SignDataCollector.jsx <- Training data collection UI
|       |   |   |-- signConfig.js        <- Sign-to-action mappings
|       |   |   `-- trainClassifier.js   <- In-browser TF.js classifier training
|       |   `-- __tests__/
|       |       `-- sharedCamera.test.js
|       |
|       `-- apps/                       <- Individual desktop applications
|           |                             Each app is a self-contained folder with index.jsx
|           |                             ADD NEW APPS HERE, register in config/appConfig.js
|           |
|           |-- FileExplorer/
|           |   |-- index.jsx           <- FileExplorer container
|           |   |-- TreeView.jsx        <- Sidebar folder tree
|           |   `-- FileGrid.jsx        <- File/folder grid view
|           |
|           |-- Terminal/
|           |   `-- index.jsx           <- AI-powered virtual terminal
|           |
|           |-- Settings/
|           |   `-- index.jsx           <- Accessibility, theme, language, input settings
|           |
|           |-- Notes/
|           |   `-- index.jsx           <- Rich text notes with AI rewrite
|           |
|           |-- Calculator/
|           |   `-- index.jsx           <- Scientific calculator
|           |
|           |-- Reminders/
|           |   `-- index.jsx           <- Recurring spoken reminders
|           |
|           |-- Browser/
|           |   `-- index.jsx           <- In-app iframe web browser
|           |
|           |-- Translator/
|           |   `-- index.jsx           <- Multi-language text translator
|           |
|           |-- Mail/
|           |   `-- index.jsx           <- Mock email client
|           |
|           |-- Presentation/
|           |   `-- index.jsx           <- AI slide presentation builder
|           |
|           |-- PdfViewer/
|           |   `-- index.jsx           <- PDF file renderer
|           |
|           |-- ImageViewer/
|           |   `-- index.jsx           <- Image viewer with zoom
|           |
|           |-- Vault/
|           |   `-- index.jsx           <- Encrypted password/credential manager
|           |
|           |-- Emergency/
|           |   `-- index.jsx           <- SOS emergency panel
|           |
|           `-- KnownBook/
|               `-- index.jsx           <- Trusted contacts book
|
|
`-- server/                             <- BACKEND: Node.js + Express API
    |
    |-- index.js                        <- Express entry: route mounting, CORS, sessions, WebSocket
    |-- ws.js                           <- WebSocket server (real-time OS events)
    |-- package.json                    <- Server npm config
    |-- vitest.config.js                <- Server test config
    |-- .env.example                    <- Environment variable template
    |
    |-- prisma/                         <- Database schema and migrations
    |   |-- schema.prisma               <- Data models: User, Reminder, Presentation, Vault, Emergency
    |   `-- migrations/
    |       |-- 20260510113615_init/
    |       |-- 20260511172808_add_sign_language_enabled/
    |       `-- 20260518170201_add_presentation_reminder_emergency/
    |
    |-- middleware/                     <- Express middleware
    |   |-- auth.js                     <- Session authentication guard
    |   |-- scopePermissions.js         <- Feature scope permission checker
    |   `-- validate.js                 <- Zod request body validator
    |
    |-- routes/                         <- Express API route handlers
    |   |                                 Each file = one feature domain at /api/<name>
    |   |-- agent.js                    <- POST /api/agent/chat (AI assistant)
    |   |-- auth.js                     <- POST /api/auth/login|logout|register
    |   |-- profile.js                  <- GET/PUT /api/profile
    |   |-- fs.js                       <- /api/fs/* (virtual filesystem CRUD)
    |   |-- upload.js                   <- POST /api/upload (multipart)
    |   |-- terminal.js                 <- POST /api/terminal/run
    |   |-- reminders.js                <- CRUD /api/reminders
    |   |-- voice.js                    <- POST /api/voice/tts|stt|translate
    |   |-- automation.js               <- POST /api/automation
    |   |-- memory.js                   <- GET/POST /api/memory
    |   |-- presentations.js            <- CRUD /api/presentations
    |   |-- search.js                   <- GET /api/search
    |   |-- vault.js                    <- CRUD /api/vault
    |   |-- log.js                      <- POST /api/log
    |   |-- emergency.js                <- CRUD /api/emergency
    |   `-- knownBook.js                <- CRUD /api/known-book
    |
    |-- lib/                            <- Server-side business logic and AI engines
    |   |-- irisEngine.js               <- AI cascade orchestrator (Gemini->Sarvam->OpenRouter->Spirit)
    |   |-- irisTools.js                <- Tool registry and Gemini function declarations
    |   |-- toolProtocol.js             <- Engine-agnostic [[TOOL_CALL]] executor
    |   |-- spirit.js                   <- Offline deterministic NLP assistant
    |   |-- nlp.js                      <- NLP intent parser (compromise + chrono-node)
    |   |-- geminiVoice.js              <- Gemini Live voice conversation handler
    |   |-- sarvam.js                   <- Sarvam AI TTS/STT/translation client
    |   |-- openRouterClient.js         <- OpenRouter/free-model LLM client
    |   |-- indianVoiceNormalize.js     <- Server-side Indic STT normalization
    |   |-- memory.js                   <- mem0ai memory read/write helpers
    |   |-- biometricVault.js           <- AES encryption for vault credentials
    |   |-- commandSafety.js            <- Terminal command allowlist/denylist
    |   |-- desktopAutomation.js        <- Desktop automation action executor
    |   |-- docParser.js                <- PDF/Word/image/web document parser
    |   |-- visionOcr.js                <- Tesseract.js OCR + screenshot capture
    |   |-- vectorSearch.js             <- TF-IDF vector similarity search
    |   |-- dfs.js                      <- Depth-first filesystem traversal utility
    |   |-- workflow.js                 <- Workflow automation rule engine
    |   |-- prisma.js                   <- Prisma client singleton
    |   |-- gnani.js                    <- Gnani ASR integration (experimental)
    |   `-- __tests__/
    |       |-- smoke.test.js
    |       |-- spirit.test.js          <- 23 NLP unit tests
    |       `-- toolProtocol.test.js    <- 10 tool protocol tests
    |
    |-- data/                           <- Server-side persistent data
    |   |-- workflow-rules.json         <- Automation workflow rule definitions
    |   `-- memories/                   <- mem0ai offline memory JSON files (per user)
    |
    `-- demo-filesystem/                <- Minimal server-side virtual filesystem root
        `-- untitled.txt
```

---

## 🚀 How to Add a Landing Page

> **For AI integration**: A landing page is a **separate static site** — do NOT place it inside `client/src/apps/` or `client/src/desktop/`.

### Option A — Separate root-level folder (Recommended for independent deployment)
```
Agents-For-OS/
|-- landing/                  <- Place landing page here (deployed separately)
|   |-- index.html
|   |-- styles.css
|   `-- assets/
|-- client/                   <- Spirit OS React app (unchanged)
`-- server/                   <- Spirit OS backend (unchanged)
```
The landing page links to the deployed Spirit OS client URL to launch the desktop.

### Option B — Inside `client/public/` (Same-origin, no build step needed)
```
client/
`-- public/
    `-- landing/              <- Served at http://localhost:5173/landing/
        |-- index.html
        `-- assets/
```

### Option C — React route inside the client app
Add a route in `client/src/App.jsx` and create:
```
client/src/pages/             <- Create this folder
`-- LandingPage.jsx           <- Your landing page React component
```
Update `client/src/App.jsx` to render `LandingPage` at `/` and `Desktop` at `/app`.

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
