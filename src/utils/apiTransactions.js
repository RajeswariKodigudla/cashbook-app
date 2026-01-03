// API-based transactions utility (replaces localStorage version)
import { transactionsAPI } from '../services/api';

let transactionsCache = null;

export async function getTransactions(filters = {}) {
  try {
    const response = await transactionsAPI.getAll(filters);
    
    // Handle wrapped response format: {success: true, data: {...}}
    let data = response;
    if (response.success && response.data) {
      data = response.data;
    }
    
    // Handle Django REST Framework paginated response
    if (data.results) {
      // Paginated response: { count, next, previous, results: [...] }
      return data.results;
    }
    
    // Handle array response directly
    if (Array.isArray(data)) {
      return data;
    }
    
    // Handle custom format with transactions key
    if (data.transactions) {
      return data.transactions;
    }
    
    // If response is empty object or unexpected format, return empty array
    // Only warn in development mode
    if (import.meta.env.MODE === 'development' && Object.keys(data).length > 0) {
      console.warn('Unexpected response format:', response);
    }
    return [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export async function getTransactionById(id) {
  try {
    return await transactionsAPI.getById(id);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
}

export async function createTransaction(transactionData) {
  try {
    const newTransaction = await transactionsAPI.create(transactionData);
    transactionsCache = null; // Clear cache
    return newTransaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function updateTransaction(id, transactionData) {
  try {
    const updated = await transactionsAPI.update(id, transactionData);
    transactionsCache = null; // Clear cache
    return updated;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(id) {
  try {
    await transactionsAPI.delete(id);
    transactionsCache = null; // Clear cache
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

export async function getTransactionSummary(filters = {}) {
  try {
    const response = await transactionsAPI.getSummary(filters);
    
    // Handle wrapped response format: {success: true, data: {...}}
    let summaryData = response;
    if (response.success && response.data) {
      summaryData = response.data;
    }
    
    // Handle both API response formats:
    // Django format: { totalIncome, totalExpense, balance }
    // API docs format: { total_income, total_expense, net_total, transaction_count }
    if (summaryData.total_income !== undefined) {
      // Convert API docs format to frontend format
      return {
        totalIncome: summaryData.total_income || 0,
        totalExpense: summaryData.total_expense || 0,
        balance: summaryData.net_total || (summaryData.total_income - summaryData.total_expense) || 0,
        transactionCount: summaryData.transaction_count || 0
      };
    }
    
    // Return Django format as-is (already in correct format)
    return {
      totalIncome: summaryData.totalIncome || 0,
      totalExpense: summaryData.totalExpense || 0,
      balance: summaryData.balance || 0
    };
  } catch (error) {
    console.error('Error fetching summary:', error);
    return { totalIncome: 0, totalExpense: 0, balance: 0 };
  }
}

// Legacy functions for backward compatibility
export function getDayData(dateKey) {
  // This would need to be implemented with API call if needed
  return { income: 0, expense: 0 };
}

export function saveTransaction(dateKey, type, amount) {
  // Legacy function - use createTransaction instead
  console.warn('saveTransaction is deprecated, use createTransaction instead');
}

// Clear cache
export function clearTransactionsCache() {
  transactionsCache = null;
}

