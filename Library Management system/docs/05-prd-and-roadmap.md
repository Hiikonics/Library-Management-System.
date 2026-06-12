# 05 — Generating the PRD and Roadmap

With `PROJECT_SPEC.md` approved, we now create two deeper documents:

- **PRD.md** — Product Requirements Document. Detailed *what* and *for whom*.
- **ROADMAP.md** — Phased plan. *When* each part gets built.

The agent drafts these. The **team reviews and corrects** them.

---

## 5.1 What is a PRD?

A PRD expands the spec into a precise, reviewable contract. It contains:

- Background and problem statement
- User personas
- User stories ("As a student, I want to … so that …")
- Functional requirements (numbered)
- Non-functional requirements (performance, security, accessibility)
- Data entities (what data exists, not the schema yet)
- Permission matrix (who can do what)
- Acceptance criteria
- MVP scope vs future scope

---

## 5.2 Generating the PRD with an agent

```bash
claude -p "
Read PROJECT_SPEC.md.

Create PRD.md. Structure it with these sections:
1. Background
2. Problem Statement
3. User Personas (one per user type)
4. User Stories (As a <role>, I want <goal>, so that <benefit>)
5. Functional Requirements (numbered F01, F02, ...)
6. Non-Functional Requirements (numbered NF01, NF02, ...)
7. Data Entities (list entities and their key fields, no SQL yet)
8. Permission Matrix (table: action x role)
9. Acceptance Criteria (per functional requirement)
10. MVP Scope vs Future Scope

Rules:
- Do not write any application code.
- Do not pick a framework or write SQL.
- If anything in the spec is ambiguous, ask me first.
" --max-turns 15
```

```bash
# Codex equivalent
codex exec --full-auto "
Read PROJECT_SPEC.md and create PRD.md with sections: background, problem,
personas, user stories, functional requirements (numbered), non-functional
requirements, data entities, permission matrix, acceptance criteria, MVP vs
future scope. Do not write app code.
"
```

---

## 5.3 Reviewing the generated PRD (critical step)

> **Do not blindly accept the AI's PRD.** This is where students learn the most.

Open `PRD.md` and check:

1. Did the AI invent features you never asked for? → Remove them.
2. Did it miss a user story? → Add it.
3. Is the permission matrix correct? → Fix it.
4. Are acceptance criteria testable? → Make them measurable.

Example correction prompt:

```bash
claude -p "
In PRD.md you added a 'room rating and review' feature.
That is NOT in scope (see Non-Goals in PROJECT_SPEC.md).
Remove it. Also add a user story for an admin rejecting a booking with a reason.
" --max-turns 3
```

---

## 5.4 Example permission matrix (from the sample PRD)

| Action | Student | Lecturer | Admin |
|--------|:-------:|:--------:|:-----:|
| Register / log in | ✅ | ✅ | ✅ |
| View available rooms | ✅ | ✅ | ✅ |
| Submit booking request | ✅ | ✅ | ✅ |
| View own bookings | ✅ | ✅ | ✅ |
| View all bookings | ❌ | ❌ | ✅ |
| Approve / reject bookings | ❌ | ❌ | ✅ |
| Manage rooms (add/edit) | ❌ | ❌ | ✅ |

This table is one of the most valuable parts of the PRD — it prevents the agent
from accidentally giving students admin powers.

---

## 5.5 Generating the Roadmap

The roadmap breaks the PRD into **phases**. Each phase is shippable on its own.

```bash
claude -p "
Read PRD.md.
Create .planning/ROADMAP.md.

Split the project into phases. Rules:
- Phase 1 must be the smallest useful slice (usually auth).
- Each phase has 3-5 functional requirements.
- Each phase has a single clear deliverable and a demo statement.
- Order phases so the app is demoable after each one.
- Map each phase to the F-numbers from PRD.md.

Do not write code.
" --max-turns 10
```

---

## 5.6 Example roadmap (sample project)

```markdown
# Roadmap — Campus Room Booking System

## Phase 1 — Authentication  (F01, F02)
Deliverable: Users can register, log in, and log out.
Demo: Create an account, log in, see an empty dashboard, log out.

## Phase 2 — Room Listing  (F03)
Deliverable: Logged-in users see a list of rooms and availability.
Demo: Log in, view rooms with capacity and status.

## Phase 3 — Booking Requests  (F04, F07)
Deliverable: Users submit booking requests; see their own history.
Demo: Request room A for tomorrow 10:00-12:00; see it as "pending".

## Phase 4 — Admin Approval  (F05, F06)
Deliverable: Admin dashboard to approve/reject; conflict prevention.
Demo: Admin approves a request; a conflicting request is blocked.

## Phase 5 — Polish & Deploy  (NF01-NF04)
Deliverable: Notifications, validation, deployment to free hosting.
Demo: Live URL; approval triggers an in-app notification.
```

---

## 5.7 Commit the planning documents

```bash
git add PRD.md .planning/ROADMAP.md
git commit -m "docs: add PRD and phased roadmap"
git push
```

### Screenshot: planning commit

```
$ git add PRD.md .planning/ROADMAP.md
$ git commit -m "docs: add PRD and phased roadmap"
[main 5f6a7b8] docs: add PRD and phased roadmap
 2 files changed, 112 insertions(+)
 create mode 100644 PRD.md
 create mode 100644 .planning/ROADMAP.md
$ git push
```

---

## 5.8 Why this order matters

```
PROJECT_SPEC.md  →  the problem (1 page)
       ↓
PRD.md           →  detailed requirements (precise contract)
       ↓
ROADMAP.md       →  delivery plan (phases)
       ↓
PHASE PLAN.md    →  tasks (next module)
       ↓
CODE             →  finally
```

Each document is reviewable on its own. If the PRD is wrong, you catch it before
writing a single line of code — when fixing it costs minutes, not days.

---

## Summary

After this module, each team has:

- [ ] An AI-generated, human-reviewed `PRD.md`
- [ ] A correct permission matrix
- [ ] A phased `.planning/ROADMAP.md`
- [ ] All planning documents committed to GitHub
