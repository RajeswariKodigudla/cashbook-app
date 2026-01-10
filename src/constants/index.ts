/**
 * Application constants
 */

import React from 'react';
import { Category, DateFilterRange } from '../types';
import {
  Utensils, Car, ShoppingBag, Gift, TrendingUp, Briefcase, Plus,
  Coffee, Home, Zap, ShieldCheck, Stethoscope, Plane, GraduationCap,
  Banknote, MoreHorizontal, Play
} from 'lucide-react';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cashbook-backend-2.onrender.com/api';
export const API_TIMEOUT = 10000; // 10 seconds

export const CATEGORIES: Category[] = [
  // Expenses
  { id: 'food', label: 'Food & Dining', icon: 'Utensils', type: 'EXPENSE', color: '#EF4444' },
  { id: 'coffee', label: 'Coffee', icon: 'Coffee', type: 'EXPENSE', color: '#F59E0B' },
  { id: 'transport', label: 'Transport', icon: 'Car', type: 'EXPENSE', color: '#3B82F6' },
  { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag', type: 'EXPENSE', color: '#8B5CF6' },
  { id: 'bills', label: 'Bills & Utilities', icon: 'Zap', type: 'EXPENSE', color: '#F97316' },
  { id: 'rent', label: 'Rent/Home', icon: 'Home', type: 'EXPENSE', color: '#06B6D4' },
  { id: 'entertainment', label: 'Entertainment', icon: 'Play', type: 'EXPENSE', color: '#EC4899' },
  { id: 'health', label: 'Health', icon: 'Stethoscope', type: 'EXPENSE', color: '#10B981' },
  { id: 'travel', label: 'Travel', icon: 'Plane', type: 'EXPENSE', color: '#6366F1' },
  { id: 'edu', label: 'Education', icon: 'GraduationCap', type: 'EXPENSE', color: '#14B8A6' },
  { id: 'other_exp', label: 'Other', icon: 'MoreHorizontal', type: 'EXPENSE', color: '#6B7280' },
  
  // Income
  { id: 'salary', label: 'Salary', icon: 'Banknote', type: 'INCOME', color: '#10B981' },
  { id: 'invest', label: 'Investment', icon: 'TrendingUp', type: 'INCOME', color: '#059669' },
  { id: 'freelance', label: 'Freelance', icon: 'Briefcase', type: 'INCOME', color: '#047857' },
  { id: 'bonus', label: 'Bonus', icon: 'ShieldCheck', type: 'INCOME', color: '#065F46' },
  { id: 'gift', label: 'Gift', icon: 'Gift', type: 'INCOME', color: '#34D399' },
  { id: 'other_inc', label: 'Other Income', icon: 'Plus', type: 'INCOME', color: '#6EE7B7' },
];

export const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Utensils, Coffee, Car, ShoppingBag, Zap, Home, Play,
  Stethoscope, Plane, GraduationCap, MoreHorizontal, Banknote,
  TrendingUp, Briefcase, ShieldCheck, Gift, Plus
};

export const DATE_FILTER_OPTIONS: { value: DateFilterRange; label: string }[] = [
  { value: 'ALL', label: 'All Time' },
  { value: 'TODAY', label: 'Today' },
  { value: 'WEEK', label: 'This Week' },
  { value: 'MONTH', label: 'This Month' },
  { value: 'LAST_MONTH', label: 'Last Month' },
  { value: 'YEAR', label: 'This Year' },
];

export const STORAGE_KEYS = {
  AUTH: 'cashbook_auth',
  TRANSACTIONS: 'cashbook_transactions',
  SETTINGS: 'cashbook_settings',
} as const;

