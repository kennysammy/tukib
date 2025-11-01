# Quick Start Guide - eBook CMS

Get your eBook CMS up and running in minutes!

## Prerequisites Checklist

- [ ] Node.js v16+ installed
- [ ] npm or yarn installed
- [ ] MongoDB installed and running
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## Quick Installation

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/kennysammy/tukib.git
cd tukib

# Run the automated setup script
chmod +x setup.sh
./setup.sh

# The script will:
# ✓ Install all dependencies
# ✓ Create environment files
# ✓ Guide you through configuration
```

### Option 2: Manual Setup

#### Step 1: Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ebook-cms
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Optional: Cloudinary for file storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Step 2: Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local
nano .env.local
```

**Frontend Environment:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Starting the Application

### Terminal 1: Start Backend

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

Expected output:
```
ready - started server on 0.0.0.0:3000
```

## Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## First Steps

### 1. Create Your First Admin Account

Since the default registration creates regular users, you'll need to manually create an admin account:

**Option A: MongoDB Command Line**
```bash
mongo ebook-cms
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Option B: MongoDB Compass (GUI)**
1. Connect to `mongodb://localhost:27017`
2. Open `ebook-cms` database
3. Select `users` collection
4. Find your user and edit the `role` field to `"admin"`

### 2. Create Categories

As an admin:
1. Go to http://localhost:3000/admin
2. Click "Manage Categories"
3. Add some categories:
   - Fiction
   - Non-Fiction
   - Science Fiction
   - Biography
   - Technology
   - etc.

### 3. Add Your First Book

1. From admin dashboard, click "Add Book"
2. Fill in the book details:
   - Title
   - Author
   - Description
   - Category
   - Cover Image URL
   - File URL (PDF/EPUB)
   - Other metadata
3. Click "Create Book"

### 4. Test User Features

Open an incognito window and:
1. Register as a regular user
2. Browse books
3. Search for books
4. View book details
5. Add to favorites
6. Download books
7. Write reviews

## Common Issues and Solutions

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # macOS

# Start MongoDB if not running
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Issue: Port Already in Use

**Solution:**
```bash
# Find process using port
lsof -i :3000  # or :5000

# Kill the process
kill -9 <PID>
```

### Issue: Dependencies Installation Errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Cannot Connect to Backend from Frontend

**Solutions:**
1. Ensure backend is running on port 5000
2. Check `.env.local` has correct API URL
3. Verify CORS is configured correctly in backend
4. Check browser console for CORS errors

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes are reflected immediately
- **Backend**: Using nodemon, server restarts on file changes

### API Testing

Use tools like:
- **Postman**: Import API collection
- **Thunder Client**: VS Code extension
- **curl**: Command line

Example:
```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Database Inspection

**MongoDB Compass** (GUI):
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Browse collections visually

**Command Line**:
```bash
mongo ebook-cms
db.books.find().pretty()
db.users.find().pretty()
db.categories.find().pretty()
```

## Project Structure Quick Reference

```
tukib/
├── backend/          # Node.js/Express API
│   ├── controllers/  # Business logic
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API routes
│   ├── middleware/  # Auth, validation
│   └── server.js    # Entry point
│
├── frontend/        # Next.js/React app
│   └── src/
│       ├── pages/      # Next.js pages
│       ├── components/ # React components
│       ├── store/      # Redux store
│       ├── lib/        # API client
│       └── styles/     # CSS
│
└── docs/            # Documentation
```

## Next Steps

After successful setup:

1. **Explore the UI**
   - Navigate through all pages
   - Test dark/light theme
   - Try search functionality

2. **Customize**
   - Update colors in `tailwind.config.js`
   - Modify homepage content
   - Add your branding

3. **Add Content**
   - Create more categories
   - Add books with real data
   - Upload cover images

4. **Deploy**
   - See deployment guide
   - Configure production environment
   - Set up database hosting

## Getting Help

- **Documentation**: Read the main README.md
- **API Docs**: Check API.md for endpoint details
- **Architecture**: See ARCHITECTURE.md for system design
- **Issues**: Report bugs on GitHub
- **Community**: Join discussions

## Useful Commands

```bash
# Backend
cd backend
npm run dev          # Start development server
npm start           # Start production server
npm test            # Run tests

# Frontend
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint

# Database
mongo ebook-cms                    # Connect to database
mongodump --db=ebook-cms          # Backup database
mongorestore --db=ebook-cms       # Restore database
```

## Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can view books page
- [ ] Admin dashboard accessible
- [ ] Categories created
- [ ] First book added
- [ ] Theme toggle works
- [ ] Search functionality works

🎉 **Congratulations!** Your eBook CMS is now up and running!

---

**Need more help?** Check out the full documentation in README.md or create an issue on GitHub.
