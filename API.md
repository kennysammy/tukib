# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": "default-avatar.png"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Get Current User
**GET** `/auth/me`

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "favoriteBooks": [],
    "readingHistory": [],
    "downloads": []
  }
}
```

### Update Profile
**PUT** `/auth/profile`

**Headers:** Authorization required

**Body:**
```json
{
  "name": "John Doe Updated",
  "avatar": "new-avatar-url"
}
```

---

## Books Endpoints

### Get All Books
**GET** `/books`

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 12)
- `search` - Search in title, author, description
- `category` - Filter by category ID
- `author` - Filter by author name
- `featured` - Filter featured books (true/false)
- `sort` - Sort fields (e.g., "createdAt", "-ratings.average")

**Response:**
```json
{
  "success": true,
  "count": 12,
  "total": 100,
  "pages": 9,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description",
      "category": { "name": "Fiction", "color": "#3B82F6" },
      "coverImage": "image-url",
      "ratings": { "average": 4.5, "count": 10 },
      "downloads": 100,
      "views": 500
    }
  ]
}
```

### Get Single Book
**GET** `/books/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book description",
    "isbn": "1234567890",
    "category": { "name": "Fiction", "color": "#3B82F6" },
    "coverImage": "image-url",
    "fileUrl": "file-url",
    "fileFormat": "PDF",
    "fileSize": 1024000,
    "language": "English",
    "publisher": "Publisher Name",
    "publishedDate": "2023-01-01",
    "pages": 300,
    "ratings": { "average": 4.5, "count": 10 },
    "reviews": [
      {
        "user": { "name": "User", "avatar": "avatar-url" },
        "rating": 5,
        "comment": "Great book!",
        "createdAt": "2023-01-01"
      }
    ],
    "downloads": 100,
    "views": 501,
    "isFeatured": false,
    "tags": ["fiction", "adventure"]
  }
}
```

### Create Book (Admin Only)
**POST** `/books`

**Headers:** Authorization required (Admin role)

**Body:**
```json
{
  "title": "New Book",
  "author": "Author Name",
  "description": "Description",
  "category": "category_id",
  "coverImage": "image-url",
  "fileUrl": "file-url",
  "fileFormat": "PDF",
  "fileSize": 1024000,
  "language": "English",
  "publisher": "Publisher",
  "publishedDate": "2023-01-01",
  "pages": 300,
  "tags": ["fiction"]
}
```

### Update Book (Admin Only)
**PUT** `/books/:id`

**Headers:** Authorization required (Admin role)

**Body:** Same as Create Book

### Delete Book (Admin Only)
**DELETE** `/books/:id`

**Headers:** Authorization required (Admin role)

### Add Review
**POST** `/books/:id/reviews`

**Headers:** Authorization required

**Body:**
```json
{
  "rating": 5,
  "comment": "Excellent book!"
}
```

### Download Book
**GET** `/books/:id/download`

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "fileUrl": "download-url",
    "fileName": "book-title.pdf"
  }
}
```

### Get Related Books
**GET** `/books/:id/related`

**Response:** Array of books in the same category

---

## Categories Endpoints

### Get All Categories
**GET** `/categories`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Fiction",
      "slug": "fiction",
      "description": "Fiction books",
      "icon": "book",
      "color": "#3B82F6",
      "booksCount": 50
    }
  ]
}
```

### Get Single Category
**GET** `/categories/:id`

### Create Category (Admin Only)
**POST** `/categories`

**Headers:** Authorization required (Admin role)

**Body:**
```json
{
  "name": "Science Fiction",
  "description": "Sci-fi books",
  "icon": "rocket",
  "color": "#10B981"
}
```

### Update Category (Admin Only)
**PUT** `/categories/:id`

**Headers:** Authorization required (Admin role)

### Delete Category (Admin Only)
**DELETE** `/categories/:id`

**Headers:** Authorization required (Admin role)

---

## Users Endpoints (Admin Only)

### Get All Users
**GET** `/users`

**Headers:** Authorization required (Admin role)

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)

### Get Single User
**GET** `/users/:id`

**Headers:** Authorization required (Admin role)

### Update User
**PUT** `/users/:id`

**Headers:** Authorization required (Admin role)

### Delete User
**DELETE** `/users/:id`

**Headers:** Authorization required (Admin role)

---

## User Actions (Protected)

### Add to Favorites
**POST** `/users/favorites/:bookId`

**Headers:** Authorization required

### Remove from Favorites
**DELETE** `/users/favorites/:bookId`

**Headers:** Authorization required

### Update Reading Progress
**PUT** `/users/reading-history/:bookId`

**Headers:** Authorization required

**Body:**
```json
{
  "progress": 50
}
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API endpoints are rate-limited to 100 requests per 15 minutes per IP address.
