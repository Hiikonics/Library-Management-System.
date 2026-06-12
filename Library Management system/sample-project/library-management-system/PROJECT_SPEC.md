# Library Management System - Project Specification

> Fill this in **before** asking any AI agent to write code.
> Keep it focused on the *problem*, not the *solution*.

## Project Name
Library Management System (LMS)

## Problem Statement
Libraries struggle to efficiently manage large collections of books, track inventory, handle member access to catalogs, and maintain accurate book metadata. Without a centralized system, librarians spend excessive time on manual cataloging, book location searches, and availability checks. Members cannot easily discover, search, or check book availability.

## Target Users
- **Librarians**: Need to catalog books, manage inventory, track availability, and generate reports
- **Library Members**: Need to search books, check availability, view loan history, and discover new titles
- **Library Admins**: Need to oversee operations, manage staff permissions, and configure system settings

## Core Features (MVP - Phase 1: Book Catalog Management)
1. **Book Catalog Entry** — Librarians can add books with ISBN, title, author, genre, publication date, and availability
2. **Search and Filter** — Members and librarians can search by title, author, ISBN, genre, and publication year
3. **Book Details Display** — View comprehensive book information including metadata, cover image, synopsis, and availability status
4. **Inventory Management** — Track book quantities, condition status, and location within the library
5. **Admin Dashboard** — Overview of catalog statistics and management controls
6. **User Authentication** — Basic login/signup with role-based access (Librarian, Member, Admin)

## Non-Goals (out of scope for Phase 1)
- Borrowing and returning books workflow
- Loan history and tracking
- Advanced reporting and analytics
- Member review and rating system
- Book recommendations engine
- Integration with external book databases (for Phase 1)

## Constraints
- Deadline: 4-6 weeks (Phase 1)
- Team size: 1-2 developers
- Skill level: Intermediate (familiar with web frameworks and databases)
- Target devices/browsers: Desktop and mobile web (Chrome, Firefox, Safari latest)
- Budget: Free/low-cost hosting (can start with local/cloud-free tier)

## Tech Stack Preference (optional at this stage)
- **Frontend**: React or Vue.js with TypeScript
- **Backend**: Python (FastAPI) or Node.js (Express)
- **Database**: PostgreSQL for relational data integrity
- **Deployment**: Docker containers, run on cloud (AWS, Azure, or local)

## Success Criteria
- Librarians can add a new book to the catalog in under 2 minutes with all required metadata
- Users can search for books and find results within 1 second
- The system supports a catalog of at least 10,000 books without performance degradation
- Book metadata is 100% accurate with validation on entry
- User authentication works securely with role-based access enforced
- Mobile responsiveness allows 90%+ content visibility on phones
