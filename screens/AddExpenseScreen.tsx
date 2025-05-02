import React, {useState} from 'react';

import {ExpenseForm} from '../components/ExpenseForm.tsx';
import {useDatePicker} from '../hooks/useDatePicker.ts';
import {Expense} from '../types/ExpenseTypes.ts';

export const AddExpenseScreen = () => {
  const [expense, setExpense] = useState<Expense>({
    title: '',
    amount: 0,
    category: 'Food',
    date: new Date(),
  });
  const {showDatePicker, setShowDatePicker, handleDatePress} = useDatePicker({
    date: expense.date,
    onDateChange: selectedDate => setExpense({...expense, date: selectedDate}),
  });

  const handleSubmit = () => {
    console.log('Saving expense:', {
      ...expense,
      amount: Number(expense.amount),
    });
    // TODO: Dispatch action to save expense
  };

  return (
    <ExpenseForm
      title={'Add Expense'}
      submitTitle={'Add Expense'}
      expense={expense}
      onSetExpense={setExpense}
      onDatePress={handleDatePress}
      onSubmit={handleSubmit}
      showDatePicker={showDatePicker}
      onShowDatePicker={setShowDatePicker}
    />
  );
};
