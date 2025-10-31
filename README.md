"# eBook Content Management System (CMS)

A modern, responsive eBook Content Management System built with Next.js, React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend Features
- **Modern & Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark/Light Theme Support**: Built-in theme switching with persistent preferences
- **Smooth Animations**: Powered by Framer Motion for delightful user experience
- **Home Page**:
  - Hero section with featured eBooks
  - Categories/Genres navigation
  - Latest releases showcase
  - Popular eBooks section
  - Advanced search functionality
  
- **Book Details Page**:
  - High-quality book cover display
  - Comprehensive book information
  - Download/Read options
  - Related books recommendations
  - Reviews and ratings system

- **User Dashboard**:
  - Saved/Favorite books management
  - Reading history tracking
  - User profile management
  - Download history

- **Admin Dashboard**:
  - Complete book management (Add/Edit/Delete)
  - Category management
  - eBook file uploads (PDF, EPUB, MOBI)
  - Book metadata management
  - User management with roles
  - Analytics and reports

### Backend Features
- **RESTful API**: Clean and well-documented endpoints
- **Authentication & Authorization**: JWT-based secure authentication
- **File Management**: Cloud storage integration for eBook files
- **Search Functionality**: Powerful search and filtering capabilities
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive validation and sanitization
- **Error Handling**: Robust error handling and logging

### Security Features
- XSS Protection
- CSRF Protection
- Input Validation & Sanitization
- Secure Password Hashing (bcrypt)
- JWT Token Authentication
- Helmet.js for HTTP headers security
- MongoDB Injection Prevention

### Performance Optimizations
- Server-Side Rendering (SSR) with Next.js
- Code Splitting
- Lazy Loading
- Responsive Image Optimization
- Efficient State Management with Redux Toolkit

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v5.0 or higher)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kennysammy/tukib.git
cd tukib
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration:
# - MongoDB connection string
# - JWT secret
# - Cloudinary credentials (for file storage)
# - Other environment variables

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Update .env.local with:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
tukib/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── layout/   # Layout components
│   │   │   ├── books/    # Book-related components
│   │   │   ├── common/   # Shared components
│   │   │   └── admin/    # Admin components
│   │   ├── pages/        # Next.js pages
│   │   ├── store/        # Redux store & slices
│   │   ├── lib/          # API and utilities
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   └── package.json
│
└── README.md
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ebook-cms
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚦 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Books Endpoints

- `GET /api/books` - Get all books (with filtering & pagination)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)
- `POST /api/books/:id/reviews` - Add review (Protected)
- `GET /api/books/:id/download` - Download book (Protected)
- `GET /api/books/:id/related` - Get related books

### Categories Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Users Endpoints

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `POST /api/users/favorites/:bookId` - Add to favorites (Protected)
- `DELETE /api/users/favorites/:bookId` - Remove from favorites (Protected)
- `PUT /api/users/reading-history/:bookId` - Update reading progress (Protected)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, CORS, express-mongo-sanitize

## 🔐 Security Best Practices

- All passwords are hashed using bcrypt
- JWT tokens for authentication
- HTTP-only cookies for token storage
- Input validation and sanitization
- Rate limiting on API endpoints
- XSS and CSRF protection
- Secure HTTP headers with Helmet
- MongoDB injection prevention

## 🌟 Default Admin Account

To create an admin account, you'll need to manually set the role in the database or modify the registration endpoint temporarily.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Kenny Sammy

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React community for excellent tools and libraries
- MongoDB for the flexible database solution
- All contributors and testers

## 📧 Support

For support, email support@ebookcms.com or open an issue in the repository.

---

Made with ❤️ using Next.js, React, Node.js, Express, and MongoDB" 
