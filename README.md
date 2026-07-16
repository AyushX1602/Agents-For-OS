# Spirit OS

Spirit OS is an accessible, AI-powered desktop operating system that runs in the browser. It turns a web app into a full desktop-style workspace with draggable windows, a taskbar, apps, local file tools, voice control, hand gestures, eye tracking, sign-language input, reminders, SOS support, and an assistant that can execute real actions.

The goal is simple: make everyday computing easier for low-vision users, motor-impaired users, elderly users, cognitive-support workflows, and caregivers.

## Why It Matters

Most accessibility tools are separate add-ons. Spirit OS brings them into one usable desktop experience:

- Speak naturally to open apps, create reminders, edit notes, run terminal tasks, and ask questions.
- Use hand gestures and eye tracking when keyboard and mouse control are difficult.
- Use large, high-contrast, profile-driven UI modes for different accessibility needs.
- Keep caregiver workflows nearby with reminders, known-person support, SOS contacts, and vault tools.
- Continue working even when cloud AI is unavailable through the offline Spirit engine.

## Hackathon Demo Highlights

- Browser-based desktop with windows, taskbar, launcher, and real apps.
- AI assistant cascade: Gemini, Sarvam, OpenRouter, then offline Spirit.
- Fast local fallback for demo-critical voice commands such as Hindi reminders.
- Voice, gestures, eye tracking, sign-language translator, and accessibility profiles.
- Reminders app with spoken medication/task reminders.
- Notes AI rewrite flow with insert/copy support.
- File Explorer, Terminal, Browser, Translator, Presentation, Vault, Emergency, Known Book, PDF/image viewers, and Settings.

## Tech Stack

This repository has two independent npm packages. There is no root workspace.

| Area | Stack |
| --- | --- |
| Client | React 18, Vite 8, Zustand, Immer, Tailwind CSS, Framer Motion, lucide-react, react-rnd, axios |
| Browser ML | MediaPipe Hands, MediaPipe Tasks Vision, TensorFlow.js, face-api.js |
| Server | Node.js, Express, Prisma 5, SQLite, express-session, ws, multer, zod |
| AI Engines | Gemini, Sarvam, OpenRouter, offline Spirit NLP |
| Documents/OCR | pdf-parse, mammoth, tesseract.js, screenshot-desktop |
| NLP | compromise, chrono-node, fuse.js |

Server code uses CommonJS. Client code uses ESM.

## Architecture

```text
client/
  React desktop shell
  Apps, taskbar, settings, input controllers
  Voice, gesture, eye-tracking, sign-language UI

server/
  Express API
  Prisma + SQLite data layer
  AI engine router and tool execution
  Filesystem, terminal, reminders, vault, memory, search, voice APIs
```

Assistant requests flow through:

```text
Gemini -> Sarvam -> OpenRouter -> Spirit
```

Spirit is the deterministic offline fallback. It handles core OS actions without network access, including app control, reminders, settings, basic status questions, and several Indic-language commands.

## Quick Start

Install dependencies separately:

```powershell
cd server
npm install
copy .env.example .env
npm run db:generate
```

```powershell
cd client
npm install
```

Set at least `SESSION_SECRET` in `server/.env`.

Start both servers manually:

```powershell
cd server
npm run dev
```

```powershell
cd client
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- Health check: `http://localhost:3001/api/health`

On Windows, you can also use the demo launcher:

```bat
start-demo.cmd
```

Keep both terminal windows open while recording or presenting.

## Environment

Important server variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `SESSION_SECRET` | Yes | Session signing secret |
| `DATABASE_URL` | Yes | SQLite path, defaults to `file:./savitaos.db` in the example |
| `FS_ROOT` | No | File Explorer root. Use `./demo-filesystem` for a safe demo sandbox |
| `GEMINI_API_KEY` | No | Gemini tool-calling engine |
| `SARVAM_API_KEY` | No | Indian-language AI and voice |
| `OPENROUTER_API_KEY` | No | Free-model fallback tier |
| `TAVILY_API_KEY` | No | Web search tool |
| `AI_ENGINE_ORDER` | No | Engine cascade order |

Without AI keys, Spirit OS still runs with local deterministic assistant behavior.

## Verification

Server:

```powershell
cd server
npm test
```

Client:

```powershell
cd client
npm run build
```

The client build copies MediaPipe runtime assets into `client/public/mediapipe-*`.

## Demo Script

For a stable hackathon recording:

1. Run `start-demo.cmd`.
2. Open `http://localhost:5173`.
3. Show the desktop, launcher, windows, and Settings accessibility profiles.
4. Say a reminder command, for example:
   `मेरे लिए रिमाइंडर सेट कर दो रोज 5:00 p.m दवाई लेने के लिए`
5. Open Notes and use Ask AI to improve text, then insert the improved text.
6. Show gesture/eye-tracking controls only after camera permission is granted.
7. Show Reminders, SOS Contacts, Translator, Presentation, and File Explorer.

## Documentation

- [System Documentation](docs/SYSTEM_DOCUMENTATION.md) - architecture, apps, APIs, engines, workflows, and data model.
- [Release Checklist](docs/RELEASE_CHECKLIST.md) - push-ready checks and operational notes.

## Repository Notes

- The product name is Spirit OS.
- Some internal database names, file names, and comments still use the legacy `savitaos` name. Do not rename those without a dedicated migration.
- `.env`, SQLite databases, generated logs, build output, and runtime user data are intentionally ignored.
- Use `FS_ROOT=./demo-filesystem` for safe demos instead of exposing your full home directory.

## License

This project includes an MIT-style license in [LICENSE](LICENSE).
