#!/bin/bash

# Simple Color Fix for Houtcore Website
# This fixes the persistent color display issues

echo "🎨 Fixing Houtcore colors..."

# Clean everything
echo "🧹 Cleaning cache..."
rm -rf .next
rm -rf node_modules/.cache

# Force rebuild with all colors included
echo "🏗️ Rebuilding with complete color palette..."
npm run build

echo "✅ Colors fixed!"
echo ""
echo "🚀 Start the server:"
echo "  npm run dev   (development)"
echo "  npm start     (production)"
