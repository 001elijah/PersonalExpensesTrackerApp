import {ExpenseData} from './ExpenseTypes.ts';

export type HomeStackParamList = {
  ExpensesScreen: undefined;
  AddExpenseScreen: undefined;
  ManageExpenseScreen: {
    expense: ExpenseData;
  };
};
