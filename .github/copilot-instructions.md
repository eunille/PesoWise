# Copilot Instructions

## What This App Does
[One paragraph: purpose, audience, and core workflows of this project.]

## Tech Stack
[Fill in per project — examples:]
- Frontend: [e.g. React, Vue, Blade, Livewire]
- Backend: [e.g. Laravel, Express, FastAPI, tRPC]
- Database: [e.g. MySQL via Eloquent, PostgreSQL via Prisma]
- Auth: [e.g. Laravel Sanctum, NextAuth, JWT]
- Deployment: [e.g. Forge, Vercel, Railway]

---

## Core Principles (apply to every project, every language)

These never change regardless of stack:

- **No file exceeds 400 lines** — split by responsibility when approaching limit
- **No business logic in the UI layer** — components render, they do not decide
- **No raw API/DB calls outside the data layer** — always go through a repository or service
- **No magic numbers or hardcoded strings** — named constants only
- **No duplication** — before creating anything, check if it already exists
- **Dependency flows one direction** — UI → Application → Data → Domain
- **Validate at the boundary** — all external input (HTTP, forms, URL params) validated before use
- **Always handle all three states** — loading, error, empty — never assume data exists
- **Prefer flat code** — early returns, no deeply nested conditions
- **Named exports only** — default exports only where the framework requires it

---

## Architecture — 4-Layer Pattern

Applies to every project regardless of framework. Map layer names to your stack.
```
┌─────────────────────────────────────────────────────┐
│  LAYER 4 — PRESENTATION                             │
│  How things LOOK. Renders UI, handles interactions. │
│  ❌ NO business logic  ❌ NO direct API/DB calls    │
│  e.g. React components, Blade views, Vue templates  │
└─────────────────────────────────────────────────────┘
                        ↓ uses
┌─────────────────────────────────────────────────────┐
│  LAYER 3 — APPLICATION                              │
│  How things WORK. Hooks, services, orchestration.   │
│  ❌ NO direct API/DB calls  ❌ NO UI rendering      │
│  e.g. React Query hooks, Laravel service classes    │
└─────────────────────────────────────────────────────┘
                        ↓ uses
┌─────────────────────────────────────────────────────┐
│  LAYER 2 — DATA                                     │
│  How things CONNECT. Repositories, mappers.         │
│  ✅ ONLY layer allowed to call APIs or the DB       │
│  e.g. repositories, Eloquent models, Prisma queries │
└─────────────────────────────────────────────────────┘
                        ↓ uses
┌─────────────────────────────────────────────────────┐
│  LAYER 1 — DOMAIN                                   │
│  What things ARE. Types, schemas, pure logic.       │
│  ❌ NO framework code  ❌ NO side effects           │
│  e.g. interfaces, Zod schemas, validation rules     │
└─────────────────────────────────────────────────────┘
```

### Hard Rules (never break)
- Never call `fetch()`, `apiClient`, or DB directly outside Layer 2
- Never put business logic (conditionals, calculations, permissions) in Layer 4
- Never import framework/UI code into Layer 1
- Never make API calls inside mapper functions — mappers are pure transforms
- Dependency direction is strictly downward — never skip or reverse layers

### Folder Layout per Feature (adapt names to your stack)
```
[feature]/
├── domain/        → types, enums, schemas, pure utils
├── data/          → repository, mapper (API ↔ domain transforms)
├── application/   → hooks or service classes, orchestration
└── ui/            → components, views, pages
```

---

## Project Structure (fill in per project)
```
[Paste your actual folder tree here when starting a project]
```

**Before writing any code, Copilot must scan the project structure and identify:**
- Where existing hooks, services, components, and repositories live
- What naming conventions are already in use
- What shared UI components or design tokens already exist
- What layer a new file belongs to before creating it

---

## Implementation Workflow — Plan First, Always

