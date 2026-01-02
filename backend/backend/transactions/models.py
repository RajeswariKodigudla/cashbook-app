from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    PAYMENT_MODES = [
        ('Cash', 'Cash'),
        ('Online', 'Online'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    account = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    date = models.CharField(max_length=20)  # Stored as "YYYY-MM-DD"
    time = models.CharField(max_length=10)  # Stored as "HH:MM"
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=255, blank=True, default='')
    category = models.CharField(max_length=255, blank=True, default='')
    remark = models.CharField(max_length=500, blank=True, default='')
    payment = models.CharField(max_length=10, choices=PAYMENT_MODES, default='Cash')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-time']
        indexes = [
            models.Index(fields=['user', '-date']),
            models.Index(fields=['user', 'type']),
            models.Index(fields=['user', 'account']),
        ]

    def __str__(self):
        return f"{self.type} - {self.amount} - {self.account}"
