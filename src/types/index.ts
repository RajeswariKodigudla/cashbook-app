/**
 * Core TypeScript type definitions for the Cashbook application
 */

export type TransactionType = 'INCOME' | 'EXPENSE';

export type DateFilterRange = 'ALL' | 'TODAY' | 'WEEK' | 'MONTH' | 'LAST_MONTH' | 'YEAR';

export interface Category {
  id: string;
  label: string;
  icon: string;
  type: TransactionType;
  color?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  note?: string;
  timestamp: number;
}

export interface FinancialStats {
  balance: number;
  income: number;
  expenses: number;
  transactionCount: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  dateRange?: DateFilterRange;
  searchQuery?: string;
}

