import {createSlice} from '@reduxjs/toolkit';

import {ExpenseData, ExpenseCategory} from '../../types/ExpenseTypes.ts';
import {create, deleteExpense, read} from '../operations/expensesOperations';

const initialState: ExpenseData[] = [
  {
    id: null,
    title: null,
    amount: null,
    category: null,
    date: null,
    uid: null,
  },
];

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(create.fulfilled, (state, {payload}) => {
        state.push({
          id: payload.id ?? null,
          title: payload.title ?? null,
          amount: payload.amount?.toString() ?? null,
          category: (payload.category?.toLowerCase() as ExpenseCategory) ?? null,
          date: payload.date?.toString() ?? null,
          uid: payload.uid ?? null,
        });
      })
      .addCase(read.fulfilled, (_state, {payload}) => {
        return payload.map(item => ({
          id: item.id ?? null,
          title: item.title ?? null,
          amount: item.amount?.toString() ?? null,
          category: (item.category?.toLowerCase() as ExpenseCategory) ?? null,
          date: item.date?.toString() ?? null,
          uid: item.uid ?? null,
        }));
      })
      .addCase(deleteExpense.fulfilled, (state, {payload}) => {
        return state.filter(expense => expense.id !== payload);
      });
  },
});

export default expensesSlice.reducer;
