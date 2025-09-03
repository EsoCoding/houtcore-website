#!/bin/bash

# Simple Houtcore Website Startup Script

# Kill any existing processes on ports 3000 and 8000
pkill -f "python.*manage.py.*runserver" 2>/dev/null || true
pkill -f "node.*next" 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 8000/tcp 2>/dev/null || true

# Get script directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Houtcore services..."

# Start Django backend
cd "$DIR/backend"
if command -v uv &> /dev/null; then
    uv run python manage.py runserver 0.0.0.0:8000 &
else
    source .venv/bin/activate
    python manage.py runserver 0.0.0.0:8000 &
fi

# Start Next.js frontend
cd "$DIR"
npm run build
npm run start &

echo "Services started:"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "Admin:    http://localhost:8000/admin"

# Keep script running
wait
