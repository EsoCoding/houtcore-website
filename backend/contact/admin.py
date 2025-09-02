from django.contrib import admin
from .models import ContactSubmission, ContactInfo

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('title', 'value', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'value', 'description')

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'project_type', 'created_at', 'is_read')
    list_filter = ('is_read', 'project_type', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'phone', 'project_type', 'message', 'created_at')
    
    def has_add_permission(self, request):
        return False  # Prevent manual creation