**Never jump straight into writing code.** Every task follows this workflow:
```
1. UNDERSTAND  → Clarify anything ambiguous — ask before assuming
2. SCAN        → Check what already exists — never duplicate
3. PLAN        → Write a structured plan — files, phases, risks
4. CONFIRM     → Wait for approval before touching any file
5. PHASE 1     → Implement Phase 1 only, then stop and report
6. VALIDATE    → Verify Phase 1 before continuing
7. PHASE N...  → Continue one phase at a time with checkpoints
8. REVIEW      → Final pass: size limits, layer rules, consistency
```

Stop and wait for confirmation between each phase. Never chain all phases unless the user explicitly says so.

---

### Step 1 — Clarify Before Planning

Always ask before assuming. Surface ambiguity early.

**Always clarify if unknown:**
- Which layer does this logic belong to?
- Does a similar hook, component, service, or repository already exist?
- What are the exact inputs, outputs, and return values?
- Are there edge cases — empty state, error state, permissions?
- Does this touch existing files — which ones?
- Is there an existing shared component or design token to use?

---

### Step 2 — Write the Plan

Output this exact format before writing any code:
```
## Plan: [Feature Name]

### What this does
[One sentence.]

### Files to create
- [path/to/file] — what it contains

### Files to modify
- [path/to/file] — what changes and why

### Phase breakdown
- Phase 1: Domain — types, schemas, pure utils
- Phase 2: Data — repository + mapper
- Phase 3: Application — hooks or services
- Phase 4: UI — components (split if approaching 200 lines)
- Phase 5: Integration — wire together, verify end-to-end
- Phase 6: Cleanup & Review

### Risks / flags
- [anything that could affect architecture or existing files]
```

---

### Step 3 — Phase Report (after every phase)
```
## Phase [N] Complete — [Name]

### What was done
- Created [file] → [what it contains]

### Verify before Phase [N+1]
- [ ] [specific check for this phase]

### Ready for Phase [N+1]?
```

#### Standard Phase Order
```
Phase 1 — Domain
  → types, enums, schemas, pure utils
  → Verify: no framework imports, no async, no side effects

Phase 2 — Data
  → repository methods, mapper functions
  → Verify: mappers are pure, no business logic in repository

Phase 3 — Application
  → hooks or service classes, query keys, cache invalidation
  → Verify: no raw API calls, no JSX, no direct DB access

Phase 4 — UI
  → components, views, pages
  → Verify: no business logic, all states handled, under size limits

Phase 5 — Integration
  → wire layers together, verify data flows end-to-end
  → Verify: no layer violations introduced during wiring

Phase 6 — Cleanup & Review
  → run full self-review checklist
  → Verify: all files under limits, no duplication, no lint errors
```

---

## File Size Limits — Hard Caps
```
UI components          → 400 lines max
Hooks / services       → 300 lines max
Repositories           → 300 lines max
Utilities / helpers    → 200 lines max
Type / schema files    → 200 lines max
JSX / template blocks  → 150 lines max
Functions              → 80 lines max
```

**Split when:**
- File is approaching its limit and needs more content
- Component renders more than 3 distinct visual sections
- More than 5 state variables in one component
- A helper inside a file exceeds 40 lines — extract it
```
// ✅ Large page decomposed correctly
FeaturePage        (~120 lines) — orchestrator only
├── FeatureStats   — stats section
├── FeatureFilters — filter bar
├── FeatureTable   — data table
└── FeatureForm    — create/edit form
```

---

## Coding Standards (language-agnostic)

- **Strict types always** — no `any`, no unsafe casts, no type suppression comments
- **One responsibility per file** — a file that does two things should be two files
- **Pure functions preferred** — same input, same output, no side effects
- **Named constants** — no magic numbers or hardcoded strings anywhere
- **Early returns** — keep nesting flat, avoid deeply nested if/else chains
- **Docblocks** on all exported functions, hooks, and public APIs
- **Prefer `const`** over `let`, never `var` (JS/TS) — immutability by default
- **Semantic markup** — use correct elements for their purpose

### Naming Conventions (match what's already in the codebase)
```
Hooks:        useFeature, useCreateFeature, useUpdateFeature
Repositories: featureRepository / FeatureRepository
Mappers:      mapFeatureFromApi, mapFeatureToApi
Components:   PascalCase, filename = component name exactly
Services:     FeatureService (class) or featureService (object)
Constants:    SCREAMING_SNAKE_CASE
```

