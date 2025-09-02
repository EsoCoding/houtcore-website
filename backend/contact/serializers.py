from rest_framework import serializers
from .models import ContactSubmission, ContactInfo

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'title', 'value', 'description', 'icon_name', 'order']

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'project_type', 'message', 'created_at']
        read_only_fields = ['created_at']
