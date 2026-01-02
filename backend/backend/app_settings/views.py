from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserSettings
from .serializers import UserSettingsSerializer
from django.contrib.auth.hashers import make_password, check_password


class UserSettingsViewSet(viewsets.ModelViewSet):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserSettings.objects.filter(user=self.request.user)

    def get_object(self):
        settings, created = UserSettings.objects.get_or_create(
            user=self.request.user,
            defaults={
                'language': 'English',
                'reminder': False,
                'currency': 'None',
                'theme': 'Peacock',
                'keepScreenOn': False,
                'numberFormat': '1,000,000.00',
                'timeFormat': '12 Hour',
                'firstDay': 'Sunday',
                'version': '1.4'
            }
        )
        return settings

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def set_app_lock(self, request):
        """Set app lock password"""
        password = request.data.get('password')
        if not password:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        settings, _ = UserSettings.objects.get_or_create(user=request.user)
        settings.app_lock_password = make_password(password)
        settings.save()
        return Response({'message': 'App lock password set successfully'})

    @action(detail=False, methods=['post'])
    def verify_app_lock(self, request):
        """Verify app lock password"""
        password = request.data.get('password')
        if not password:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            settings = UserSettings.objects.get(user=request.user)
            if not settings.app_lock_password:
                return Response({'error': 'App lock not set'}, status=status.HTTP_400_BAD_REQUEST)
            
            if check_password(password, settings.app_lock_password):
                return Response({'message': 'Password verified'})
            else:
                return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
        except UserSettings.DoesNotExist:
            return Response({'error': 'App lock not set'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'])
    def remove_app_lock(self, request):
        """Remove app lock password"""
        settings, _ = UserSettings.objects.get_or_create(user=request.user)
        settings.app_lock_password = None
        settings.save()
        return Response({'message': 'App lock removed successfully'})

