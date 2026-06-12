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
2. View list of rooms and their availability calendar.
3. Submit a booking request (room, date, time range, purpose).
4. Admin approves or rejects pending requests.
5. User views their own booking history and status.

## Non-Goals (out of scope for now)
- Recurring bookings.
- Payment or room rental fees.
- Mobile native app (web only).
- Integration with the university SSO (use local accounts for now).
- Email or SMS notifications (future stretch goal).

## Constraints
- Deadline: end of semester (14 weeks).
- Team size: 4 students.
- Skill level: intermediate (know one backend language + basic React).
- Target devices/browsers: desktop and mobile web, Chrome and Firefox latest.
- Budget: free-tier hosting only.

## Tech Stack Preference
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python)
- Database: SQLite (dev), PostgreSQL (prod)
- Deployment: Render (backend) + Vercel (frontend)

## Success Criteria
- A logged-in student can submit a booking request in under 1 minute.
- An admin can see all pending requests on one screen.
- No two approved bookings can overlap for the same room and time.
- All five core features work end-to-end in a live demo.
