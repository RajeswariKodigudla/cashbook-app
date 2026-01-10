/**
 * Date utility functions
 */

import { DateFilterRange } from '../types';
import { startOfDay, startOfWeek, startOfMonth, startOfYear, subMonths } from 'date-fns';
import { startOfDay, startOfWeek, startOfMonth, startOfYear, subMonths, subDays, isAfter, isBefore } from 'date-fns';

export const getDateRange = (range: DateFilterRange): { start: number; end: number } => {
  const now = new Date();
  let start: Date;
  let end: Date = now;

  switch (range) {
    case 'TODAY':
      start = startOfDay(now);
      break;
    case 'WEEK':
      start = startOfWeek(now, { weekStartsOn: 1 });
      break;
    case 'MONTH':
      start = startOfMonth(now);
      break;
    case 'LAST_MONTH':
      const lastMonth = subMonths(now, 1);
      start = startOfMonth(lastMonth);
      end = startOfMonth(now);
      break;
    case 'YEAR':
      start = startOfYear(now);
      break;
    case 'ALL':
    default:
      return { start: 0, end: Date.now() };
  }

  return {
    start: start.getTime(),
    end: end.getTime(),
  };
};

export const isInDateRange = (timestamp: number, range: DateFilterRange): boolean => {
  if (range === 'ALL') return true;
  
  const { start, end } = getDateRange(range);
  return timestamp >= start && timestamp <= end;
};

