// API-based transactions utility (replaces localStorage version)
import { transactionsAPI } from '../services/api';

let transactionsCache = null;

export async function getTransactions(filters = {}) {
  try {
    const response = await transactionsAPI.getAll(filters);
    // Handle different response formats
    if (response.transactions) {
      return response.transactions;
    }
    return response;
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
    return await transactionsAPI.getSummary(filters);
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

