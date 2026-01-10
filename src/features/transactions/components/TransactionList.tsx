/**
 * Transaction List component
 */

import React from 'react';
import { Transaction } from '../../../types';
import { CATEGORIES } from '../../../constants';
import { formatCurrency, formatDate, formatRelativeTime } from '../../../utils/formatUtils';
import { getIcon } from '../../../utils/iconUtils';
import { Button } from '../../../components/ui/Button';
import { Trash2, Edit2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 text-blue-600">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-slate-700 mb-1 font-semibold">No transactions yet</p>
          <p className="text-sm text-slate-500">Start by adding your first transaction</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 hide-scrollbar">
      {transactions.map((transaction) => {
        const category = CATEGORIES.find(cat => cat.id === transaction.categoryId);
        const isIncome = transaction.type === 'INCOME';

        return (
          <div
            key={transaction.id}
            className="bg-white rounded-xl p-3 sm:p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all touch-manipulation"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                <div
                  className={`
                    p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-sm flex-shrink-0
                    ${isIncome ? 'bg-gradient-to-br from-green-100 to-green-50 border border-green-200' : 'bg-gradient-to-br from-red-100 to-red-50 border border-red-200'}
                  `}
                >
                  {category && getIcon(category.icon, 20, isIncome ? 'text-green-600' : 'text-red-600')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                      {category?.label || 'Unknown'}
                    </h3>
                    {transaction.note && (
                      <span className="text-xs text-slate-500 truncate hidden sm:inline">
                        • {transaction.note}
                      </span>
                    )}
                  </div>
                  {transaction.note && (
                    <p className="text-xs text-slate-500 truncate sm:hidden mb-1">
                      {transaction.note}
                    </p>
                  )}
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
                    <span>{formatDate(transaction.timestamp)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{formatRelativeTime(transaction.timestamp)}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-2">
                  <p
                    className={`
                      font-bold text-base sm:text-lg md:text-xl
                      ${isIncome ? 'text-green-600' : 'text-red-600'}
                    `}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(transaction)}
                  className="p-1.5 sm:p-2 touch-manipulation"
                >
                  <Edit2 size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(transaction.id)}
                  className="p-1.5 sm:p-2 text-red-600 hover:text-red-700 hover:bg-red-50 touch-manipulation"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
