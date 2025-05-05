import {EXPENSE_CATEGORIES} from '../constants/expenseCategories.ts';
import {ExpenseCategory} from '../types/ExpenseTypes.ts';

export const getCategoryIcon = (category: ExpenseCategory) => {
  switch (category) {
    case EXPENSE_CATEGORIES[0]:
      return 'food';
    case EXPENSE_CATEGORIES[1]:
      return 'bus';
    case EXPENSE_CATEGORIES[2]:
      return 'file-document';
    default:
      return 'tag';
  }
};
