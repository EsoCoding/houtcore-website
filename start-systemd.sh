#!/usr/bin/env bash

# NVM + common user bins so npm/uv are found
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"

# Kill existing processes
pkill -f "python.*manage.py.*runserver" 2>/dev/null || true
pkill -f "node.*next" 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 8000/tcp 2>/dev/null || true

# Wait for ports to be free
sleep 2

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Starting Houtcore services..."

# Start Django backend
cd "$DIR/backend"
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000 &
DJANGO_PID=$!

# Wait for Django to start
echo "Waiting for Django to start..."
sleep 5

# Check if Django is running
if ! curl -s http://localhost:8000/api/ > /dev/null 2>&1; then
    echo "Warning: Django backend might not be ready yet"
fi

# Start Next.js frontend
cd "$DIR"
npm run dev &
NEXTJS_PID=$!

echo "Services started:"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "Admin:    http://localhost:8000/admin"

# Function to cleanup on exit
cleanup() {
    echo "Stopping services..."
    kill $DJANGO_PID 2>/dev/null || true
    kill $NEXTJS_PID 2>/dev/null || true
}

trap cleanup EXIT

wait
