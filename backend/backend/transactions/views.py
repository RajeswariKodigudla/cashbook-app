from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer

try:
    from django_filters.rest_framework import DjangoFilterBackend
    HAS_DJANGO_FILTERS = True
except ImportError:
    HAS_DJANGO_FILTERS = False


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date', 'time', 'amount', 'created_at']
    ordering = ['-date', '-time']
    
    if HAS_DJANGO_FILTERS:
        filter_backends.append(DjangoFilterBackend)
        filterset_fields = ['account', 'type', 'date']

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        
        # Additional filtering
        account = self.request.query_params.get('account', None)
        type_filter = self.request.query_params.get('type', None)
        start_date = self.request.query_params.get('startDate', None)
        end_date = self.request.query_params.get('endDate', None)
        
        if account:
            queryset = queryset.filter(account=account)
        if type_filter:
            queryset = queryset.filter(type=type_filter)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get transaction summary (income, expense, balance)"""
        queryset = self.get_queryset()
        
        # Apply filters from query params
        account = request.query_params.get('account', None)
        start_date = request.query_params.get('startDate', None)
        end_date = request.query_params.get('endDate', None)
        
        if account:
            queryset = queryset.filter(account=account)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        total_income = sum(t.amount for t in queryset.filter(type='income'))
        total_expense = sum(t.amount for t in queryset.filter(type='expense'))
        balance = total_income - total_expense
        
        return Response({
            'totalIncome': float(total_income),
            'totalExpense': float(total_expense),
            'balance': float(balance)
        })
