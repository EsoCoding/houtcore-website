# Integration Plan: Next.js Frontend with Django Backend

This document outlines the plan to integrate the existing Next.js frontend with a Django backend to enable dynamic content management for portfolio items, about section content, and contact form functionality.

## 1. Project Structure Overview

### Current Structure (Next.js Frontend)
```
houtcore-website/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── story/
├── components/
│   ├── about-section.tsx
│   ├── contact-section.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── landing-section.tsx
│   ├── portfolio-section.tsx
│   └── ...
├── public/
│   └── [images]
└── ...
```

### Proposed Structure (Next.js + Django)
```
houtcore-website/
├── frontend/           # Next.js application
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
├── backend/            # Django application
│   ├── houtcore/       # Django project directory
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── content/        # App for content management
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── ...
│   ├── portfolio/      # App for portfolio items
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── ...
│   ├── contact/        # App for contact form handling
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── ...
│   ├── media/          # For uploaded images
│   └── manage.py
└── README.md
```

## 2. Backend Implementation (Django)

### 2.1 Setup Django Project

1. Create a Django project
   ```bash
   mkdir backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install django djangorestframework django-cors-headers Pillow
   django-admin startproject houtcore .
   ```

2. Configure Django settings (in settings.py)
   - Set up database
   - Configure CORS to allow requests from Next.js frontend
   - Configure media file handling
   - Set up REST framework

### 2.2 Create Django Apps

#### Portfolio App
1. Create the app
   ```bash
   python manage.py startapp portfolio
   ```

2. Define models:
   ```python
   # portfolio/models.py
   from django.db import models
   
   class Category(models.Model):
       name = models.CharField(max_length=100)
       slug = models.SlugField(unique=True)
       
       def __str__(self):
           return self.name
   
   class PortfolioItem(models.Model):
       title = models.CharField(max_length=200)
       category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
       year = models.CharField(max_length=4)
       description = models.TextField()
       image = models.ImageField(upload_to='portfolio/')
       features = models.JSONField(default=list)  # Store features as JSON array
       created_at = models.DateTimeField(auto_now_add=True)
       updated_at = models.DateTimeField(auto_now=True)
       
       def __str__(self):
           return self.title
   ```

3. Create serializers:
   ```python
   # portfolio/serializers.py
   from rest_framework import serializers
   from .models import PortfolioItem, Category
   
   class CategorySerializer(serializers.ModelSerializer):
       class Meta:
           model = Category
           fields = ['id', 'name', 'slug']
   
   class PortfolioItemSerializer(serializers.ModelSerializer):
       category_name = serializers.ReadOnlyField(source='category.name')
       
       class Meta:
           model = PortfolioItem
           fields = ['id', 'title', 'category', 'category_name', 'year', 
                    'description', 'image', 'features', 'created_at', 'updated_at']
   ```

4. Create API views:
   ```python
   # portfolio/views.py
   from rest_framework import viewsets
   from .models import PortfolioItem, Category
   from .serializers import PortfolioItemSerializer, CategorySerializer
   
   class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
       queryset = Category.objects.all()
       serializer_class = CategorySerializer
   
   class PortfolioItemViewSet(viewsets.ReadOnlyModelViewSet):
       queryset = PortfolioItem.objects.all()
       serializer_class = PortfolioItemSerializer
   ```

#### About Section App
1. Create the app
   ```bash
   python manage.py startapp content
   ```

2. Define models:
   ```python
   # content/models.py
   from django.db import models
   
   class AboutSection(models.Model):
       title = models.CharField(max_length=200)
       subtitle = models.CharField(max_length=300, blank=True)
       main_content = models.TextField()
       image = models.ImageField(upload_to='about/', blank=True, null=True)
       is_active = models.BooleanField(default=True)
       updated_at = models.DateTimeField(auto_now=True)
       
       def __str__(self):
           return self.title
   
   class ServiceItem(models.Model):
       title = models.CharField(max_length=100)
       description = models.TextField()
       icon_name = models.CharField(max_length=50, help_text="Lucide icon name")
       order = models.IntegerField(default=0)
       
       def __str__(self):
           return self.title
   ```

3. Create serializers and views similar to the Portfolio app.

#### Contact Form App
1. Create the app
   ```bash
   python manage.py startapp contact
   ```

