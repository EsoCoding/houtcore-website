# Houtcore Website - Django Backend

This is the backend component for the Houtcore website, providing API endpoints for the Next.js frontend.

## Setup Instructions

1. **Virtual Environment**:

   The backend uses a Python virtual environment with UV. It's already set up in the `.venv` directory.

   Activate it with:
   ```bash
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install Dependencies**:

   If you need to reinstall dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```

3. **Database Migrations**:

   Apply database migrations with:
   ```bash
   python manage.py migrate
   ```

4. **Create Admin User**:

   Create a superuser for the admin panel:
   ```bash
   python manage.py createsuperuser
   ```

5. **Run Development Server**:

   Start the development server:
   ```bash
   python manage.py runserver
   ```

   The admin panel will be available at http://localhost:8000/admin/
   API endpoints will be available at http://localhost:8000/api/

## API Endpoints

- **Portfolio Items**: `/api/portfolio/`
- **Categories**: `/api/categories/`
- **About Section**: `/api/about/`
- **Services**: `/api/services/`
- **Contact Information**: `/api/contact/info/`
- **Contact Form Submission**: `/api/contact/submit/` (POST)

## Models

### Portfolio
- **Category**: Portfolio item categories
- **PortfolioItem**: Projects and work examples

### Content
- **AboutSection**: About section content with rich text
- **ServiceItem**: Services offered

### Contact
- **ContactInfo**: Contact information (email, phone, etc.)
- **ContactSubmission**: Form submissions from website visitors

## Environment Variables

For production, create a `.env` file with:

```
DEBUG=False
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://frontend-domain.com
EMAIL_HOST=smtp.your_email_provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@domain.com
EMAIL_HOST_PASSWORD=your_email_password
ADMIN_EMAIL=admin@yourdomain.com
```
