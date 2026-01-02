from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    name = models.CharField(max_length=255)
    created = models.CharField(max_length=100)  # Stored as formatted string like "29 Dec 2025 10:35 PM"
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'name']  # User can't have duplicate account names

    def __str__(self):
        return f"{self.name} - {self.user.username}"
