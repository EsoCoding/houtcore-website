from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    """
    API documentation for Houtcore website.
    This endpoint provides links to all available API resources.
    """
    return Response({
        'portfolio': reverse('portfolioitem-list', request=request, format=format),
        'categories': reverse('category-list', request=request, format=format),
        'about': reverse('aboutsection-list', request=request, format=format),
        'services': reverse('serviceitem-list', request=request, format=format),
        'contact_info': reverse('contactinfo-list', request=request, format=format),
        'contact_submit': reverse('contactsubmission-list', request=request, format=format),
    })