### Import Paths
- Always use absolute paths or path aliases — never deep relative paths
- Configure aliases in `tsconfig.json`, `vite.config`, or equivalent per project

---

## Error Handling

- API errors always return: `{ error: string, code: string, details?: unknown }`
- Never expose internal messages, stack traces, or DB errors to clients
- Log server-side with structured format and a `correlationId`
- Always handle all three UI states: loading → spinner, error → message, empty → empty state
- Use Result types for recoverable errors — don't throw everywhere
```
// ✅ Always handle all three states
if (loading) → show spinner / skeleton
if (error)   → show error message with retry
if (!data)   → show empty state with call to action
else         → render data
```

---

## Security Baselines

- Validate ALL user input server-side — even if already validated client-side
- Re-verify permissions on every mutation — never trust client-sent role or ID
- Parameterized queries only — never concatenate raw SQL
- `httpOnly`, `secure`, `sameSite` flags on all auth cookies
- Never store secrets in client-side code or committed env files
- Rate-limit all auth endpoints: login, register, password reset
- Scope API responses — never return full DB rows, select only needed fields
- Never log passwords, tokens, session IDs, or PII

---

## Consistency Rules

### Check Before You Create
- Hook / service already does this? → Use it
- Utility already exists for this transform? → Import it
- Schema already defined for this entity? → Extend it
- Shared component already handles this? → Use it
- Repository method already exists? → Use it

### Red Flags — Stop and Surface Immediately
- File approaching its limit and needs more content → propose split first
- New function very similar to one that already exists → flag it, don't duplicate
- Requirement unclear and assumptions affect architecture → ask before building
- Existing shared component almost fits but needs changes → ask: extend or new?
- Layer boundary must be broken to implement as described → raise it before coding
- Library version unclear → use context7 to fetch current docs before writing

---

## MCP-Aware Rules

- **Before writing code for any library or framework** — use context7 to fetch
  current docs. Never rely on training memory for API calls, method signatures,
  or version-specific behavior.
- **Before starting any session** — load memory MCP to recall project context,
  past decisions, and pending tasks.
- **After every session** — save to memory MCP: what was built, what files
  changed, decisions made, what is pending.
- **If something can be searched** — use brave-search instead of guessing.
- **If the task touches the filesystem outside the project** — use filesystem MCP.
- **If the task requires browser verification** — use puppeteer MCP to open
  and inspect the running app.

---

## Self-Review Checklist (run before every response)
```
PLAN
  ✅ Did I write a plan before coding?
  ✅ Did I identify all files to create AND modify?
  ✅ Did I phase it and stop for confirmation?

SCAN
  ✅ Did I check for existing hooks, services, components first?
  ✅ Do names match existing codebase conventions?
  ✅ Are imports using absolute paths / aliases?

ARCHITECTURE
  ✅ Is all business logic out of the UI layer?
  ✅ Are all API/DB calls inside the data layer only?
  ✅ Is the domain layer free of framework code?
  ✅ Does dependency flow strictly downward?

SIZE
  ✅ Is every file under its line limit?
  ✅ Did I split components that were getting large?
  ✅ Did I extract logic when a component had too many state calls?

QUALITY
  ✅ No any types, no unsafe casts, no type suppression
  ✅ No console.log / debug output in committed code
  ✅ Docblocks on all exported functions and hooks
  ✅ No magic numbers or hardcoded strings

VALIDATION
  ✅ All three states handled: loading, error, empty
  ✅ All external input validated at the boundary
  ✅ Permissions checked server-side on every mutation

SECURITY
  ✅ No secrets in client-side code or committed files
  ✅ No full DB rows returned to client
  ✅ No raw SQL concatenation

MCP
  ✅ Used context7 before writing any library or framework code
  ✅ Loaded memory at session start
  ✅ Saved memory at session end
  ✅ Used brave-search instead of guessing when needed
```
