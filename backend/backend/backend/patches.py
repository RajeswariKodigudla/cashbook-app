"""
Patch for rest_framework_simplejwt token_blacklist import issue
"""
import sys
from unittest.mock import MagicMock

# Check if token_blacklist module exists, if not create a mock
if 'rest_framework_simplejwt.token_blacklist' not in sys.modules:
    try:
        from rest_framework_simplejwt import token_blacklist
    except ImportError:
        # Create a mock module for token_blacklist
        mock_module = MagicMock()
        mock_module.BlacklistedToken = MagicMock
        mock_module.OutstandingToken = MagicMock
        sys.modules['rest_framework_simplejwt.token_blacklist'] = mock_module
        sys.modules['rest_framework_simplejwt.token_blacklist.models'] = mock_module

