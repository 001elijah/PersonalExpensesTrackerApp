import {RouteProp, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {ExpenseForm} from '../components/ExpenseForm.tsx';
import {EXPENSE_CATEGORIES} from '../constants/expenseCategories.ts';
import {useDatePicker} from '../hooks/useDatePicker.ts';
import {create} from '../redux/operations/expensesOperations.ts';
import {AppDispatch} from '../redux/store.ts';
import {Expense, ExpenseData} from '../types/ExpenseTypes.ts';
import {HomeStackParamList} from '../types/HomeStackParamList.ts';

export const AddExpenseScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'AddExpenseScreen'>>();
  const { uid } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const [expense, setExpense] = useState<Expense>({
    uid: uid as string,
    title: '',
    amount: '',
    category: EXPENSE_CATEGORIES[0],
    date: new Date().toISOString(),
  });
  const {showDatePicker, setShowDatePicker, handleDatePress} = useDatePicker({
    date: new Date(expense.date as string),
    onDateChange: selectedDate => setExpense({...expense, date: selectedDate}),
  });

  const handleSubmit = () => {
    console.log('Submitting expense: ', expense);
    const expenseToSubmit = {
      ...expense,
      amount: parseFloat(expense.amount?.toString().replace(',', '.') || '0'),
    };
    dispatch(create(expenseToSubmit));
  };

  const handleExpenseChange = (expenseDataToHandle: Expense | ExpenseData) => {
    setExpense(expenseDataToHandle as Expense);
  };

  return (
    <ExpenseForm
      title={'Add Expense'}
      submitTitle={'Add Expense'}
      expense={expense}
      onSetExpense={handleExpenseChange}
      onDatePress={handleDatePress}
      onSubmit={handleSubmit}
      showDatePicker={showDatePicker}
      onShowDatePicker={setShowDatePicker}
    />
  );
};
