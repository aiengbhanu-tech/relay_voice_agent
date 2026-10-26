# Get started and push to GitHub

This is the complete implementation used for Relay: a JavaScript frontend and Cloudflare Worker backend. It is not a Python/FastAPI project.

## 1. Extract and open

Extract the ZIP and open the `relay-voice` folder in VS Code. Open a terminal in this folder. Use Node.js 22+ and Git. No npm dependency installation is required.

## 2. Run the frontend preview

```powershell
npm run dev
```

Open http://localhost:4173 . This serves the dashboard and browser conversation UI. The preview intentionally does not serve authenticated backend APIs. CRM, bookings and persistence need the deployed backend; this is not a complete local backend emulator.

## 3. Compile and test

These commands work in PowerShell:

```powershell
node scripts/compile.mjs
node --test tests/server.test.mjs
```

To build deployment output, run in Git Bash or WSL (the build script requires Bash):

```bash
npm run build
npm run validate
```

Run compilation after editing `src/page.html` or `src/server.js`. Deployment runs the compiled `worker/index.js`; do not edit that generated file directly.

## 4. Push to GitHub

Create an empty repository named `relay-voice-agent` in your GitHub account. Leave README, license and .gitignore options unchecked. Then run these commands in the extracted folder, replacing YOUR_USERNAME:

```powershell
git init
git add .
git commit -m "Initial commit: Relay voice sales workspace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/relay-voice-agent.git
git push -u origin main
```

The ZIP contains no `.git` history, source credentials, runtime records, or original Site ID. Never commit real API keys.

## 5. Backend and hosting requirements

The original app runs on Sites as a private Cloudflare Worker with D1. `.openai/hosting.json` retains the logical `DB` binding but omits the old Site ID. Register a new Site to deploy this independent copy through Sites, and migrate the SQL schema before using tools or saving calls.

The backend expects trusted `oai-authenticated-user-id` identity headers supplied by Sites. Outside Sites, implement real authentication and replace that identity mechanism. Do not trust client-supplied identity headers on a public server. GitHub Pages and plain static hosting cannot run the backend.

For live AI voice, configure a server `OPENAI_API_KEY` secret and optionally `REALTIME_MODEL`. `.env.example` documents variable names only: copying it to `.env` does not configure the current frontend preview. Never embed the permanent API key in browser code.

## Current implementation and limits

- Dashboard includes sample calls, analytics, funnel, usage, transcripts, tool traces and JSON export.
- Browser demo uses browser STT, scripted answers and browser TTS, with interruption controls.
- Live AI uses a WebRTC connection path and model tool calling; credentials are required and live provider audio was not tested.
- Seven server tools use sandbox data. Follow-up creates drafts; handoff queues context. Real CRM, external calendar, message delivery and phone transfer are not connected.
- Six automated checks cover script parsing, authentication, origin protection, missing credentials, tool validation and secret omission.
- README.md describes latency measurement limits, idempotency caveats and remaining production work.
