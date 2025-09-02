# Houtcore Backend Deployment Guide

This guide covers how to deploy the Houtcore Django backend to a new server with all dependencies, database setup, and sample data.

## Quick Deployment (Recommended)

### Using the automated deployment script:

```bash
git clone <your-repo-url>
cd houtcore-website/backend
./deploy.sh
```

This script will:
- ✅ Install uv (if not present)
- ✅ Install all Python dependencies
- ✅ Set up the database with migrations
- ✅ Optionally create a superuser
- ✅ Load all sample data (content, portfolio, process steps, contact info)
- ✅ Collect static files
- ✅ Provide instructions for running the server

## Manual Deployment Steps

If you prefer to deploy manually or need more control:

### 1. Prerequisites

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
```

### 2. Clone and Setup

```bash
git clone <your-repo-url>
cd houtcore-website/backend
```

### 3. Install Dependencies

```bash
uv sync  # Install exact versions from uv.lock
```

### 4. Database Setup

```bash
uv run python manage.py makemigrations
uv run python manage.py migrate
```

### 5. Create Superuser (Optional)

```bash
uv run python manage.py createsuperuser
```

### 6. Load Sample Data

```bash
# Load sample content (about section, etc.)
uv run python manage.py create_sample_content

# Load sample portfolio items
uv run python manage.py create_sample_portfolio

# Load sample process steps
uv run python manage.py create_sample_process

# Load sample contact information
uv run python manage.py create_sample_contact
```

### 7. Collect Static Files

```bash
uv run python manage.py collectstatic --noinput
```

### 8. Run the Server

**Development:**
```bash
uv run python manage.py runserver 0.0.0.0:8000
```

**Production:**
```bash
uv add gunicorn
uv run gunicorn houtcore.wsgi:application --bind 0.0.0.0:8000
```

## What Gets Installed

### Dependencies (from pyproject.toml):
- Django 5.2.5
- Django REST Framework 3.16.1
- Django CORS Headers 4.7.0
- Pillow 11.3.0
- Django CKEditor 6.7.3

### Sample Data:
- **About Section**: Company information and images
- **Portfolio Items**: Sample woodworking projects with images
- **Process Steps**: Step-by-step workflow information
- **Contact Information**: Business contact details

### Database:
- SQLite database (db.sqlite3) with all tables and sample data
- Admin user (if created during setup)

## Environment Configuration

For production deployments, consider creating a `.env` file:

```bash
# .env
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:pass@localhost/dbname  # Optional: PostgreSQL
```

## Production Considerations

1. **Database**: Consider PostgreSQL for production
2. **Static Files**: Use a proper web server (nginx) for static files
3. **Security**: Set proper SECRET_KEY and ALLOWED_HOSTS
4. **Media Files**: Configure proper media file storage
5. **HTTPS**: Enable SSL/TLS certificates

## Troubleshooting

**uv not found:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
```

**Permission denied:**
```bash
chmod +x deploy.sh
```

**Port already in use:**
```bash
# Find and kill process using port 8000
lsof -ti:8000 | xargs kill -9
```

## API Endpoints

After deployment, your API will be available at:
- `http://localhost:8000/api/about/` - About section data
- `http://localhost:8000/api/portfolio/` - Portfolio items
- `http://localhost:8000/api/process/` - Process steps
- `http://localhost:8000/api/contact/info/` - Contact information
- `http://localhost:8000/admin/` - Django admin panel

## Support

If you encounter issues during deployment, check:
1. Python version (requires >=3.11)
2. Internet connection for package downloads
3. File permissions
4. Available disk space
