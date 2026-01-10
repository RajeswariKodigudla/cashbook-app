/**
 * Dashboard page - Main transaction management interface
 */

import React, { useState } from 'react';
import { useTransactions } from '../../../hooks/useTransactions';
import { Transaction, TransactionFilters } from '../../../types';
import { BalanceCard } from '../components/BalanceCard';
import { TransactionList } from '../components/TransactionList';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionFilters as Filters } from '../components/TransactionFilters';
import { Button } from '../../../components/ui/Button';
import { Toast, ToastType } from '../../../components/ui/Toast';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { Plus, LogOut, Download } from 'lucide-react';
import { useApp } from '../../../contexts/AppContext';
import { transactionService } from '../../../api/transactionService';
import { DateFilterRange } from '../../../types';

export const Dashboard: React.FC = () => {
  const { logout, username } = useApp();
  const [filters, setFilters] = useState<TransactionFilters>({
    dateRange: 'ALL',
    searchQuery: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const {
    transactions,
    loading,
    error,
    stats,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    applyFilters,
  } = useTransactions(filters);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const handleCreate = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await createTransaction(transaction);
      showToast('Transaction created successfully', 'success');
      setIsFormOpen(false);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to create transaction', 'error');
    }
  };

  const handleUpdate = async (transaction: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    try {
      await updateTransaction(editingTransaction.id, transaction);
      showToast('Transaction updated successfully', 'success');
      setIsFormOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to update transaction', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      showToast('Transaction deleted successfully', 'success');
      setDeletingId(null);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to delete transaction', 'error');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleExport = () => {
    transactionService.exportTransactions(transactions);
    showToast('Transactions exported successfully', 'success');
  };

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    applyFilters({ ...filters, ...newFilters });
  };

  const handleClearFilters = () => {
    setFilters({ dateRange: 'ALL', searchQuery: '' });
    applyFilters({ dateRange: 'ALL', searchQuery: '' });
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 z-40 shadow-sm flex-shrink-0 safe-area-top">
        <div className="max-w-full mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                Cashbook
              </h1>
              <p className="text-xs sm:text-sm text-blue-600 font-medium truncate">Welcome, {username}</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExport}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 touch-manipulation"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 touch-manipulation"
              >
                <LogOut size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar max-w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-6">
        {/* Balance Card */}
        <BalanceCard stats={stats} />

        {/* Filters */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-100">
          <Filters
            dateRange={filters.dateRange || 'ALL'}
            type={filters.type}
            categoryId={filters.categoryId}
            searchQuery={filters.searchQuery || ''}
            onDateRangeChange={(range) => handleFilterChange({ dateRange: range })}
            onTypeChange={(type) => handleFilterChange({ type })}
            onCategoryChange={(categoryId) => handleFilterChange({ categoryId })}
            onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
            onClear={handleClearFilters}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 sm:p-4 shadow-sm">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Transaction List */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-100">
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={(id) => {
              setDeletingId(id);
              if (window.confirm('Are you sure you want to delete this transaction?')) {
                handleDelete(id);
              } else {
                setDeletingId(null);
              }
            }}
            loading={loading}
          />
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setEditingTransaction(null);
          setIsFormOpen(true);
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-30 touch-manipulation safe-area-bottom"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        aria-label="Add transaction"
      >
        <Plus size={24} strokeWidth={3} className="sm:w-7 sm:h-7" />
      </button>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={editingTransaction ? handleUpdate : handleCreate}
        editingTransaction={editingTransaction}
        initialType="EXPENSE"
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

