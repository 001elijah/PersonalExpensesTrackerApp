import {RootState} from '../store.ts';
export const selectExpenses = (state: RootState) => state.expenses;
