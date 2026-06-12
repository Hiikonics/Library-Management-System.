# Library Management System

> A comprehensive library management platform for tracking books, members, loans, and library operations.

## Status

✅ **Phase 1 (Book Catalog Management) — COMPLETE**
- Full backend API with authentication, book CRUD, search, inventory
- React frontend with login, register, book catalog, filters
- PostgreSQL database with migrations and indexes
- Docker setup for local development
- Comprehensive API documentation

## Quick Start

### Option 1: Docker (Recommended)
```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
# Database: localhost:5432
```

### Option 2: Local Development
```bash
# Backend
cd backend
npm install
npm run migrate
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Documentation

- [Project Spec](PROJECT_SPEC.md)
- [PRD](PRD.md)
- [Planning](.planning/)

## Phase 1 Features ✅ IMPLEMENTED

### Authentication & Authorization
- ✅ User registration with email/password
- ✅ User login with JWT tokens
- ✅ Role-based access (Member, Librarian, Admin)
- ✅ Password validation (min 8 chars, uppercase, number)

### Book Catalog Management
- ✅ Create/Read/Update/Delete books (Librarian+)
- ✅ ISBN validation and uniqueness
- ✅ Book metadata: title, author, genre, publication date, description, cover URL
- ✅ Inventory tracking (total copies, available copies)
- ✅ Book condition tracking (good, fair, poor, lost, damaged)
- ✅ Location/shelf information
- ✅ Soft deletes (archived books)

### Search & Discovery
- ✅ Full-text search (title, author, ISBN, genre)
- ✅ Advanced filtering (by genre, condition, availability, year)
- ✅ Pagination (20 results per page)
- ✅ Real-time availability status
- ✅ Multiple sort options

### Admin Features
- ✅ Dashboard with catalog statistics
- ✅ User management
- ✅ Audit logging (who did what, when)
- ✅ Inventory reports

### Frontend UI
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Login/register pages
- ✅ Book catalog list with filters
- ✅ Book details view
- ✅ Add/edit book forms (Librarian only)

### Backend Infrastructure
- ✅ Express.js API server
- ✅ PostgreSQL database
- ✅ Database migrations & indexes
- ✅ Authentication middleware
- ✅ Error handling
- ✅ CORS support

### DevOps & Documentation
- ✅ Docker & Docker Compose setup
- ✅ API documentation (docs/API.md)
- ✅ Setup & deployment guide (docs/SETUP.md)
- ✅ Demo credentials for testing

## Future Phases

- **Phase 2**: Member management, borrowing/returning books, loan history
- **Phase 3**: Advanced reporting, reviews, recommendations
- **Phase 4**: External APIs, barcode scanning, mobile app

## Development Workflow

This project follows the **Get Shit Done (GSD)** process:

1. **Discussion** — Define requirements and user stories
2. **Planning** — Create implementation plan
3. **Execution** — Write code following the plan
4. **Verification** — Test and validate
5. **Shipping** — Deploy and iterate
