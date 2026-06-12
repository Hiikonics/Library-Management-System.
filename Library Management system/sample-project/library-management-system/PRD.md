# Product Requirements Document (PRD)
## Library Management System - Phase 1: Book Catalog Management

## 1. Background
Libraries are fundamental to communities, providing access to knowledge and information. Modern libraries need digital systems to manage their growing collections efficiently. A centralized catalog system enables librarians to maintain accurate records and allows patrons to discover books easily. This project addresses the need for a scalable, user-friendly library management platform.

## 2. Problem Statement
- **Current Pain Points:**
  - Manual book cataloging is time-consuming and error-prone
  - Staff spend significant time answering "Do we have this book?" queries
  - Members cannot self-serve search for books, requiring staff assistance
  - No centralized view of inventory across multiple physical locations (if applicable)
  - Book metadata is often incomplete or inconsistent

## 3. User Personas

### Persona 1: Sarah (Head Librarian)
- **Goals:**
  - Efficiently add and manage book records
  - Ensure accurate inventory tracking
  - Provide staff with tools to answer member queries quickly
  - Generate reports on collection composition
- **Pain points:**
  - Currently maintains spreadsheets prone to errors
  - Time spent on manual data entry
  - Difficulty tracking which staff member entered book data
- **Needs:**
  - Bulk import capability, validation on entry, audit trails for data changes

### Persona 2: James (Library Member)
- **Goals:**
  - Find specific books quickly
  - Discover books in favorite genres
  - Check if a book is available before visiting
  - Save books for later reference
- **Pain points:**
  - Relies on asking staff for book recommendations
  - Cannot check availability remotely
  - Difficulty remembering book titles or authors
- **Needs:**
  - Advanced search filters, real-time availability, mobile access

### Persona 3: Robert (Library Admin)
- **Goals:**
  - Oversee all library operations
  - Manage user permissions
  - Monitor system performance and usage
  - Ensure data security and compliance
- **Pain points:**
  - Limited visibility into catalog quality
  - Cannot quickly grant/revoke staff access
  - No audit logs for compliance
- **Needs:**
  - Admin dashboard, user management, system logs, data integrity checks

## 4. User Stories

### Book Catalog Entry
- As a **librarian**, I want to **add a new book to the catalog**, so that **members can discover and check out the book**
- As a **librarian**, I want to **enter ISBN and auto-fetch book metadata**, so that **I save time and reduce data entry errors**
- As a **librarian**, I want to **update book information**, so that **catalog stays current with inventory changes**
- As a **librarian**, I want to **mark books as lost, damaged, or under repair**, so that **members don't search for unavailable books**

### Search and Discovery
- As a **member**, I want to **search books by title, author, ISBN**, so that **I can quickly find the books I'm looking for**
- As a **member**, I want to **filter by genre, publication year**, so that **I discover books matching my interests**
- As a **member**, I want to **see real-time availability**, so that **I don't waste time looking for checked-out books**
- As a **member**, I want to **access the catalog from mobile**, so that **I can search while browsing in the library**

### Inventory Management
- As a **librarian**, I want to **view total copies and availability per book**, so that **I know how many physical copies we have**
- As a **librarian**, I want to **set location/shelf information for books**, so that **staff can quickly locate books in the library**
- As a **librarian**, I want to **track book condition (good, fair, poor)**, so that **I prioritize maintenance and replacements**

### Admin and Reporting
- As an **admin**, I want to **view catalog statistics (total books, genres, authors)**, so that **I understand collection composition**
- As an **admin**, I want to **manage librarian and member accounts**, so that **only authorized users can access the system**
- As an **admin**, I want to **view audit logs**, so that **I ensure data integrity and accountability**

## 5. Functional Requirements

### Authentication & Authorization
- **F01:** User registration (email, password, role selection)
- **F02:** User login with secure password hashing
- **F03:** Role-based access control (Member, Librarian, Admin)
- **F04:** Password reset functionality

### Book Catalog Management
- **F05:** Add book with: ISBN, title, author, genre, publication date, description, cover image URL
- **F06:** Edit existing book metadata
- **F07:** Delete book record (soft delete with archive)
- **F08:** Bulk import books (CSV/spreadsheet)
- **F09:** ISBN validation and optional auto-fetch from external API
- **F10:** Track book quantity (total copies, available copies)
- **F11:** Mark book condition (good, fair, poor, lost, damaged)
- **F12:** Set book location/shelf information

### Search & Discovery
- **F13:** Full-text search by title, author, ISBN, genre
- **F14:** Filter by genre, publication year, condition, availability
- **F15:** Sort results (relevance, title, author, date added)
- **F16:** Display book details: metadata, cover, description, availability
- **F17:** Pagination of search results (20 per page default)

