import {Timestamp} from '@react-native-firebase/firestore';

export type ExpenseCategory = 'food' | 'transport' | 'bills' | 'other';

export type ExpenseCategories = Array<{
  value: ExpenseCategory;
  label: string;
}>

export type Expense = {
  uid: string | null;
  title: string | null;
  amount: string | null;
  category: ExpenseCategory | null;
  date: string | null;
};

export type ExpenseData = Expense & {
  id: string | null;
}

export type FirestoreExpenseData = {
  uid?: string | null;
  id?: string | null;
  title?: string | null;
  amount?: number | null;
  category?: string | null;
  date?: Timestamp | string | null;
};
