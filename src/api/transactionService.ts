/**
 * Transaction API Service
 */

import { apiClient } from './client';
import { Transaction, TransactionFilters } from '../types';
import { STORAGE_KEYS } from '../constants';

class TransactionService {
  private useBackend: boolean | null = null;

  /**
   * Check if backend is available and cache the result
   */
  private async checkBackend(): Promise<boolean> {
    if (this.useBackend !== null) {
      return this.useBackend;
    }

    try {
      this.useBackend = await apiClient.healthCheck();
      return this.useBackend;
    } catch {
      this.useBackend = false;
      return false;
    }
  }

  /**
   * Get all transactions
   */
  async getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    const useBackend = await this.checkBackend();

    if (useBackend) {
      try {
        const transactions = await apiClient.get<Transaction[]>('/transactions/');
        // Sync with localStorage as backup
        this.syncToLocalStorage(transactions);
        return this.applyFilters(transactions, filters);
      } catch (error) {
        console.warn('Backend unavailable, using localStorage:', error);
        this.useBackend = false;
      }
    }

    return this.getFromLocalStorage(filters);
  }

  /**
   * Create a new transaction
   */
  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction[]> {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: transaction.timestamp || Date.now(),
    };

    // Save to localStorage immediately for instant feedback
    const localTransactions = this.getFromLocalStorage();
    localTransactions.unshift(newTransaction);
    this.saveToLocalStorage(localTransactions);

    // Try to sync with backend in background
    const useBackend = await this.checkBackend();
    if (useBackend) {
      try {
        const transactions = await apiClient.post<Transaction[]>('/transactions/', {
          id: newTransaction.id,
          amount: newTransaction.amount,
          type: newTransaction.type,
          categoryId: newTransaction.categoryId,
          note: newTransaction.note || '',
          timestamp: newTransaction.timestamp,
        });
        this.syncToLocalStorage(transactions);
        return transactions;
      } catch (error) {
        console.warn('Failed to sync with backend:', error);
        // Keep using localStorage data
      }
    }

    return localTransactions;
  }

  /**
   * Update an existing transaction
   */
  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction[]> {
    const useBackend = await this.checkBackend();

    if (useBackend) {
      try {
        const transactions = await apiClient.put<Transaction[]>(`/transactions/${id}/`, updates);
        this.syncToLocalStorage(transactions);
        return transactions;
      } catch (error) {
        console.warn('Backend unavailable, using localStorage:', error);
        this.useBackend = false;
      }
    }

    // Update in localStorage
    const localTransactions = this.getFromLocalStorage();
    const index = localTransactions.findIndex(tx => tx.id === id);
    if (index !== -1) {
      localTransactions[index] = { ...localTransactions[index], ...updates };
      this.saveToLocalStorage(localTransactions);
    }

    return localTransactions;
  }

  /**
   * Delete a transaction
   */
  async deleteTransaction(id: string): Promise<Transaction[]> {
    const useBackend = await this.checkBackend();

    if (useBackend) {
      try {
        const transactions = await apiClient.delete<Transaction[]>(`/transactions/${id}/`);
        this.syncToLocalStorage(transactions);
        return transactions;
      } catch (error) {
        console.warn('Backend unavailable, using localStorage:', error);
        this.useBackend = false;
      }
    }

    // Delete from localStorage
    const localTransactions = this.getFromLocalStorage().filter(tx => tx.id !== id);
    this.saveToLocalStorage(localTransactions);

    return localTransactions;
  }

  /**
   * Apply filters to transactions
   */
  private applyFilters(
    transactions: Transaction[],
    filters?: TransactionFilters
  ): Transaction[] {
    if (!filters) return transactions;

    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter(tx => tx.type === filters.type);
    }

    if (filters.categoryId) {
      filtered = filtered.filter(tx => tx.categoryId === filters.categoryId);
    }

    if (filters.dateRange && filters.dateRange !== 'ALL') {
      const { start, end } = this.getDateRange(filters.dateRange);
      filtered = filtered.filter(tx => tx.timestamp >= start && tx.timestamp <= end);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.note?.toLowerCase().includes(query) ||
        tx.categoryId.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  /**
   * Get date range for filtering
   */
  private getDateRange(range: string): { start: number; end: number } {
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (range) {
      case 'TODAY':
        return { start: today.getTime(), end: now };
      case 'WEEK':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        return { start: weekStart.getTime(), end: now };
      case 'MONTH':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return { start: monthStart.getTime(), end: now };
      case 'LAST_MONTH':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        return { start: lastMonthStart.getTime(), end: lastMonthEnd.getTime() };
      case 'YEAR':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        return { start: yearStart.getTime(), end: now };
      default:
        return { start: 0, end: now };
    }
  }

  /**
   * LocalStorage operations
   */
  private getFromLocalStorage(filters?: TransactionFilters): Transaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (!data) return [];

      const transactions: Transaction[] = JSON.parse(data);
      return this.applyFilters(transactions, filters);
    } catch {
      return [];
    }
  }

  private saveToLocalStorage(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  private syncToLocalStorage(transactions: Transaction[]): void {
    this.saveToLocalStorage(transactions);
  }

  /**
   * Export transactions as JSON
   */
  exportTransactions(transactions: Transaction[]): void {
    const dataStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cashbook_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const transactionService = new TransactionService();

