import {ExpenseCategories, ExpenseCategory} from '../types/ExpenseTypes.ts';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = ['food', 'transport', 'bills', 'other'];

export const EXPENSE_CATEGORIES_OPTIONS: ExpenseCategories = EXPENSE_CATEGORIES.map(category => ({
  value: category,
  label: category.charAt(0).toUpperCase() + category.slice(1),
}));
