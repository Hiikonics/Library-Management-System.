# 00 — Mindset: Agentic AI Is Not a Shortcut Around Software Engineering

Agentic AI can read files, edit code, run tests, debug errors, create commits,
and help with pull requests. That is powerful. It is also dangerous if students
use it without a disciplined workflow.

This tutorial starts with a simple rule:

> **Do not ask an AI agent to build software until the software is specified.**

---

## Chatbot vs agentic AI

A chatbot answers questions. An agentic AI coding assistant can take actions in a
repository.

Examples:

```text
Chatbot prompt:
"How do I make a login form?"
```

```text
Agentic prompt:
"Read PRD.md. Implement only Phase 1 authentication. Add tests. Run tests.
Commit changes with a conventional commit message."
```

The second prompt assumes the agent has access to:

- project files
- terminal commands
- test runner
- Git repository
- clear requirements

Without those, the agent guesses.

---

## What AI agents are good at

AI coding agents are useful for:

- scaffolding a project
- implementing small, well-described features
- writing repetitive code
- generating tests
- refactoring
- explaining a codebase
- reviewing a Pull Request
- debugging errors from test output

They are not a replacement for:

- deciding the product scope
- validating user needs
- choosing realistic constraints
- reviewing security and privacy implications
- accepting responsibility for the final software

---

## The main risk: building the wrong thing faster

A vague prompt:

```text
Build me a campus room booking system.
```

This can produce code, but the agent has to guess:

- Who can book rooms?
- Who approves bookings?
- Can bookings overlap?
- Is login required?
- Is this mobile-first?
- What database should be used?
- What does “available room” mean?
- What happens if an admin rejects a request?

A better process:

```text
1. Create PROJECT_SPEC.md first.
2. Generate PRD.md.
3. Review and correct the PRD manually.
4. Create ROADMAP.md.
5. Implement only Phase 1.
```

---

## The AI supervisor role

In this tutorial, the human student becomes an **AI supervisor**.

The supervisor is responsible for:

1. Writing the original problem statement.
2. Checking whether the AI-generated PRD is correct.
3. Approving the tech stack.
4. Splitting work into phases.
5. Reviewing code before merge.
6. Ensuring the app satisfies the PRD.

If the app fails, the excuse cannot be “the AI wrote it.” The team owns the
software.

---

## The spec-first rule

Every software project in this tutorial begins with these files:

```text
PROJECT_SPEC.md
PRD.md
.planning/ROADMAP.md
```

Only after those exist may the team ask the agent to write application code.

---

## Good agent prompts are constrained

Bad prompt:

```text
Make the app better.
```

Better prompt:

```text
Read PRD.md and .planning/ROADMAP.md.
Implement only Phase 1: authentication.
Do not implement booking yet.
Use the selected tech stack.
Add tests for successful login, failed login, and logout.
Run the tests.
Commit the result.
```

The second prompt gives scope, constraints, and verification.

---

## Class discussion questions

1. What can go wrong if a team lets AI choose all requirements?
2. Who is responsible if AI-generated code leaks user data?
3. Why should every AI-generated feature go through a Pull Request?
4. Why is “working code” not always “correct software”?

---

## Key takeaway

Agentic AI is a powerful junior developer. It needs a clear ticket, a codebase,
tests, and review. Treat it like a collaborator, not an oracle.
