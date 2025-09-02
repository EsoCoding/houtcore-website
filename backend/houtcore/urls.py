"""
URL configuration for houtcore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter

from portfolio.views import PortfolioItemViewSet, CategoryViewSet
from content.views import AboutSectionViewSet, ServiceItemViewSet, ProcessStepViewSet
from contact.views import ContactSubmissionViewSet, ContactInfoViewSet
from .views import api_root

router = DefaultRouter()
router.register(r'portfolio', PortfolioItemViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'about', AboutSectionViewSet)
router.register(r'services', ServiceItemViewSet)
router.register(r'process', ProcessStepViewSet)
router.register(r'contact/submit', ContactSubmissionViewSet)
router.register(r'contact/info', ContactInfoViewSet)

urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=False), name='index'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Include router.urls first to handle all viewsets
    path('api/docs/', api_root, name='api-root'),  # Then add our custom API root at /api/docs/
    path('api-auth/', include('rest_framework.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
