/**
 * Validation utility functions
 */

import { Transaction, TransactionType } from '../types';

export const validateTransaction = (transaction: Partial<Transaction>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!transaction.amount || transaction.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!transaction.type || !['INCOME', 'EXPENSE'].includes(transaction.type)) {
    errors.push('Transaction type is required');
  }

  if (!transaction.categoryId) {
    errors.push('Category is required');
  }

  if (transaction.amount && transaction.amount > 1000000000) {
    errors.push('Amount is too large');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

