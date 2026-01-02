from rest_framework import serializers
from .models import UserSettings


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = [
            'id', 'language', 'reminder', 'currency', 'theme', 
            'keepScreenOn', 'numberFormat', 'timeFormat', 'firstDay', 
            'version', 'app_lock_password', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'app_lock_password': {'write_only': True, 'required': False}
        }

