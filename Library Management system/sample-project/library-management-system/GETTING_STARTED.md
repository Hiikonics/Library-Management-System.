# Getting Started - Library Management System

## 🚀 Start Here

This guide will get you up and running in 5 minutes.

## Option 1: Docker (Recommended - No Setup Required)

### Requirements
- Docker Desktop installed (https://www.docker.com/products/docker-desktop)

### Steps

1. **Navigate to project**
   ```bash
   cd sample-project/library-management-system
   ```

2. **Start all services**
   ```bash
   docker-compose up
   ```

   Wait for output like:
   ```
   ✓ Server running on http://localhost:5000
   ```

3. **Open in browser**
   - Frontend: http://localhost:3000
   - API docs: docs/API.md

4. **Login with demo account**
   ```
   Email: member@test.com
   Password: Password123
   ```

5. **Stop services**
   ```bash
   docker-compose down
   ```

---

## Option 2: Local Development (Manual Setup)

### Requirements
- Node.js 20+ (download: https://nodejs.org)
- PostgreSQL 16+ (https://www.postgresql.org/download)
- npm 10+ (comes with Node.js)

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database**
   
   Create `.env` file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/library_db
   JWT_SECRET=your_secret_key
   ```

4. **Create database**
   ```bash
   # Open PostgreSQL terminal
   psql -U postgres
   
   # Run in PostgreSQL:
   CREATE DATABASE library_db;
   ```

5. **Run migrations**
   ```bash
   npm run migrate
   ```

6. **Start server**
   ```bash
   npm run dev
   ```

   Server ready at: http://localhost:5000

### Frontend Setup (New Terminal)

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API**
   
   Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend ready at: http://localhost:3000

---

## What You Can Do

### As a Member
- Register and log in
- View book catalog
- Search books by title, author, or ISBN
- Filter by genre and availability
- See book details and real-time stock

### As a Librarian
- All member features, plus:
- Add new books to catalog
- Edit book information
- Delete books
- View inventory reports
- See who added/modified books (audit log)

### As an Admin
- All librarian features, plus:
- Access admin dashboard
- View catalog statistics
- Manage users
- View detailed audit logs

---

## Demo Books to Add

Try adding these books as a Librarian:

**Book 1:**
- ISBN: 978-0-13-110362-7
- Title: The C Programming Language
- Author: Brian W. Kernighan & Dennis M. Ritchie
- Genre: Programming
- Year: 1988
- Description: The definitive guide to the C programming language
- Total Copies: 3

**Book 2:**
- ISBN: 978-0-201-63361-0
- Title: Design Patterns
- Author: Gang of Four
- Genre: Software Design
- Year: 1994
- Description: Elements of Reusable Object-Oriented Software
- Total Copies: 2

---

## Troubleshooting

### Port already in use?
```bash
# Kill the process using the port
lsof -i :3000   # Find process on port 3000
kill -9 <PID>   # Kill the process

# Or change port in vite.config.ts (frontend) or .env (backend)
```

### Cannot connect to database?
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Or for Docker:
docker-compose logs postgres
```

### API returns 401 Unauthorized?
- Token expired: Log out and log back in
- Missing token: Check localStorage in browser console
- Wrong credentials: Use demo credentials above

### Can't see changes in frontend?
- Clear browser cache: Ctrl+Shift+Delete
- Restart dev server: Ctrl+C then npm run dev

---

## File Structure

```
library-management-system/
├── backend/               ← Node.js + Express API
│   ├── src/
│   │   ├── models/       (User, Book)
│   │   ├── services/     (Auth, Book business logic)
│   │   ├── routes/       (API endpoints)
│   │   └── database/     (Migrations)
│   └── package.json
├── frontend/              ← React + TypeScript
│   ├── src/
│   │   ├── pages/        (Login, Books)
│   │   ├── components/   (UI components)
│   │   └── services/     (API calls)
│   └── package.json
├── docs/
│   ├── API.md            (All endpoints)
│   └── SETUP.md          (Advanced setup)
└── docker-compose.yml    (Docker config)
```

---

## API Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "member@test.com",
    "password": "Password123"
  }'
```

### Get Books
```bash
curl -X GET http://localhost:5000/api/books \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Search Books
```bash
curl -X GET "http://localhost:5000/api/books/search?q=programming" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

See [docs/API.md](docs/API.md) for complete API documentation.

---

## Next Steps

1. **Explore the app** - Add books, search, filter
2. **Read the code** - Check `backend/src/` and `frontend/src/`
3. **Understand the flow** - Trace a book creation from frontend to database
4. **Run tests** - `npm run test` in backend or frontend
5. **Build Phase 2** - Borrowing and returning books

---

## Getting Help

- **API Documentation**: See [docs/API.md](docs/API.md)
- **Setup Guide**: See [docs/SETUP.md](docs/SETUP.md)
- **Project Specification**: See [PROJECT_SPEC.md](PROJECT_SPEC.md)
- **Full Requirements**: See [PRD.md](PRD.md)
- **Implementation Plan**: See [.planning/phases/phase-1/PLAN.md](.planning/phases/phase-1/PLAN.md)

---

## Architecture Overview

```
Browser (React UI)
    ↓ (HTTP/JSON)
Vite Dev Server (:3000)
    ↓ (Proxied)
Node.js Express API (:5000)
    ↓ (SQL)
PostgreSQL Database (:5432)
```

**Authentication Flow:**
1. User enters credentials in React form
2. Frontend calls `/api/auth/login`
3. Backend validates password + generates JWT token
4. Frontend stores token in localStorage
5. Frontend includes token in all API requests
6. Backend validates token in middleware
7. Request allowed if token valid

---

Happy coding! 🚀
