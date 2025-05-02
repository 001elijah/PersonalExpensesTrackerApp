import {RouteProp, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';

import {ExpenseForm} from '../components/ExpenseForm.tsx';
import {useDatePicker} from '../hooks/useDatePicker.ts';
import {Expense, ExpenseData} from '../types/ExpenseTypes.ts';
import {HomeStackParamList} from '../types/HomeStackParamList.ts';

export const ManageExpenseScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'ManageExpenseScreen'>>();
  const { expense } = route.params;
  const [_, setExpense] = useState<Expense>(expense);
  const {showDatePicker, setShowDatePicker, handleDatePress} = useDatePicker({
    date: expense.date,
    onDateChange: (selectedDate) => setExpense({...expense, date: selectedDate}),
  });
  const handleSubmit = () => {
      console.log('Saving expense: ', {
        ...expense,
        amount: Number(expense.amount),
      });
      // TODO: Dispatch action to save expense
  };

  const handleDeleteExpense = (id: ExpenseData['id']) => {
    console.log('Deleting expense by id: ', id);
    // TODO: Dispatch action to delete expense
  };

  return (
    <ExpenseForm
      title={'Manage Expense'}
      submitTitle={'Update Expense'}
      expense={expense}
      onSetExpense={setExpense}
      onDatePress={handleDatePress}
      onSubmit={handleSubmit}
      showDatePicker={showDatePicker}
      onShowDatePicker={setShowDatePicker}
      onDelete={() => handleDeleteExpense(expense.id)}
    />
  );
};
