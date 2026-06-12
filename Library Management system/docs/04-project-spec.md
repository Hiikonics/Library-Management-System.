# 04 — Writing the Project Specification

This is the most important module. A good specification is the difference between
software that solves a problem and software that merely runs.

> **Rule:** No team may ask an AI agent to write application code until
> `PROJECT_SPEC.md` exists and has been reviewed by the whole team.

---

## 4.1 What a project spec answers

A project specification answers these questions, in plain language:

1. **What problem** are we solving?
2. **Who** are the users?
3. **What** are the core features?
4. **What** are we explicitly *not* building?
5. **What** technology constraints exist?
6. **How** will we know it works?

Notice: none of these mention code, frameworks, or databases yet (except
constraints). The spec is about the *problem*, not the *solution*.

---

## 4.2 The template

Use [`templates/PROJECT_SPEC.md`](../templates/PROJECT_SPEC.md). It looks like this:

```markdown
# Project Specification

## Project Name
<one short name>

## Problem Statement
<2-4 sentences: what problem exists, who has it, why it matters>

## Target Users
- <user type 1>: <what they need>
- <user type 2>: <what they need>

## Core Features (MVP)
1. <feature>
2. <feature>
3. <feature>

## Non-Goals (out of scope for now)
- <thing we are NOT building>
- <thing we are NOT building>

## Constraints
- Deadline: <date>
- Team size: <n>
- Skill level: <beginner/intermediate>
- Target devices/browsers: <e.g. desktop Chrome>
- Budget: <e.g. free hosting only>

## Tech Stack Preference (optional at this stage)
- Frontend:
- Backend:
- Database:
- Deployment:

## Success Criteria
- <measurable statement, e.g. "A student can book a room in under 1 minute">
- <measurable statement>
```

---

## 4.3 Worked example — Campus Room Booking System

Here is a fully filled-in specification (this is the example we build throughout
the tutorial):

```markdown
# Project Specification

## Project Name
Campus Room Booking System (CRBS)

## Problem Statement
Students and lecturers at our faculty currently book rooms by messaging the admin
on WhatsApp. There is no central record, double-bookings happen, and approvals are
slow. We need a simple web system to request, approve, and track room bookings.

## Target Users
- Student: requests a room for a study group or event.
- Lecturer: requests a room for a class or meeting.
- Faculty Admin: approves or rejects requests and sees all bookings.

## Core Features (MVP)
1. User registration and login (email + password).
2. View list of rooms and their availability.
3. Submit a booking request (room, date, time, purpose).
4. Admin approves or rejects pending requests.
5. User views their own booking history and status.

## Non-Goals (out of scope for now)
- Recurring bookings.
- Payment / room rental fees.
- Mobile native app (web only).
- Integration with the university SSO (use local accounts for now).
- Email/SMS notifications (Phase 5 stretch goal).

## Constraints
- Deadline: end of semester (14 weeks).
- Team size: 4 students.
- Skill level: intermediate (know one backend language + basic React).
- Target devices/browsers: desktop and mobile web, Chrome/Firefox latest.
- Budget: free-tier hosting only.

## Tech Stack Preference
- Frontend: React + Vite (team knows React)
- Backend: FastAPI (Python) OR Express (Node) — to be decided in Module 6
- Database: PostgreSQL (or SQLite for local dev)
- Deployment: Render / Railway free tier

## Success Criteria
- A logged-in student can submit a booking request in under 1 minute.
- An admin can see all pending requests on one screen.
- No two approved bookings can overlap for the same room and time.
- All five core features work end-to-end in a demo.
```

---

## 4.4 How to write a good spec (advice for students)

| Do | Don't |
|----|-------|
| Describe the problem in user terms | Jump straight to "we will use React + Postgres" |
| List explicit non-goals | Leave scope open-ended |
| Make success criteria measurable | Write "the app should be good" |
| Keep MVP to 4-6 features | List 30 features for week one |
| Note real constraints (time, skill) | Pretend you have unlimited time |

---

## 4.5 Saving the spec to the repo

```bash
# In your project repo
cp /path/to/templates/PROJECT_SPEC.md ./PROJECT_SPEC.md
# Edit it with your real project details
# Then commit:
git add PROJECT_SPEC.md
git commit -m "docs: add project specification"
git push
```

### Screenshot: committing the spec

```
$ git add PROJECT_SPEC.md
$ git commit -m "docs: add project specification"
[main 1a2b3c4] docs: add project specification
 1 file changed, 48 insertions(+)
 create mode 100644 PROJECT_SPEC.md
$ git push
```

---

## 4.6 Using AI to *improve* (not write) the spec

The team writes the first draft. Then you can ask the agent to critique it:

```bash
claude -p "
Read PROJECT_SPEC.md.
Do NOT change it. Instead, review it as a senior engineer and tell me:
1. Which requirements are ambiguous?
2. Which non-goals are missing?
3. Which success criteria are not measurable?
4. What edge cases did we forget (e.g. booking conflicts, timezones)?
Output a numbered list of concerns only.
" --max-turns 3
```

> The agent finds gaps. The **team** decides how to fix them. This keeps humans in
> control of scope.

---

## Summary

After this module, each team has:

- [ ] A completed `PROJECT_SPEC.md` in their repo
- [ ] An AI-assisted review of that spec
- [ ] Agreement among all team members on scope and non-goals
