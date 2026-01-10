/**
 * Custom hook for managing transactions
 */

import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionFilters, FinancialStats } from '../types';
import { transactionService } from '../api/transactionService';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  stats: FinancialStats;
  refetch: () => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  applyFilters: (filters: TransactionFilters) => void;
}

export const useTransactions = (initialFilters?: TransactionFilters): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters | undefined>(initialFilters);

  const calculateStats = useCallback((txs: Transaction[]): FinancialStats => {
    const income = txs
      .filter(tx => tx.type === 'INCOME')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = txs
      .filter(tx => tx.type === 'EXPENSE')
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      balance: income - expenses,
      income,
      expenses,
      transactionCount: txs.length,
    };
  }, []);

  const [stats, setStats] = useState<FinancialStats>({
    balance: 0,
    income: 0,
    expenses: 0,
    transactionCount: 0,
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getTransactions(filters);
      setTransactions(data);
      setStats(calculateStats(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setError(errorMessage);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, calculateStats]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    try {
      setError(null);
      const updated = await transactionService.createTransaction(transaction);
      setTransactions(updated);
      setStats(calculateStats(updated));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create transaction';
      setError(errorMessage);
      throw err;
    }
  }, [calculateStats]);

  const updateTransaction = useCallback(async (id: string, updates: Partial<Transaction>) => {
    try {
      setError(null);
      const updated = await transactionService.updateTransaction(id, updates);
      setTransactions(updated);
      setStats(calculateStats(updated));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update transaction';
      setError(errorMessage);
      throw err;
    }
  }, [calculateStats]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setError(null);
      const updated = await transactionService.deleteTransaction(id);
      setTransactions(updated);
      setStats(calculateStats(updated));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete transaction';
      setError(errorMessage);
      throw err;
    }
  }, [calculateStats]);

  const applyFilters = useCallback((newFilters: TransactionFilters) => {
    setFilters(newFilters);
  }, []);

  return {
    transactions,
    loading,
    error,
    stats,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    applyFilters,
  };
};

