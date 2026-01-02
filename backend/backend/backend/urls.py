"""
URL configuration for backend project.
"""
# Patch for rest_framework_simplejwt token_blacklist issue
import sys
from unittest.mock import MagicMock

if 'rest_framework_simplejwt.token_blacklist' not in sys.modules:
    try:
        from rest_framework_simplejwt import token_blacklist
    except ImportError:
        mock_module = MagicMock()
        mock_module.BlacklistedToken = MagicMock
        mock_module.OutstandingToken = MagicMock
        sys.modules['rest_framework_simplejwt.token_blacklist'] = mock_module
        sys.modules['rest_framework_simplejwt.token_blacklist.models'] = mock_module

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from accounts.views import AccountViewSet
from transactions.views import TransactionViewSet
from notes.views import NoteViewSet
from app_settings.views import UserSettingsViewSet
from .views import backup_data, restore_data, api_root

# Create router for viewsets
router = routers.DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'notes', NoteViewSet, basename='note')
router.register(r'settings', UserSettingsViewSet, basename='settings')

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/backup/', backup_data, name='backup'),
    path('api/backup/restore/', restore_data, name='restore'),
    path('api/', include(router.urls)),
]
