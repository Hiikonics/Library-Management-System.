# 06 — Choosing the Tech Stack

The tech stack is decided **after** the PRD, **before** any code. The team makes
this decision; the AI advises.

> **Rule:** A tech stack is a team commitment. The agent must use the stack you
> chose — it does not get to switch frameworks mid-project.

---

## 6.1 What a "tech stack" includes

| Layer | Question | Example |
|-------|----------|---------|
| Frontend | How does the user interact? | React + Vite |
| Backend | Where does business logic run? | FastAPI / Express |
| Database | Where is data stored? | PostgreSQL / SQLite |
| Auth | How do users log in? | JWT / session cookies |
| Testing | How do we verify? | Vitest / Pytest |
| Deployment | Where does it run? | Render / Railway / Vercel |

---

## 6.2 Criteria for student teams

Choose a stack based on:

1. **What the team already knows** — do not learn 4 new things at once.
2. **Testability** — can you write automated tests easily?
3. **Deployability** — is there a free hosting tier?
4. **Community size** — more Stack Overflow answers = faster debugging.
5. **AI familiarity** — popular stacks = better AI-generated code.

---

## 6.3 Recommended beginner-friendly stacks

### Option 1 — Python backend

```text
Frontend:   React + Vite + Tailwind CSS
Backend:    FastAPI (Python)
Database:   SQLite (dev) → PostgreSQL (prod)
ORM:        SQLAlchemy
Auth:       JWT (python-jose) + passlib
Testing:    Pytest (backend), Vitest (frontend)
Deploy:     Render (backend) + Vercel (frontend)
```

Best if your team is comfortable with Python.

### Option 2 — JavaScript everywhere

```text
Frontend:   React + Vite + Tailwind CSS
Backend:    Express.js (Node)
Database:   PostgreSQL
ORM:        Prisma
Auth:       JWT (jsonwebtoken) + bcrypt
Testing:    Vitest (both)
Deploy:     Railway (backend + db) + Vercel (frontend)
```

Best if your team prefers one language for everything.

### Option 3 — Fullstack framework (simplest)

```text
Framework:  Next.js (React + API routes in one app)
Database:   PostgreSQL
ORM:        Prisma
Auth:       Auth.js (NextAuth)
Styling:    Tailwind CSS
Testing:    Vitest + Playwright
Deploy:     Vercel (one deploy for everything)
```

Best for small teams that want the fewest moving parts.

---

## 6.4 Asking the agent for a recommendation

```bash
claude -p "
Read PRD.md and PROJECT_SPEC.md (note the team skill level and constraints).
Recommend ONE tech stack for this project.

For your recommendation, give:
1. Each layer (frontend, backend, db, auth, testing, deployment).
2. Why it fits THIS team's skill and constraints.
3. The main trade-off / risk.
4. One simpler alternative if the team struggles.

Prioritize: maintainability, testability, free deployment, and being beginner
friendly. Do not write code. Output a short decision document.
" --max-turns 5
```

---

## 6.5 Record the decision (ADR)

Write the decision down so the whole team — and the AI — knows the rules. Create
`docs/adr/0001-tech-stack.md`:

```markdown
# ADR 0001: Tech Stack

## Status
Accepted

## Context
Team of 4 intermediate students, 14-week deadline, free hosting only.
Team knows React and Python.

## Decision
- Frontend: React + Vite + Tailwind
- Backend: FastAPI (Python)
- Database: SQLite (dev), PostgreSQL (prod)
- Auth: JWT
- Testing: Pytest + Vitest
- Deploy: Render + Vercel

## Consequences
- Two languages to manage (Python + JS), but both are known.
- Free tier may sleep after inactivity; acceptable for a demo.
- AI agents must use this stack and not introduce new frameworks.
```

Commit it:

```bash
git add docs/adr/0001-tech-stack.md
git commit -m "docs: record tech stack decision (ADR 0001)"
git push
```

---

## 6.6 Make the AI respect the stack

Once decided, add the stack to a `CLAUDE.md` (Claude Code) or `AGENTS.md` (Codex)
file at the repo root so the agent loads it automatically:

```markdown
# Project Context

## Tech Stack (DO NOT CHANGE without team approval)
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python 3.11)
- Database: SQLite for dev, PostgreSQL for prod
- ORM: SQLAlchemy
- Auth: JWT
- Testing: Pytest (backend), Vitest (frontend)

## Conventions
- Backend code lives in /backend
- Frontend code lives in /frontend
- All endpoints documented in /backend/README.md
- Type hints required on all Python functions
- Run backend tests: `cd backend && pytest`
- Run frontend tests: `cd frontend && npm test`
```

```bash
git add CLAUDE.md
git commit -m "docs: add project context for AI agents"
git push
```

> Now every time you run `claude` in this repo, it reads `CLAUDE.md` and stays on
> the chosen stack. Codex reads `AGENTS.md` the same way.

---

## Summary

After this module, each team has:

- [ ] A chosen tech stack with a recorded ADR
- [ ] AI advice on trade-offs
- [ ] A `CLAUDE.md` / `AGENTS.md` that pins the stack for the agent
