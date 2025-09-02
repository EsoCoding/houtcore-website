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
    
    class Meta:
        ordering = ['-created_at']

class ContactInfo(models.Model):
    title = models.CharField(max_length=50)  # Email, Phone, etc.
    value = models.CharField(max_length=100)  # The actual email, phone, etc.
    description = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=50)  # Lucide icon name
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title
        
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Contact Info"
