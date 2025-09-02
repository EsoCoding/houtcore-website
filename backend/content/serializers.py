from rest_framework import serializers
from .models import AboutSection, ServiceItem, ProcessStep

class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ['id', 'title', 'subtitle', 'main_content', 'image', 'is_active', 'updated_at']

class ServiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItem
        fields = ['id', 'title', 'description', 'icon_name', 'order']

class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = ['id', 'title', 'description', 'icon_name', 'order', 'is_active']
