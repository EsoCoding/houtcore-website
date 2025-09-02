# Houtcore Website - Next.js and Django Integration

This document provides instructions for setting up and using the integrated Next.js frontend and Django backend system for the Houtcore website.

## Project Structure

The project is organized into two main parts:

```
houtcore-website/
├── frontend/           # Next.js application (root directory)
├── backend/            # Django application
│   ├── houtcore/       # Django project settings
│   ├── content/        # App for content management
│   ├── portfolio/      # App for portfolio items
│   ├── contact/        # App for contact form handling
│   ├── media/          # For uploaded images
│   └── .venv/          # Python virtual environment
└── .env.local          # Environment variables for Next.js
```

## Getting Started

### Backend (Django)

1. **Activate the virtual environment**:

   ```bash
   cd backend
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Start the Django development server**:

   ```bash
   python manage.py runserver
   ```

   The Django admin interface will be available at http://localhost:8000/admin/

3. **Login to the admin interface**:
   - Username: julian
   - Password: (the password you provided during setup)

4. **Create content through the admin interface**:
   - Add categories and portfolio items
   - Create about section content
   - Add contact information

### Frontend (Next.js)

1. **Start the Next.js development server**:

   ```bash
   npm run dev
   ```

   The website will be available at http://localhost:3000

2. **Frontend-Backend Connection**:
   - The frontend is configured to connect to the Django API via the `.env.local` file
   - API calls are handled through the service layer in `/lib/api/`

## Development Workflow

### Adding Portfolio Items

1. Login to the Django admin interface
2. Navigate to Portfolio > Portfolio Items > Add Portfolio Item
3. Fill in the details:
   - Title
   - Category (select from existing or create new)
   - Year
   - Description
   - Upload an image
   - Add features as a JSON array (e.g., `["Feature 1", "Feature 2"]`)
4. Save the item
5. The new item will automatically appear on the website

### Managing About Section Content

1. Login to the Django admin interface
2. Navigate to Content > About Section > Add About Section
3. Fill in the details:
   - Title
   - Subtitle
   - Main content (rich text editor)
   - Upload an image (optional)
   - Ensure "Is active" is checked if you want this content to be displayed
4. Save the content

### Managing Contact Information

1. Login to the Django admin interface
2. Navigate to Contact > Contact Info > Add Contact Info
3. Add contact details like email, phone, etc.
   - Title (e.g., "Email", "Phone")
   - Value (the actual contact info)
   - Description
   - Icon name (Lucide icon name)
4. Save the info

### Processing Contact Form Submissions

1. Submissions from the website contact form are stored in the database
2. Login to the Django admin interface
3. Navigate to Contact > Contact Submissions to see all submissions
4. Emails will also be sent to the admin email configured in settings

## Deployment Considerations

For production deployment, consider the following:

1. **Django Backend**:
   - Set `DEBUG=False` in Django settings
   - Configure proper database (PostgreSQL recommended)
   - Set up proper email backend for sending emails
   - Configure proper CORS settings

2. **Next.js Frontend**:
   - Update `.env.production` with the production API URL
   - Build the Next.js app with `npm run build`
   - Deploy using Vercel or another hosting service

3. **Media Files**:
   - Configure a proper media storage (e.g., AWS S3) for production

## Troubleshooting

### API Connection Issues
- Ensure the Django server is running
- Check the API URL in `.env.local` is correct
- Verify CORS settings in Django

### Content Not Updating
- Clear browser cache
- Ensure the content is marked as "active" in the Django admin
- Check browser console for any API errors

## Further Development

The following enhancements could be considered:

1. **Authentication System**:
   - JWT-based auth for the API
   - User roles and permissions

2. **Image Optimization**:
   - Automatic resizing for uploaded images
   - Lazy loading implementation

3. **SEO Improvements**:
   - Meta tag management
   - Sitemap generation

4. **Analytics Integration**:
   - User behavior tracking
   - Custom analytics dashboard
