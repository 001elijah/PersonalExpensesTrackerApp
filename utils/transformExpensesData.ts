import {Timestamp} from '@react-native-firebase/firestore';

import {ExpenseCategory, FirestoreExpenseData} from '../types/ExpenseTypes.ts';

export const transformExpenseData = (
  docId: string | undefined,
  data: FirestoreExpenseData | undefined,
): FirestoreExpenseData => ({
  uid: data?.uid ?? null,
  id: docId ?? null,
  title: data?.title ?? null,
  amount: data?.amount ?? null,
  category: data?.category?.toLowerCase() as ExpenseCategory ?? null,
  date: data?.date
    ? data.date instanceof Timestamp
      ? data.date.toDate().toDateString()
      : data.date
    : null,
});
