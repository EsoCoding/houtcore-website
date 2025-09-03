#!/bin/bash

# Houtcore Backend Deployment Script
# This script sets up the Django backend with all dependencies, database, and sample data

set -e  # Exit on any error

echo "🚀 Starting Houtcore Backend Deployment..."

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "❌ uv is not installed. Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    source ~/.bashrc
fi

echo "📦 Installing Python dependencies..."
uv sync

echo "🗄️  Setting up database..."
uv run python manage.py makemigrations
uv run python manage.py migrate

echo "👤 Creating superuser (optional - will prompt for credentials)..."
read -p "Do you want to create a superuser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    uv run python manage.py createsuperuser
fi

echo "📊 Loading sample data..."
echo "Creating sample content..."
uv run python manage.py create_sample_content

echo "Creating sample portfolio items..."
uv run python manage.py create_sample_portfolio

echo "Creating sample process steps..."
uv run python manage.py create_sample_process

echo "Creating sample contact information..."
uv run python manage.py create_sample_contact

echo "📁 Collecting static files..."
uv run python manage.py collectstatic --noinput

echo "🎨 Checking static files configuration..."
uv run python manage.py findstatic admin/css/base.css --verbosity=2

echo "🔧 Running system check..."
uv run python manage.py check

echo "✅ Deployment complete!"
echo ""
echo "🎉 Your Houtcore backend is ready!"
echo ""
echo "To start the development server:"
echo "  uv run python manage.py runserver"
echo ""
echo "To start with gunicorn (production):"
echo "  uv add gunicorn"
echo "  uv run gunicorn houtcore.wsgi:application --bind 0.0.0.0:8000"
echo ""
echo "Admin panel: http://localhost:8000/admin/"
echo "API endpoint: http://localhost:8000/api/"
