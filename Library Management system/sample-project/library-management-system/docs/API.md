# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "name": "John Doe"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "member"
  },
  "token": "eyJhbGc..."
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "member"
  },
  "token": "eyJhbGc..."
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "member"
  }
}
```

---

## Book Endpoints

### Create Book (Librarian+)
```
POST /books
Authorization: Bearer {token}
Content-Type: application/json

{
  "isbn": "978-0-13-110362-7",
  "title": "The C Programming Language",
  "author": "Brian W. Kernighan",
  "genre_id": "uuid",
  "publication_date": "1988-04-01",
  "description": "...",
  "cover_url": "https://...",
  "total_copies": 5,
  "condition": "good",
  "location_shelf": "A-001"
}

Response: 201 Created
{
  "id": "uuid",
  "isbn": "978-0-13-110362-7",
  ...
}
```

### Get All Books
```
GET /books?genre_id=uuid&availability=in_stock&page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "books": [...],
  "total": 42
}
```

### Search Books
```
GET /books/search?q=programming&genre_id=uuid&availability=in_stock&page=1
Authorization: Bearer {token}

Response: 200 OK
{
  "books": [...],
  "total": 15
}
```

### Get Book by ID
```
GET /books/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "uuid",
  "isbn": "...",
  ...
}
```

### Update Book (Librarian+)
```
PUT /books/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Title",
  "available_copies": 3,
  ...
}

Response: 200 OK
{...}
```

### Delete Book (Librarian+)
```
DELETE /books/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Book deleted successfully"
}
```

### Get Genres
```
GET /books/genres/list
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "uuid",
    "name": "Science Fiction",
    "description": "..."
  },
  ...
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Descriptive error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied. Insufficient permissions."
}
```

### 404 Not Found
```json
{
  "error": "Book not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Query Parameters

### Books Filters
- `genre_id` (uuid) - Filter by genre
- `condition` (string) - good | fair | poor | lost | damaged
- `availability` (string) - in_stock | all
- `year_from` (number) - Publication year from
- `year_to` (number) - Publication year to
- `page` (number) - Default: 1
- `limit` (number) - Default: 20

### Search
- `q` (string, required) - Search query
- `genre_id` (uuid) - Filter by genre
- `availability` (string) - in_stock | all
- `page` (number) - Default: 1
- `limit` (number) - Default: 20

---

## Demo Credentials

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
