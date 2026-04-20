# GitHub Copilot Instructions — AI WOW Project

## Project Overview

This repository is one of **three interconnected workspaces** that together form the **Neo AI Agent** solution built for the **MetLife Asia Tech AI WOW Challenge 2026** (Embedding AI in Ways of Working).

**Challenge period:** 19 March – 18 May 2026 | **Final showcase:** 3 June 2026

---

## The Three Workspaces

| Workspace | Path | Role | Stack |
|---|---|---|---|
| **neo-ai-agent** *(this repo)* | `C:\AI\neo-ai-agent` | Backend AI service / API layer | Node.js, hosted on Vercel *(feasibility)* or Azure *(TBD)* |
| **NeoBOT** | `C:\AI\NeoBOT` | Microsoft Teams Bot frontend | Node.js, Bot Framework v4, Adaptive Cards |
| **wow** | `C:\AI\wow` | Docs, planning, challenge briefings | Markdown / HTML |

> **Tip:** Open `C:\AI\AI-WOW.code-workspace` in VS Code to work across all three folders simultaneously.

---

## This Repo — neo-ai-agent

**Role:** Backend AI service that provides the intelligence layer for NeoBOT.  
**Hosting:** Deployed to **Vercel** (production). URL: `https://neo-ai-agent-tan.vercel.app`  
**GitHub remote:** `https://github.com/neo-ai-team/neo-ai-agent`

### Branch Strategy & Deployment Flow

| Branch | Purpose | Vercel behaviour |
|---|---|---|
| `develop` | Active development — push all changes here first | Preview deployment only (not production) |
| `main` | Production — merge via PR from `develop` | **Triggers Vercel production deployment automatically** |

**Deployment steps:**
1. Commit and push changes to `develop`
2. Open a Pull Request: `develop` → `main` on GitHub
3. Merge the PR — Vercel auto-builds and deploys `main` to production
4. Verify at `https://neo-ai-agent-tan.vercel.app/api/ping`

**Known gotchas:**
- Do NOT put a `builds` array in `vercel.json` — it overrides Next.js framework detection and breaks the build. Keep `vercel.json` minimal (just `{ "version": 2 }`); Next.js routes are auto-detected.
- TypeScript imports inside `.ts` files must NOT use `.js` extensions (e.g. `'../lib/llm'` not `'../lib/llm.js'`). Turbopack (local dev) tolerates it; webpack (Vercel production build) does not.
- `npm` via PowerShell may fail with a script signing error — use `npm.cmd` or `node_modules\.bin\next.cmd dev` instead.

### Responsibilities
- Expose REST API endpoints consumed by NeoBOT
- Integrate with AI models (LLM / Azure OpenAI) for natural language understanding
- Handle business logic that sits between the Teams Bot and ServiceNow
- Return structured responses (task data, suggestions, decisions) to NeoBOT

### Key Design Principles
- Serverless-first — design functions to be portable across Vercel and Azure (avoid platform-locked APIs where possible)
- Stateless API — no persistent session state on the server
- Secure: never log credentials; validate all inputs at API boundaries
- Keep each function small and focused (single responsibility)

---

## NeoBOT (Sibling Repo)

A Microsoft Teams Bot that lets users **approve or reject ServiceNow tasks** directly from Teams.

**Tech:** Node.js · Bot Framework v4 · Adaptive Cards · ServiceNow Table API  
**Source:** `C:\AI\NeoBOT`

Flow: Teams User → NeoBOT → **neo-ai-agent API** → ServiceNow

### Current Status (Phase tracking in `C:\AI\NeoBOT\TASKS.md`)
- Phases 1–6 largely complete (bot setup, ServiceNow integration, Adaptive Cards)
- Pending: Teams app manifest, Azure Bot registration, ngrok tunnel, card confirmation flow

---

## Challenge Context

- **Challenge:** AI WOW — Embedding AI in Ways of Working (Asia Tech)
- **Goal:** Embed AI into everyday processes (e.g., ServiceNow task approval via conversational AI)
- **Judging criteria:** Working solution / prototype that demonstrates AI embedded into a real process
- **Full briefing:** `C:\AI\wow\docs\AI-WOW-Challenge-Briefing.md`

---

## Coding Conventions

- Language: JavaScript (Node.js) — no TypeScript unless explicitly added
- Use `async/await` over callbacks or raw Promises
- Environment variables via `.env` + `dotenv` — never hardcode secrets
- Follow OWASP Top 10 security practices — validate inputs, no raw error stacks to clients
- Commit messages: conventional style (`feat:`, `fix:`, `chore:`)
