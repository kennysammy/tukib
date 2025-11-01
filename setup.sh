#!/bin/bash

# eBook CMS Setup Script
# This script helps set up the development environment

echo "🚀 Setting up eBook CMS..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found. Please ensure MongoDB is installed and running."
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
if [ -f "package.json" ]; then
    npm install
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend package.json not found"
    exit 1
fi

# Create .env file from example
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file from .env.example"
        echo "⚠️  Please update the .env file with your configuration"
    fi
fi

cd ..

echo ""
echo "📦 Installing Frontend Dependencies..."
cd frontend
if [ -f "package.json" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend package.json not found"
    exit 1
fi

# Create .env.local file from example
if [ ! -f ".env.local" ]; then
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        echo "✅ Created .env.local file from .env.local.example"
    fi
fi

cd ..

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with your MongoDB URI and other settings"
echo "2. Update frontend/.env.local if needed"
echo "3. Start MongoDB if it's not running"
echo "4. Run 'cd backend && npm run dev' to start the backend"
echo "5. Run 'cd frontend && npm run dev' to start the frontend"
echo ""
echo "🎉 Happy coding!"
