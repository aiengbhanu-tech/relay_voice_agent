# Relay — AI Sales Representative

A private voice-agent workspace with a browser test room, authenticated server APIs, seven sandbox tools, durable call transcripts, and a sales observability dashboard.

## What works

- Browser speech recognition → deterministic demo agent → tools → browser speech synthesis.
- Live-model connection path: microphone → OpenAI Realtime over WebRTC → model function calls → authenticated server tools → streamed audio. Needs server `OPENAI_API_KEY`; optional `REALTIME_MODEL` defaults to `gpt-realtime-2.1`.
- Server VAD with 450 ms silence, interruption, response cancellation, WebRTC output-buffer clearing. Browser demo supports an explicit interrupt button and microphone energy-based barge-in (headphones recommended).
- Seven server tools: sandbox CRM search, availability, booking, lead creation, cited knowledge retrieval, follow-up drafts, contextual handoff queue.
- Calls persisted in D1 and isolated by authenticated owner. Search, transcript inspection, outcomes, durations, tool traces, usage, funnel, JSON export.
- Call latency: browser speech-end to TTS `onstart` in demo. Live: VAD event arrival corrected by the configured silence duration to first remote audio energy detected through Web Audio. This is an approximation: network jitter, event/track ordering, output-device delay, and thresholds affect it. It is not a sample-accurate measurement of caller acoustic end to actual speaker output. Dashboard shows mean, P50, P95. Typed messages measure submission-to-audio. Sample data is clearly labeled and can be hidden.

## External setup still required

Live AI sessions are disabled until a server API key is configured. Phone/SIP ingress, a real CRM/calendar, actual email/SMS delivery, and live human transfer are not connected. Tools do not claim these effects. Realtime usage is recorded but not converted to dollars; sample prices/costs are fictional. Live provider calls and microphone round trips were not tested without credentials.

Bookings use a unique slot constraint and reject conflicts; action IDs provide retry deduplication. A narrow race remains if the same booking action is retried concurrently; production should transact the idempotency key and booking together. Client cancellation prevents late results from being spoken, but cannot roll back a committed action. Confirmation is required in tool arguments and agent instructions; production needs a server-verifiable caller confirmation ledger. Sandbox handoff does not stop the conversation automatically; it saves context for review.

Before real customer traffic add provider webhooks/signature verification, server-managed call sessions/tool authorization, strict rate limits/concurrency quotas, billing rates, consent/retention controls, PII redaction, operational alerts, and an actual transfer/callback path. Call logs here are client-reported and should not be treated as audited billing events.

## Source structure

- `src/page.html`: dashboard and browser voice client
- `src/server.js`: Worker API and tool execution
- `worker/index.js`: compiled self-contained Worker (tracked for deployment)
- `drizzle/0000_initial.sql`: schema
- `scripts/compile.mjs`: embeds the HTML in the Worker
- `tests/server.test.mjs`: authentication, origin protection, configuration and input validation

## Development

Node 22+; no npm dependencies.

```bash
npm run dev
node scripts/compile.mjs
node --test tests/server.test.mjs
npm run build
npm run validate
```

Development preview serves the frontend only; authenticated tools and persistence are available in the deployed private Site. Sites provisions D1 and applies schema migrations. Configure secrets with Sites environment settings, never in source or browser storage. Browser speech recognition availability depends on the browser; Chrome is recommended. The voice test ends automatically after 10 minutes.

API schema follows official OpenAI Realtime WebRTC documentation:
https://developers.openai.com/api/docs/guides/voice-webrtc?voice-api=realtime
https://developers.openai.com/api/docs/guides/realtime-conversations
