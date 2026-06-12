# Building Software with Agentic AI — From Specs to Pull Requests

A hands-on tutorial for **undergraduate Computer Science students** on how to use
agentic AI coding assistants (Claude Code and OpenAI Codex) to build real software
**the right way**: specification first, then code.

> **Core principle of this tutorial:**
> *An information system shall never be developed without a proper project
> specification, a defined tech stack, and a clear plan first.*
>
> AI can accelerate implementation. It cannot replace engineering discipline.
> Bad specs produce bad software — faster. Good specs produce good software — faster.

---

## Who this is for

- Undergraduate CS / Informatics students
- Students working in **teams** on a software project / final assignment
- Anyone who wants to learn the *professional* workflow around AI coding agents,
  not just "type a prompt and hope"

**Prerequisites:** basic Git, basic command line, a GitHub account, and one
programming language you are comfortable with.

---

## What you will learn

1. Why **specification-first** development matters (especially with AI).
2. How to install and authenticate **Claude Code** and **OpenAI Codex**.
3. How to turn a raw idea into a **PROJECT_SPEC → PRD → ROADMAP**.
4. How to choose a **tech stack** appropriate for a student team.
5. How to set up **GitHub**, branches, issues, and **Pull Requests**.
6. How a **team collaborates** using GitHub + **git worktrees** (multiple agents /
   people working in parallel without stepping on each other).
7. How to develop the app **phase by phase** with an agent.
8. How to **review** AI-written code before merging.

---

## The golden workflow

```
Idea
  └─> PROJECT_SPEC.md      (what & why)
        └─> PRD.md         (detailed product requirements)
              └─> ROADMAP.md   (phases / milestones)
                    └─> PHASE_PLAN.md   (tasks for one phase)
                          └─> implementation (AI agent + human)
                                └─> tests
                                      └─> Pull Request
                                            └─> code review
                                                  └─> merge
```

Nothing skips a step. Code is the **last** thing that happens, not the first.

---

## Two equivalent paths

This tutorial gives you **two complete paths**. Pick one (or learn both).

| | **Path A — Claude Code** | **Path B — OpenAI Codex** |
|---|---|---|
| CLI | `claude` | `codex` |
| Model family | Claude | GPT |
| Strengths | Large repos, planning, multi-file refactors, deep review | Fast iteration, focused coding tasks, refactors |
| Auth | `claude auth login` | `codex login` |
| Doc module | [07-development-with-claude.md](docs/07-development-with-claude.md) | [08-development-with-codex.md](docs/08-development-with-codex.md) |

Both paths use the **same** spec → PRD → roadmap → GitHub → worktree discipline.

---

## Table of contents

| # | Module | What it covers |
|---|--------|----------------|
| 0 | [00-mindset.md](docs/00-mindset.md) | Why spec-first; what agentic AI is and isn't |
| 1 | [01-setup-environment.md](docs/01-setup-environment.md) | git, node, gh, identity |
| 2 | [02-install-agent-cli.md](docs/02-install-agent-cli.md) | Install + auth Claude Code and Codex |
| 3 | [03-get-shit-done-workflow.md](docs/03-get-shit-done-workflow.md) | The planning workflow / plugin |
| 4 | [04-project-spec.md](docs/04-project-spec.md) | Writing PROJECT_SPEC.md |
| 5 | [05-prd-and-roadmap.md](docs/05-prd-and-roadmap.md) | Generating PRD + ROADMAP |
| 6 | [06-tech-stack.md](docs/06-tech-stack.md) | Choosing a stack |
| 7 | [07-github-workflow.md](docs/07-github-workflow.md) | Repo, branches, issues, PRs |
| 8 | [08-worktree-teamwork.md](docs/08-worktree-teamwork.md) | Parallel team/agent work with worktrees |
| 9 | [09-development-with-claude.md](docs/09-development-with-claude.md) | Building with Claude Code |
| 10 | [10-development-with-codex.md](docs/10-development-with-codex.md) | Building with Codex |
| 11 | [11-pr-review.md](docs/11-pr-review.md) | Reviewing AI code before merge |

Templates live in [`templates/`](templates/). A worked example lives in
[`sample-project/room-booking-system/`](sample-project/room-booking-system/).

---

## The running example

Throughout the tutorial we build one project:

**Campus Room Booking System** — students, lecturers, and faculty admins can view
available rooms, book a room, and have bookings approved. It is small enough to
finish in a semester and realistic enough to teach every concept.

---

## How to use this repository in class

1. **Lecture:** Module 0 (mindset) + Module 4 (spec) — no computer needed.
2. **Lab 1:** Modules 1–3 — install and authenticate the tools.
3. **Lab 2:** Modules 4–6 — each student writes a spec, generates a PRD, picks a stack.
4. **Lab 3:** Modules 7–8 — set up GitHub, branches, and worktrees as a team.
5. **Lab 4:** Modules 9–10 — build a feature with the agent.
6. **Lab 5:** Module 11 — review and merge each other's PRs.

---

## License

MIT. Use freely for teaching. See [LICENSE](LICENSE).
