# Setup & Deployment Guide

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- 5GB free disk space

### 1. Clone and Navigate
```bash
cd sample-project/library-management-system
```

### 2. Setup Environment Variables
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Start All Services
```bash
docker-compose up
```

Wait for all services to be healthy. You should see:
```
✓ Server running on http://localhost:5000
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Database**: localhost:5432

### 5. Demo Credentials
```
Member:
  Email: member@test.com
  Password: Password123

Librarian:
  Email: librarian@test.com
  Password: Password123

Admin:
  Email: admin@test.com
  Password: Password123
```

---

## Local Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm 10+

### Backend Setup

#### 1. Install Dependencies
```bash
cd backend
npm install
```

#### 2. Configure Database
```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/library_db
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
API_PORT=5000
```

#### 3. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE library_db;
```

#### 4. Run Migrations
```bash
npm run migrate
```

#### 5. Start Development Server
```bash
npm run dev
```

Server will run on: `http://localhost:5000`

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Configure API URL
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

#### 3. Start Development Server
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

---

## Testing

### Backend Tests
```bash
cd backend
npm run test              # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### Frontend Tests
```bash
cd frontend
npm run test              # Run tests
npm run test:coverage    # Generate coverage report
```

---

## Building for Production

### Backend Build
```bash
cd backend
npm run build
npm start
```

### Frontend Build
```bash
cd frontend
npm run build
# Serve dist folder with your web server
```

---

## Database Management

### Backup Database
```bash
pg_dump -U postgres library_db > backup.sql
```

### Restore Database
```bash
psql -U postgres library_db < backup.sql
```

### Reset Database
```bash
# Drop existing database
psql -U postgres -c "DROP DATABASE library_db;"

# Create new database
psql -U postgres -c "CREATE DATABASE library_db;"

# Run migrations
npm run migrate
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend

# Kill process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Verify connection string in .env
# Format: postgresql://user:password@host:port/database
```

### Migration Failures
```bash
# Check database exists
psql -U postgres -l

# Manually check/clear migration state
psql -U postgres -d library_db -c "SELECT * FROM information_schema.tables;"
```

### CORS Issues
- Ensure backend `.env` has correct FRONTEND_URL
- Check `cors()` middleware is enabled in backend/src/index.ts
- Frontend `.env` should point to correct API URL

---

## Performance Optimization

### Database Indexes
Indexes are automatically created during migration. Check status:
```bash
psql -U postgres -d library_db -c "\d books"
```

### API Response Caching
- Search results are paginated (20 items default)
- Add Redis caching layer for frequently accessed data (future enhancement)

### Frontend Optimization
- Code splitting with React Router
- Lazy loading components
- Image optimization

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Set secure CORS origins
- [ ] Enable database authentication
- [ ] Implement rate limiting (future)
- [ ] Add request validation middleware
- [ ] Set up monitoring and logging (future)
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Deployment to Cloud

### AWS EC2
```bash
# SSH into instance
ssh -i key.pem ec2-user@your-instance

# Install dependencies
sudo yum install nodejs npm postgresql docker docker-compose

# Clone repo and setup
git clone <repo-url>
cd library-management-system
cp .env.example .env
docker-compose up -d
```

### Azure App Service
1. Create App Service Plan
2. Create Web App for Backend (Node.js 20 LTS)
3. Create Web App for Frontend
4. Create PostgreSQL Database
5. Set environment variables
6. Deploy via GitHub Actions

### Deployment Script Template
```bash
#!/bin/bash
set -e

echo "Pulling latest code..."
git pull origin main

echo "Building Docker images..."
docker-compose build

echo "Restarting services..."
docker-compose down
docker-compose up -d

echo "Running migrations..."
docker-compose exec backend npm run migrate

echo "Deployment complete!"
```

---

## Monitoring

### Log Files
```bash
# Backend logs
docker-compose logs backend -f

# Frontend logs
docker-compose logs frontend -f

# Database logs
docker-compose logs postgres -f
```

### Health Checks
```bash
# API health
curl http://localhost:5000/health

# Database connection
curl http://localhost:5000/api/books (requires auth)
```

---

## Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Review API docs: `docs/API.md`
3. Check database schema: `backend/src/database/migrate.ts`
4. Review environment variables: `.env` files

---

## Next Steps

- Add more test coverage
- Implement caching layer
- Add monitoring and alerts
- Set up CI/CD pipeline
- Implement Phase 2 features (borrowing, returns)
