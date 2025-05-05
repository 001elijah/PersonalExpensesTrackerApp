import {User} from '@firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FirebaseError} from 'firebase/app';

import {createExpenseAPI, deleteExpenseAPI, readExpensesAPI} from '../../services/firebaseAPI.ts';
import {FirestoreExpenseData} from '../../types/ExpenseTypes.ts';
import {getReadableErrorMessage} from '../../utils/getReadableFirebaseError.ts';

export const create = createAsyncThunk(
  'expenses/create',
  async (expense: FirestoreExpenseData, {rejectWithValue}) => {
    try {
      const data = await createExpenseAPI(expense);
      return {...data};
    } catch (error) {
      return rejectWithValue(
        getReadableErrorMessage((error as FirebaseError).code) ||
          'An unexpected error occurred during expense creation',
      );
    }
  },
);

export const read = createAsyncThunk('expenses/read', async (uid: User['uid'], {rejectWithValue}) => {
  try {
    const expenses = await readExpensesAPI(uid);
    return [...expenses];
  } catch (error) {
    return rejectWithValue(
      getReadableErrorMessage((error as FirebaseError).code) ||
      'An unexpected error occurred during expenses fetch',
    );
  }
});

export const deleteExpense = createAsyncThunk(
  'expenses/delete',
  async (expenseId: string, {rejectWithValue}) => {
    try {
      await deleteExpenseAPI(expenseId);
      return expenseId;
    } catch (error) {
      return rejectWithValue(
        getReadableErrorMessage((error as FirebaseError).code) || 'An unexpected error occurred during expense deletion',
      );
    }
  },
);
