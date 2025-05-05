import {RouteProp, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {ExpenseForm} from '../components/ExpenseForm.tsx';
import {useDatePicker} from '../hooks/useDatePicker.ts';
import {
  deleteExpense,
  updateExpense,
} from '../redux/operations/expensesOperations.ts';
import {AppDispatch} from '../redux/store.ts';
import {Expense, ExpenseData} from '../types/ExpenseTypes.ts';
import {HomeStackParamList} from '../types/HomeStackParamList.ts';

export const ManageExpenseScreen = () => {
  const route =
    useRoute<RouteProp<HomeStackParamList, 'ManageExpenseScreen'>>();
  const {expense} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const [expenseFormData, setExpenseFormData] = useState<ExpenseData>({
    ...expense,
  });
  const {showDatePicker, setShowDatePicker, handleDatePress} = useDatePicker({
    date: new Date(expenseFormData.date as string),
    onDateChange: selectedDate =>
      setExpenseFormData({...expenseFormData, date: selectedDate}),
  });
  const handleSubmit = () => {
    const expenseToSubmit = {
      ...expenseFormData,
      amount: parseFloat(
        expenseFormData.amount?.toString().replace(',', '.') || '0',
      ),
    };
    dispatch(updateExpense(expenseToSubmit));
  };

  const handleDeleteExpense = (id: ExpenseData['id']) => {
    if (id) {
      dispatch(deleteExpense(id));
    }
  };

  const handleExpenseChange = (
    expenseFormDataToHandle: Expense | ExpenseData,
  ) => {
    setExpenseFormData(expenseFormDataToHandle as ExpenseData);
  };

  return (
    <ExpenseForm
      title={'Manage Expense'}
      submitTitle={'Update Expense'}
      expense={expenseFormData}
      onSetExpense={handleExpenseChange}
      onDatePress={handleDatePress}
      onSubmit={handleSubmit}
      showDatePicker={showDatePicker}
      onShowDatePicker={setShowDatePicker}
      onDelete={() => handleDeleteExpense(expenseFormData.id)}
    />
  );
};
