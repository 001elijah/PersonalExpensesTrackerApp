import {ExpenseData} from './ExpenseTypes.ts';
import {User} from './User.ts';

export type HomeStackParamList = {
  ExpensesScreen: undefined;
  AddExpenseScreen: {
    uid: User['uid'];
  };
  ManageExpenseScreen: {
    expense: ExpenseData;
  };
};
