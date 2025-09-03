#!/bin/bash

# Houtcore Website Startup Script
# Starts both Django backend and Next.js frontend services
# Can be used for development or production deployment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT"

echo -e "${BLUE}🚀 Starting Houtcore Website Services...${NC}"

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}⚠️  Port $port is in use. Killing existing process...${NC}"
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    sleep 2
}

# Check and kill existing processes
if check_port 8000; then
    kill_port 8000
fi

if check_port 3000; then
    kill_port 3000
fi

echo -e "${BLUE}📁 Project directory: $PROJECT_ROOT${NC}"

# Start Django Backend
echo -e "${GREEN}🐍 Starting Django Backend...${NC}"
cd "$BACKEND_DIR"

# Check if uv is available, otherwise use traditional venv
if command -v uv &> /dev/null; then
    echo -e "${BLUE}📦 Using uv for backend...${NC}"
    
    # Install dependencies if needed
    if [ ! -f "uv.lock" ]; then
        echo -e "${YELLOW}📥 Installing backend dependencies...${NC}"
        uv sync
    fi
    
    # Run migrations
    echo -e "${BLUE}🗄️  Running database migrations...${NC}"
    uv run python manage.py migrate --run-syncdb
    
    # Start Django server in background
    echo -e "${GREEN}🚀 Starting Django server on port 8000...${NC}"
    uv run python manage.py runserver 0.0.0.0:8000 &
    DJANGO_PID=$!
    
else
    echo -e "${BLUE}📦 Using traditional venv for backend...${NC}"
    
    # Create virtual environment if it doesn't exist
    if [ ! -d ".venv" ]; then
        echo -e "${YELLOW}🔨 Creating virtual environment...${NC}"
        python3 -m venv .venv
    fi
    
    # Activate virtual environment
    source .venv/bin/activate
    
    # Install dependencies
    echo -e "${YELLOW}📥 Installing backend dependencies...${NC}"
    pip install -r requirements.txt
    
    # Run migrations
    echo -e "${BLUE}🗄️  Running database migrations...${NC}"
    python manage.py migrate --run-syncdb
    
    # Start Django server in background
    echo -e "${GREEN}🚀 Starting Django server on port 8000...${NC}"
    python manage.py runserver 0.0.0.0:8000 &
    DJANGO_PID=$!
fi

# Wait a moment for Django to start
sleep 3

# Start Next.js Frontend
echo -e "${GREEN}⚛️  Starting Next.js Frontend...${NC}"
cd "$FRONTEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📥 Installing frontend dependencies...${NC}"
    npm install
fi

# Build if needed (for production)
if [ "$1" = "production" ]; then
    echo -e "${BLUE}🏗️  Building frontend for production...${NC}"
    npm run build
    echo -e "${GREEN}🚀 Starting production server on port 3000...${NC}"
    npm start &
else
    echo -e "${GREEN}🚀 Starting development server on port 3000...${NC}"
    npm run dev &
fi

NEXTJS_PID=$!

# Wait a moment for Next.js to start
sleep 5

echo -e "${GREEN}✅ Houtcore Website Services Started Successfully!${NC}"
echo -e "${BLUE}📊 Service Status:${NC}"
echo -e "  🐍 Django Backend:  http://localhost:8000 (PID: $DJANGO_PID)"
echo -e "  ⚛️  Next.js Frontend: http://localhost:3000 (PID: $NEXTJS_PID)"
echo -e "  🔧 Admin Panel:     http://localhost:8000/admin/"
echo -e "  📡 API Endpoints:   http://localhost:8000/api/"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "  • Press Ctrl+C to stop all services"
echo -e "  • Run with 'production' argument for production mode"
echo -e "  • Check logs in case of issues"
echo ""

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping services...${NC}"
    kill $DJANGO_PID 2>/dev/null || true
    kill $NEXTJS_PID 2>/dev/null || true
    echo -e "${GREEN}✅ All services stopped.${NC}"
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Wait for user interrupt
echo -e "${BLUE}🔄 Services running... Press Ctrl+C to stop.${NC}"
wait
