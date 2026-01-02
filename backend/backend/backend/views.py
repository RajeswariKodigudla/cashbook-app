from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from accounts.models import Account
from transactions.models import Transaction
from notes.models import Note
from app_settings.models import UserSettings


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def backup_data(request):
    """Get all user data for backup"""
    user = request.user
    
    accounts = Account.objects.filter(user=user)
    transactions = Transaction.objects.filter(user=user)
    notes = Note.objects.filter(user=user)
    settings = UserSettings.objects.filter(user=user).first()
    
    from accounts.serializers import AccountSerializer
    from transactions.serializers import TransactionSerializer
    from notes.serializers import NoteSerializer
    from app_settings.serializers import UserSettingsSerializer
    
    backup_data = {
        'accounts': AccountSerializer(accounts, many=True).data,
        'transactions': TransactionSerializer(transactions, many=True).data,
        'notes': NoteSerializer(notes, many=True).data,
        'settings': UserSettingsSerializer(settings).data if settings else None,
        'backupDate': str(Transaction.objects.filter(user=user).first().created_at) if transactions.exists() else None,
        'version': '1.4'
    }
    
    return Response(backup_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def restore_data(request):
    """Restore user data from backup"""
    user = request.user
    data = request.data
    
    # Delete existing data
    Account.objects.filter(user=user).delete()
    Transaction.objects.filter(user=user).delete()
    Note.objects.filter(user=user).delete()
    UserSettings.objects.filter(user=user).delete()
    
    # Restore accounts
    if 'accounts' in data and data['accounts']:
        from accounts.serializers import AccountSerializer
        for account_data in data['accounts']:
            account_data['user'] = user.id
            serializer = AccountSerializer(data=account_data)
            if serializer.is_valid():
                serializer.save(user=user)
    
    # Restore transactions
    if 'transactions' in data and data['transactions']:
        from transactions.serializers import TransactionSerializer
        for transaction_data in data['transactions']:
            transaction_data['user'] = user.id
            serializer = TransactionSerializer(data=transaction_data)
            if serializer.is_valid():
                serializer.save(user=user)
    
    # Restore notes
    if 'notes' in data and data['notes']:
        from notes.serializers import NoteSerializer
        for note_data in data['notes']:
            note_data['user'] = user.id
            serializer = NoteSerializer(data=note_data)
            if serializer.is_valid():
                serializer.save(user=user)
    
    # Restore settings
    if 'settings' in data and data['settings']:
        from app_settings.serializers import UserSettingsSerializer
        settings_data = data['settings']
        settings_data['user'] = user.id
        serializer = UserSettingsSerializer(data=settings_data)
        if serializer.is_valid():
            serializer.save(user=user)
    
    return Response({'message': 'Data restored successfully'})


@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """API root endpoint with available routes"""
    return Response({
        'message': 'Cashbook API',
        'version': '1.0',
        'endpoints': {
            'authentication': {
                'login': '/api/auth/login/',
                'refresh': '/api/auth/refresh/',
            },
            'accounts': '/api/accounts/',
            'transactions': '/api/transactions/',
            'notes': '/api/notes/',
            'settings': '/api/settings/',
            'backup': {
                'get': '/api/backup/',
                'restore': '/api/backup/restore/',
            },
            'admin': '/admin/',
        }
    })

