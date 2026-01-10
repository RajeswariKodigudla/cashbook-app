/**
 * Balance Card component showing financial overview
 */

import React from 'react';
import { FinancialStats } from '../../../types';
import { formatCurrency } from '../../../utils/formatUtils';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface BalanceCardProps {
  stats: FinancialStats;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ stats }) => {
  const isPositive = stats.balance >= 0;

  return (
    <div className="relative overflow-hidden gradient-primary rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-white/90 text-xs sm:text-sm font-medium">Total Balance</span>
          </div>
          {isPositive ? (
            <div className="p-2 sm:p-2.5 bg-green-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-100" />
            </div>
          ) : (
            <div className="p-2 sm:p-2.5 bg-red-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-100" />
            </div>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${isPositive ? 'text-green-100' : 'text-red-100'}`}>
            {formatCurrency(stats.balance)}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/20">
          <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm border border-white/10">
            <p className="text-white/70 text-xs mb-1.5 sm:mb-2 font-medium">Income</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-100">
              {formatCurrency(stats.income)}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm border border-white/10">
            <p className="text-white/70 text-xs mb-1.5 sm:mb-2 font-medium">Expenses</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-100">
              {formatCurrency(stats.expenses)}
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 pt-4 border-t border-white/20">
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            {stats.transactionCount} transaction{stats.transactionCount !== 1 ? 's' : ''} total
          </p>
        </div>
      </div>
    </div>
  );
};

