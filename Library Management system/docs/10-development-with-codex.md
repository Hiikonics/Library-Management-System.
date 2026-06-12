# 10 — Developing with OpenAI Codex

This module mirrors Module 09 using OpenAI Codex instead of Claude Code.
The workflow is identical; only the commands differ.

**Prerequisites:**

- Codex installed and authenticated (Module 02)
- A repo with `.planning/ROADMAP.md` and `AGENTS.md` (Modules 03–06)
- A GitHub issue to work on (Module 07)

---

## 10.1 Create `AGENTS.md`

Codex reads `AGENTS.md` at the repo root automatically (similar to Claude's
`CLAUDE.md`). Create it:

```bash
cat > AGENTS.md << 'EOF'
# Project Context

## Tech Stack (DO NOT CHANGE without team approval)
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python 3.11)
- Database: SQLite for dev, PostgreSQL for prod
- ORM: SQLAlchemy
- Auth: JWT
- Testing: Pytest (backend), Vitest (frontend)

## Directory Structure
- Backend: /backend/
- Frontend: /frontend/

## Test Commands
- Backend: cd backend && pytest -v
- Frontend: cd frontend && npm test -- --run

## Rules
- Type hints on all Python functions
- Do not add packages unless approved
- Do not modify .planning/ documents
- Do not implement phases beyond the current one
EOF

git add AGENTS.md
git commit -m "docs: add project context for Codex agents"
git push
```

---

## 10.2 Create a feature branch

```bash
cd room-booking-system
git checkout main && git pull origin main
git checkout -b feat/auth-codex   # or feat/auth if using separate worktree
```

---

## 10.3 Create the phase plan with Codex

```bash
codex exec "
Read .planning/ROADMAP.md and PRD.md.
Create .planning/phases/phase-1/PLAN.md with:
- Phase goal
- Acceptance criteria
- Task list
- Files that will be created or modified
- Test plan
Do not write any app code. Output only the plan file.
"
```

---

## 10.4 Implement the phase with Codex

```bash
codex exec --full-auto "
Read AGENTS.md, PRD.md, and .planning/phases/phase-1/PLAN.md.

Implement Phase 1: Authentication.
Follow the PLAN.md exactly.

Rules:
1. Use only the stack in AGENTS.md.
2. Backend in /backend/, frontend in /frontend/.
3. Write tests with each task.
4. Run tests: pytest backend/tests/ -v then npm test -- --run (in frontend/).
5. Fix any failing tests.
6. Do NOT implement Phase 2 or later.
7. Commit each completed task: 'feat(auth): ...'
"
```

### Screenshot: Codex running

```
$ codex exec --full-auto "Implement Phase 1: Authentication..."

Codex is ready.
> Reading AGENTS.md
> Reading PRD.md
> Reading .planning/phases/phase-1/PLAN.md

Task 1: Create User model
> Writing backend/models/user.py

Task 2: Register endpoint
> Writing backend/routes/auth.py

Task 3: Run tests
> Running: cd backend && pytest -v
  test_register_success PASSED
  test_register_dupe    PASSED
  test_login_success    PASSED
  test_login_fail       PASSED

Task 4: Login page
> Writing frontend/src/pages/Login.tsx

✓ Phase 1 complete. 7 files created or modified.
```

---

## 10.5 Monitor long tasks

For tasks that take more than a few minutes, run Codex in the background:

```bash
# Start in background
codex exec --full-auto "Implement Phase 1: Authentication..." &
CODEX_PID=$!

# Check progress in another terminal
tail -f /tmp/codex-output.log

# Or just wait for it to finish
wait $CODEX_PID && echo "Done"
```

---

## 10.6 Review and verify

```bash
# What changed?
git status
git diff --stat

# Scan for unexpected files
git status --porcelain | grep '^\?\?'

# Run tests yourself
cd backend && pytest -v
cd frontend && npm test -- --run
```

---

## 10.7 Commit and push

```bash
git add .
git commit -m "feat: implement Phase 1 authentication

- User model with password hashing
- Register + login + logout endpoints
- Frontend login/register pages
- All tests passing

Closes #1"

git push -u origin feat/auth-codex
```

---

## 10.8 Create Pull Request

```bash
gh pr create \
  --title "feat: authenticate users (Phase 1)" \
  --body "
## Summary
Phase 1 implementation using Codex + GPT.

- F01: User registration ✅
- F02: User login/logout ✅
- Pytest: 14 passed
- Vitest: 9 passed

## AI Assistance
Implemented by Codex. Human review:
- Requirements alignment ✅
- Test results ✅
- No unexpected files ✅
- Password hashing reviewed ✅

Closes #1
"
```

---

## 10.9 Codex flags cheatsheet

| Flag | Effect |
|------|--------|
| `codex exec "task"` | Run one task, exits when done |
| `--full-auto` | Auto-approve all file changes in sandbox |
| `--yolo` | No sandbox at all (fastest, riskiest) |
| `codex review` | Review current branch vs main |

---

## 10.10 Claude vs Codex in practice

| | Claude Code | Codex |
|---|---|---|
| Reading many files | Excellent | Good |
| Writing focused features | Good | Excellent |
| Self-correction | Reads test output, reruns | Reads test output, reruns |
| Parallel instances | Multiple tmux sessions | Multiple terminals |
| Built-in plan mode | Yes (`/plan`) | No (prompt-based) |
| Worktree integration | `claude -w <name>` | Manual worktree |

---

## Summary

After this module, students using Codex can:

- [ ] Create a phase plan using Codex
- [ ] Execute a focused feature implementation
- [ ] Review and verify generated code
- [ ] Commit and open a Pull Request
