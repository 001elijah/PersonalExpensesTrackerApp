import {RouteProp, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {ExpenseForm} from '../components/ExpenseForm.tsx';
import {useDatePicker} from '../hooks/useDatePicker.ts';
import {deleteExpense} from '../redux/operations/expensesOperations.ts';
import {AppDispatch} from '../redux/store.ts';
import {Expense, ExpenseData} from '../types/ExpenseTypes.ts';
import {HomeStackParamList} from '../types/HomeStackParamList.ts';

export const ManageExpenseScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'ManageExpenseScreen'>>();
  const { expense } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const [expenseData, setExpenseData] = useState<ExpenseData>({...expense});
  const {showDatePicker, setShowDatePicker, handleDatePress} = useDatePicker({
    date: new Date(expenseData.date as string),
    onDateChange: (selectedDate) => setExpenseData({...expenseData, date: selectedDate}),
  });
  const handleSubmit = () => {
      console.log('Saving expense: ', {
        ...expenseData,
        amount: Number(expenseData.amount),
      });
      // TODO: Dispatch action to save expense
  };

  const handleDeleteExpense = (id: ExpenseData['id']) => {
    console.log('Deleting expense by id: ', id);
    // TODO: Dispatch action to delete expense
    if (id) {
      dispatch(deleteExpense(id));
    }
  };

  const handleExpenseChange = (expenseDataToHandle: Expense | ExpenseData) => {
    setExpenseData(expenseDataToHandle as ExpenseData);
  };

  return (
    <ExpenseForm
      title={'Manage Expense'}
      submitTitle={'Update Expense'}
      expense={expenseData}
      onSetExpense={handleExpenseChange}
      onDatePress={handleDatePress}
      onSubmit={handleSubmit}
      showDatePicker={showDatePicker}
      onShowDatePicker={setShowDatePicker}
      onDelete={() => handleDeleteExpense(expenseData.id)}
    />
  );
};