2. Define models:
   ```python
   # contact/models.py
   from django.db import models
   
   class ContactSubmission(models.Model):
       name = models.CharField(max_length=100)
       email = models.EmailField()
       phone = models.CharField(max_length=20, blank=True)
       project_type = models.CharField(max_length=50, blank=True)
       message = models.TextField()
       created_at = models.DateTimeField(auto_now_add=True)
       is_read = models.BooleanField(default=False)
       
       def __str__(self):
           return f"{self.name} - {self.email}"
   
   class ContactInfo(models.Model):
       title = models.CharField(max_length=50)  # Email, Phone, etc.
       value = models.CharField(max_length=100)  # The actual email, phone, etc.
       description = models.CharField(max_length=100)
       icon_name = models.CharField(max_length=50)  # Lucide icon name
       order = models.IntegerField(default=0)
       
       def __str__(self):
           return self.title
   ```

3. Create API endpoints for form submissions:
   ```python
   # contact/views.py
   from rest_framework import viewsets, status
   from rest_framework.response import Response
   from rest_framework.decorators import action
   from .models import ContactSubmission, ContactInfo
   from .serializers import ContactSubmissionSerializer, ContactInfoSerializer
   from django.core.mail import send_mail
   from django.conf import settings
   
   class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
       queryset = ContactInfo.objects.all().order_by('order')
       serializer_class = ContactInfoSerializer
   
   class ContactSubmissionViewSet(viewsets.ModelViewSet):
       queryset = ContactSubmission.objects.all()
       serializer_class = ContactSubmissionSerializer
       http_method_names = ['post']  # Only allow POST requests
       
       def create(self, request, *args, **kwargs):
           serializer = self.get_serializer(data=request.data)
           if serializer.is_valid():
               self.perform_create(serializer)
               
               # Send email notification
               name = serializer.validated_data['name']
               email = serializer.validated_data['email']
               message = serializer.validated_data['message']
               project_type = serializer.validated_data.get('project_type', '')
               
               email_subject = f"New Contact Form Submission: {name}"
               email_body = f"""
               Name: {name}
               Email: {email}
               Project Type: {project_type}
               
               Message:
               {message}
               """
               
               send_mail(
                   email_subject,
                   email_body,
                   settings.DEFAULT_FROM_EMAIL,
                   [settings.ADMIN_EMAIL],
                   fail_silently=False,
               )
               
               return Response(
                   {'success': 'Your message has been sent successfully.'},
                   status=status.HTTP_201_CREATED
               )
           return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   ```

### 2.3 Configure URLs

```python
# houtcore/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from portfolio.views import PortfolioItemViewSet, CategoryViewSet
from content.views import AboutSectionViewSet, ServiceItemViewSet
from contact.views import ContactSubmissionViewSet, ContactInfoViewSet

router = DefaultRouter()
router.register(r'portfolio', PortfolioItemViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'about', AboutSectionViewSet)
router.register(r'services', ServiceItemViewSet)
router.register(r'contact/submit', ContactSubmissionViewSet)
router.register(r'contact/info', ContactInfoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 2.4 Create Admin Interface

Configure the Django admin for easy content management:

```python
# portfolio/admin.py
from django.contrib import admin
from .models import PortfolioItem, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year')
    list_filter = ('category', 'year')
    search_fields = ('title', 'description')
```

Create similar admin configurations for other apps.

## 3. Frontend Modifications (Next.js)

### 3.1 API Service Layer

Create a services directory to handle API calls:

```typescript
// frontend/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchPortfolioItems() {
  const response = await fetch(`${API_URL}/portfolio/`);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio items');
  }
  return response.json();
}

export async function fetchAboutSection() {
  const response = await fetch(`${API_URL}/about/`);
  if (!response.ok) {
    throw new Error('Failed to fetch about section');
  }
  const data = await response.json();
  return data.length > 0 ? data[0] : null; // Return first active about section
}

export async function fetchContactInfo() {
  const response = await fetch(`${API_URL}/contact/info/`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact info');
  }
  return response.json();
}

