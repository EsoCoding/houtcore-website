from rest_framework import viewsets, status
from rest_framework.response import Response
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
