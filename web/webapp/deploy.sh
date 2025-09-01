#!/bin/bash

# Sky CASA Web Application Deployment Script

echo "🚀 Starting Sky CASA Web Application deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run linting
echo "🔍 Running code linting..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found, but continuing with build..."
fi

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build directory 'dist' not found"
    exit 1
fi

echo "📁 Build artifacts created in 'dist' directory"

# Display build information
echo ""
echo "🎉 Sky CASA Web Application deployed successfully!"
echo ""
echo "📊 Build Summary:"
echo "  - Build directory: ./dist/"
echo "  - Entry point: ./dist/index.html"
echo "  - Assets: ./dist/assets/"
echo ""
echo "🌐 To preview the production build:"
echo "  npm run preview"
echo ""
echo "📤 To deploy to a static hosting service:"
echo "  - Upload the contents of the 'dist' directory"
echo "  - Configure your web server to serve index.html for all routes"
echo "  - Ensure HTTPS is enabled for security"
echo ""
echo "🔗 Recommended hosting platforms:"
echo "  - Netlify: https://netlify.com"
echo "  - Vercel: https://vercel.com"
echo "  - GitHub Pages: https://pages.github.com"
echo "  - AWS S3 + CloudFront"
echo ""
echo "✨ Deployment complete!"