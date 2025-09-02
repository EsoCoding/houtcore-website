from rest_framework import viewsets
from .models import AboutSection, ServiceItem, ProcessStep
from .serializers import AboutSectionSerializer, ServiceItemSerializer, ProcessStepSerializer

class AboutSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutSection.objects.filter(is_active=True)
    serializer_class = AboutSectionSerializer

class ServiceItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceItem.objects.all()
    serializer_class = ServiceItemSerializer

class ProcessStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProcessStep.objects.filter(is_active=True)
    serializer_class = ProcessStepSerializer
