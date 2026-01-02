from django.db import models
from django.contrib.auth.models import User


class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_settings')
    language = models.CharField(max_length=50, default='English')
    reminder = models.BooleanField(default=False)
    currency = models.CharField(max_length=50, default='None')
    theme = models.CharField(max_length=50, default='Peacock')
    keepScreenOn = models.BooleanField(default=False)
    numberFormat = models.CharField(max_length=50, default='1,000,000.00')
    timeFormat = models.CharField(max_length=50, default='12 Hour')
    firstDay = models.CharField(max_length=50, default='Sunday')
    version = models.CharField(max_length=20, default='1.4')
    app_lock_password = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Settings - {self.user.username}"

