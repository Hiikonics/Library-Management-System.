# Product Requirements Document — Campus Room Booking System (CRBS)

## 1. Background
The faculty has ~15 shared rooms (classrooms, labs, meeting rooms). Booking is
currently informal (WhatsApp to admin), causing double-bookings, lost requests,
and no audit trail. CRBS centralizes room booking into one reviewable web system.

## 2. Problem Statement
There is no single source of truth for who booked which room and when. Approvals
are manual and slow, and conflicts are discovered only when two groups show up to
the same room.

## 3. User Personas

### Persona 1: Student
- Goals: book a room for a study group quickly.
- Pain points: doesn't know which rooms are free; waits hours for WhatsApp reply.
- Needs: see availability, submit a request, track its status.

### Persona 2: Lecturer
- Goals: reserve a room for a class or meeting reliably.
- Pain points: rooms sometimes double-booked.
- Needs: trustworthy availability, fast confirmation.

### Persona 3: Faculty Admin
- Goals: keep room usage organized and conflict-free.
- Pain points: scattered requests across chats; no overview.
- Needs: one screen with all pending requests; ability to approve/reject; conflict prevention.

## 4. User Stories
- As a student, I want to register and log in, so that my bookings are tied to me.
- As a student, I want to see available rooms, so that I pick a free one.
- As a student, I want to submit a booking request, so that I can reserve a room.
- As a student, I want to see my booking history and status, so that I know if I'm approved.
- As an admin, I want to see all pending requests on one page, so that I can manage them.
- As an admin, I want to approve or reject a request (with a reason), so that users get a clear decision.
- As an admin, I want overlapping approved bookings to be blocked, so that no conflicts occur.

## 5. Functional Requirements
- **F01:** Users can register with email and password.
- **F02:** Users can log in and log out (JWT session).
- **F03:** Logged-in users can view a list of rooms with capacity and availability.
- **F04:** Logged-in users can submit a booking request (room, date, start time, end time, purpose).
- **F05:** Admins can approve or reject pending requests (rejection requires a reason).
- **F06:** The system blocks approval of a request that overlaps an existing approved booking for the same room.
- **F07:** Users can view their own bookings and statuses (pending / approved / rejected).

## 6. Non-Functional Requirements
- **NF01:** Performance — pages load in under 2 seconds on a typical connection.
- **NF02:** Security — passwords hashed (bcrypt); JWT secret stored in env var; sessions expire after 24h.
- **NF03:** Compatibility — works on Chrome and Firefox latest, desktop and mobile web.
- **NF04:** Maintainability — backend and frontend separated; tests for all endpoints.

## 7. Data Entities

### User
- `id`, `email`, `password_hash`, `name`, `role` (student | lecturer | admin), `created_at`

### Room
- `id`, `name`, `capacity`, `location`, `is_active`

### Booking
- `id`, `user_id`, `room_id`, `date`, `start_time`, `end_time`, `purpose`,
  `status` (pending | approved | rejected), `reject_reason`, `created_at`

## 8. Permission Matrix

| Action | Student | Lecturer | Admin |
|--------|:-------:|:--------:|:-----:|
| Register / log in | ✅ | ✅ | ✅ |
| View available rooms | ✅ | ✅ | ✅ |
| Submit booking request | ✅ | ✅ | ✅ |
| View own bookings | ✅ | ✅ | ✅ |
| View all bookings | ❌ | ❌ | ✅ |
| Approve / reject bookings | ❌ | ❌ | ✅ |
| Manage rooms (add/edit) | ❌ | ❌ | ✅ |

## 9. Acceptance Criteria

### F01 — Registration
- [ ] A new user can register with a unique email.
- [ ] Registering with an existing email returns an error.
- [ ] Password is stored hashed, never in plain text.

### F02 — Login / Logout
- [ ] Correct credentials return a valid JWT.
- [ ] Wrong password returns 401.
- [ ] Logout invalidates the session client-side.

### F04 — Booking request
- [ ] A logged-in user can submit a request with all required fields.
- [ ] Missing fields return a validation error.
- [ ] New requests have status "pending".

### F06 — Conflict prevention
- [ ] Admin cannot approve a request that overlaps an existing approved booking for the same room and time.
- [ ] A clear error is shown when a conflict is detected.

## 10. MVP Scope
Included: F01–F07, NF01–NF04.

## 11. Future Scope
- Email/SMS notifications
- Recurring bookings
- University SSO integration
- Room usage analytics dashboard

## 12. Open Questions
- Should lecturers' requests be auto-approved or still require admin review? (Decision: require review for MVP.)
- What is the minimum/maximum booking duration? (Decision: 30 min – 4 hours for MVP.)