export async function submitContactForm(formData) {
  const response = await fetch(`${API_URL}/contact/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit form');
  }
  
  return response.json();
}
```

### 3.2 Update Portfolio Section

Modify the portfolio section to fetch data from the API:

```tsx
// frontend/components/portfolio-section.tsx
"use client"

import { useEffect, useState } from "react"
import { fetchPortfolioItems } from "@/lib/api"
// ... other imports

export default function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const getPortfolioItems = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPortfolioItems()
        setPortfolioItems(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching portfolio items:", err)
        setError("Failed to load portfolio items")
      } finally {
        setIsLoading(false)
      }
    }
    
    getPortfolioItems()
  }, [])
  
  // Rest of component...
  
  // Replace hardcoded portfolio items rendering with:
  return (
    <section id="portfolio" ref={sectionRef} className="...">
      {/* ... */}
      
      {isLoading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <div className="...">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      )}
      
      {/* ... */}
    </section>
  )
}
```

### 3.3 Update About Section

Similarly, update the About section to fetch content from the API.

### 3.4 Update Contact Form

Update the contact form to submit to the API and show feedback:

```tsx
// frontend/components/contact-section.tsx
"use client"

import { useState } from "react"
import { fetchContactInfo, submitContactForm } from "@/lib/api"
// ... other imports

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  })
  
  useEffect(() => {
    const getContactInfo = async () => {
      try {
        const data = await fetchContactInfo()
        setContactInfo(data)
      } catch (err) {
        console.error("Error fetching contact info:", err)
      }
    }
    
    getContactInfo()
  }, [])
  
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setFormStatus({
        isSubmitting: true,
        isSubmitted: false,
        error: null
      })
      
      await submitContactForm(formData)
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        project_type: '',
        message: ''
      })
      
      // Reset the success message after a delay
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          isSubmitted: false
        }))
      }, 5000)
      
    } catch (err) {
      console.error("Error submitting form:", err)
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: err.message || "Failed to send your message. Please try again."
      })
    }
  }
  
  // Rest of the component...
}
```

## 4. Django Admin Customization

### 4.1 Custom Admin Dashboard

Create a custom admin dashboard for better content management:

```python
# houtcore/admin.py
from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path

class HoutcoreAdminSite(admin.AdminSite):
    site_header = "Houtcore Admin"
    site_title = "Houtcore Admin Portal"
    index_title = "Welcome to Houtcore Content Management"
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(self.dashboard_view), name='dashboard'),
        ]
        return custom_urls + urls
    
    def dashboard_view(self, request):
        context = {
            **self.each_context(request),
            'title': 'Dashboard',
        }
        return TemplateResponse(request, "admin/dashboard.html", context)

houtcore_admin = HoutcoreAdminSite(name='houtcore_admin')
```

### 4.2 Rich Text Editor

Install and configure django-ckeditor for rich text editing:

```bash
pip install django-ckeditor
```

Update settings:

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'ckeditor',
    'ckeditor_uploader',
    # ...
]

CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Full',
        'height': 300,
        'width': 900,
    },
}
```

Update models to use CKEditor:

```python
from ckeditor_uploader.fields import RichTextUploadingField

class AboutSection(models.Model):
    # ...
    main_content = RichTextUploadingField()
    # ...
```

## 5. Deployment Considerations

### 5.1 Development Environment

For local development, you'll need to run both the Django and Next.js applications:

```bash
# Terminal 1 - Django backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Next.js frontend
cd frontend
npm run dev
```

### 5.2 Production Deployment

Several options for production deployment:

1. **Separate Deployments**:
   - Deploy Django backend on a server/PaaS (e.g., DigitalOcean, Heroku)
   - Deploy Next.js frontend separately (e.g., Vercel)
   - Configure CORS and proper API URLs

2. **Combined Deployment**:
   - Build the Next.js app and serve it as static files from Django
   - Configure Django to handle both API and frontend serving

### 5.3 Environment Configuration

Create `.env` files for both applications to manage configuration:

**Backend (.env)**:
```
DEBUG=False
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
ALLOWED_HOSTS=your_domain.com,www.your_domain.com
CORS_ALLOWED_ORIGINS=https://your_frontend_domain.com
EMAIL_HOST=smtp.your_email_provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@domain.com
EMAIL_HOST_PASSWORD=your_email_password
ADMIN_EMAIL=notifications@your_domain.com
```

**Frontend (.env.local)**:
```
NEXT_PUBLIC_API_URL=https://api.your_domain.com/api
```

## 6. Implementation Steps

### Phase 1: Backend Setup
1. Create Django project structure
2. Set up database models
3. Create API endpoints
4. Configure admin interface

### Phase 2: Frontend Adaptation
1. Update API service layer
2. Modify components to use API data
3. Update contact form to submit to API
4. Test integration locally

### Phase 3: Deployment
1. Deploy Django backend
2. Deploy Next.js frontend
3. Configure domains and CORS
4. Test thoroughly in production

### Phase 4: Admin Training and Documentation
1. Create documentation for content management
2. Train administrators on using the CMS

## 7. Additional Features (Future Enhancements)

1. **Authentication System**
   - JWT-based authentication for the API
   - User roles and permissions

2. **Image Optimization**
   - Automatic resizing and optimization of uploaded images
   - Lazy loading of images

3. **SEO Optimization**
   - Meta tag management for each page
   - Sitemap generation

4. **Analytics Integration**
   - Track user behavior and engagement
   - Custom dashboard for website analytics

5. **Multilingual Support**
   - Translate content into multiple languages
   - Language selector on the frontend

## 8. Conclusion

This integration plan provides a comprehensive approach to convert the static Next.js website into a dynamic content-managed website using Django as the backend. By following this plan, you'll be able to make portfolio items, about section content, and contact form all dynamic and easily manageable through the Django admin interface.
