/**
 * Transaction Filters component
 */

import React from 'react';
import { DateFilterRange, TransactionType } from '../../../types';
import { DATE_FILTER_OPTIONS, CATEGORIES } from '../../../constants';
import { Input } from '../../../components/ui/Input';
import { Search, Filter, X } from 'lucide-react';

interface TransactionFiltersProps {
  dateRange: DateFilterRange;
  type?: TransactionType;
  categoryId?: string;
  searchQuery: string;
  onDateRangeChange: (range: DateFilterRange) => void;
  onTypeChange: (type?: TransactionType) => void;
  onCategoryChange: (categoryId?: string) => void;
  onSearchChange: (query: string) => void;
  onClear: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  dateRange,
  type,
  categoryId,
  searchQuery,
  onDateRangeChange,
  onTypeChange,
  onCategoryChange,
  onSearchChange,
  onClear,
}) => {
  const hasFilters = dateRange !== 'ALL' || type || categoryId || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 z-10" />
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 sm:pl-12 text-sm sm:text-base"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5 text-sm sm:text-base">
        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value as DateFilterRange)}
          className="px-3 sm:px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm touch-manipulation bg-white"
        >
          {DATE_FILTER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={type || ''}
          onChange={(e) => onTypeChange(e.target.value ? e.target.value as TransactionType : undefined)}
          className="px-3 sm:px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm touch-manipulation bg-white"
        >
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryId || ''}
          onChange={(e) => onCategoryChange(e.target.value || undefined)}
          className="px-3 sm:px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm touch-manipulation bg-white"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="px-3 sm:px-4 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-sm flex items-center gap-1.5 touch-manipulation bg-white font-medium"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