### Inventory & Reporting
- **F18:** Dashboard showing catalog statistics (total books, genres, availability rate)
- **F19:** Inventory report: books by genre, availability status, condition
- **F20:** Recently added books view
- **F21:** Track who added/modified each book entry (audit log)

## 6. Non-Functional Requirements

- **NF01:** Performance — Search results return within 1 second for 10,000+ book catalog
- **NF02:** Security — All passwords hashed with bcrypt or similar; HTTPS only; SQL injection prevention
- **NF03:** Scalability — Database indexed on frequently searched fields (title, author, ISBN)
- **NF04:** Accessibility — WCAG 2.1 Level A compliance; keyboard navigation; screen reader support
- **NF05:** Maintainability — Code documented, unit tests for critical paths (target 70%+ coverage)
- **NF06:** Responsive Design — Works on screens from 320px (mobile) to 2560px (desktop)
- **NF07:** Data Integrity — Referential integrity maintained; transaction support for bulk operations
- **NF08:** Availability — 99% uptime SLA for backend API

## 7. Data Entities

### Book
Key fields:
- `id` (UUID)
- `isbn` (string, unique)
- `title` (string)
- `author` (string)
- `genre` (string / foreign key to Genre table)
- `publication_date` (date)
- `description` (text)
- `cover_image_url` (string)
- `total_copies` (integer)
- `available_copies` (integer)
- `condition` (enum: good, fair, poor, lost, damaged)
- `location_shelf` (string)
- `created_by` (foreign key to User)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### User
Key fields:
- `id` (UUID)
- `email` (string, unique)
- `password_hash` (string)
- `name` (string)
- `role` (enum: member, librarian, admin)
- `is_active` (boolean)
- `created_at` (timestamp)

### Genre
Key fields:
- `id` (UUID)
- `name` (string, unique)
- `description` (text)

## 8. Permission Matrix

| Action | Member | Librarian | Admin |
|--------|:------:|:---------:|:-----:|
| Login | ✅ | ✅ | ✅ |
| Search & view books | ✅ | ✅ | ✅ |
| Add book | ❌ | ✅ | ✅ |
| Edit book | ❌ | ✅ | ✅ |
| Delete book | ❌ | ✅ | ✅ |
| Bulk import | ❌ | ✅ | ✅ |
| View dashboard | ❌ | ✅ | ✅ |
| View reports | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| View audit logs | ❌ | ❌ | ✅ |
| System settings | ❌ | ❌ | ✅ |

## 9. Acceptance Criteria

### F05 — Add book with metadata
- [ ] Librarian can enter all required book fields (ISBN, title, author, genre, date, description)
- [ ] ISBN validation rejects invalid formats
- [ ] Cover image URL is validated (optional field)
- [ ] Book is saved to database and appears in search results
- [ ] Confirmation message shown on successful save

### F06 — Edit existing book metadata
- [ ] Librarian can update any book field
- [ ] Changes are saved with updated_at timestamp
- [ ] Audit log records who made changes and when
- [ ] Previous version is retained in audit trail

### F13 — Full-text search
- [ ] Search by title returns matching books (case-insensitive)
- [ ] Search by author returns all books by that author
- [ ] Search by ISBN returns exact match if exists
- [ ] Search by genre filters results correctly
- [ ] Results are paginated (20 per page)
- [ ] Search is case-insensitive and handles partial matches

### F14 — Filter by genre and availability
- [ ] Users can select one or multiple genres
- [ ] Users can filter by "Available" vs "All"
- [ ] Filters apply correctly to search results
- [ ] Filtered results count is displayed

### F16 — Display book details
- [ ] Book details page shows all metadata
- [ ] Cover image loads correctly
- [ ] Availability status clearly displayed
- [ ] Page is responsive on mobile devices

### F20 — Recently added books
- [ ] Dashboard shows last 10 books added
- [ ] Sorted by created_at descending
- [ ] Each entry shows title, author, addition date

## 10. MVP Scope

Included in MVP (Phase 1):
- Book catalog entry and management
- Search and filtering
- User authentication (basic)
- Role-based access (Member, Librarian, Admin)
- Admin dashboard with basic statistics
- Inventory view and status tracking

## 11. Future Scope

Not included in MVP (Future Phases):
- Borrowing and returning workflow
- Loan history and member reservations
- Advanced analytics and reporting
- Member reviews and ratings
- Book recommendations engine
- Multi-branch library support
- Barcode scanning integration
- Email notifications
- Payment integration (for library fines)
- Integration with library systems (ILS) like Koha
- Mobile app (native iOS/Android)

## 12. Open Questions

- Should we support ISBN auto-fetch from OpenLibrary API or Google Books API in Phase 1, or keep it manual?
- Do we need multi-language support from the start?
- Should we support multiple physical library locations/branches in Phase 1?
- What's the expected initial catalog size and growth rate?
- Should librarians be able to import member lists from external sources?
