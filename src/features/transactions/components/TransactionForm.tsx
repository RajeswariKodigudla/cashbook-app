/**
 * Transaction Form component for creating/editing transactions
 */

import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../../../types';
import { CATEGORIES } from '../../../constants';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Modal } from '../../../components/ui/Modal';
import { validateTransaction } from '../../../utils/validation';
import { getIcon } from '../../../utils/iconUtils';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  editingTransaction?: Transaction | null;
  initialType?: TransactionType;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingTransaction,
  initialType = 'EXPENSE',
}) => {
  const [type, setType] = useState<TransactionType>(editingTransaction?.type || initialType);
  const [amount, setAmount] = useState(editingTransaction?.amount.toString() || '');
  const [categoryId, setCategoryId] = useState(editingTransaction?.categoryId || '');
  const [note, setNote] = useState(editingTransaction?.note || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
      setCategoryId(editingTransaction.categoryId);
      setNote(editingTransaction.note || '');
    } else {
      setType(initialType);
      setAmount('');
      setCategoryId('');
      setNote('');
    }
    setErrors({});
  }, [editingTransaction, initialType, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const transaction: Omit<Transaction, 'id'> = {
      type,
      amount: parseFloat(amount),
      categoryId,
      note: note.trim() || undefined,
      timestamp: editingTransaction?.timestamp || Date.now(),
    };

    const validation = validateTransaction(transaction);
    if (!validation.valid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error, index) => {
        if (error.includes('Amount')) errorMap.amount = error;
        else if (error.includes('type')) errorMap.type = error;
        else if (error.includes('Category')) errorMap.categoryId = error;
        else errorMap[`general_${index}`] = error;
      });
      setErrors(errorMap);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(transaction);
      onClose();
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Failed to save transaction' });
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = CATEGORIES.filter(cat => cat.type === type);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTransaction ? 'Edit Transaction' : 'New Transaction'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2.5">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setType('EXPENSE');
                setCategoryId('');
              }}
              className={`
                p-3.5 rounded-xl border-2 transition-all font-medium text-sm sm:text-base touch-manipulation
                ${type === 'EXPENSE'
                  ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }
              `}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => {
                setType('INCOME');
                setCategoryId('');
              }}
              className={`
                p-3.5 rounded-xl border-2 transition-all font-medium text-sm sm:text-base touch-manipulation
                ${type === 'INCOME'
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }
              `}
            >
              Income
            </button>
          </div>
        </div>

        {/* Amount */}
        <Input
          label="Amount"
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
          error={errors.amount}
        />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2.5">
            Category {!categoryId && <span className="text-red-500">*</span>}
          </label>
          <div className="grid grid-cols-3 gap-2.5 max-h-64 overflow-y-auto hide-scrollbar p-1 -m-1">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`
                  p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center touch-manipulation
                  ${categoryId === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-lg sm:text-xl flex items-center justify-center">
                    {getIcon(category.icon, 20, categoryId === category.id ? 'text-blue-600' : 'text-slate-600')}
                  </span>
                  <span className="text-xs font-medium leading-tight text-center">{category.label}</span>
                </div>
              </button>
            ))}
          </div>
          {errors.categoryId && (
            <p className="mt-2 text-sm text-red-600">{errors.categoryId}</p>
          )}
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2.5">
            Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note or description..."
            rows={3}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base resize-none"
          />
        </div>

        {errors.general && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 font-medium">{errors.general}</p>
          </div>
        )}

        <div className="flex gap-2 sm:gap-3 pt-4 border-t border-slate-200 mt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 touch-manipulation"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1 touch-manipulation"
          >
            {editingTransaction ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

