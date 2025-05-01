import {format} from 'date-fns';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';

import {ExpenseCategory, ExpenseData} from '../types/ExpenseTypes.ts';

type ExpenseCardProps = {
  expense: ExpenseData;
};

const getCategoryIcon = (category: ExpenseCategory) => {
  switch (category) {
    case 'Food':
      return 'food';
    case 'Transport':
      return 'bus';
    case 'Bills':
      return 'file-document';
    default:
      return 'tag';
  }
};

const ExpenseIcon = ({
  props,
  category,
}: {
  props: any;
  category: ExpenseCategory;
}) => <List.Icon {...props} icon={getCategoryIcon(category)} />;

const renderListIcon = (category: ExpenseCategory) => {
  return (props: any) => <ExpenseIcon props={props} category={category} />;
};

const ExpenseAmount = ({amount}: {amount: number}) => (
  <Text style={styles.amount}>${amount.toFixed(2)}</Text>
);

const renderExpenseAmount = (amount: number) => (
  <ExpenseAmount amount={amount} />
);

export const ExpenseCard = ({expense}: ExpenseCardProps) => {
  return (
    <React.Fragment key={expense.id}>
      <List.Item
        title={expense.title}
        description={format(expense.date, 'PPP')}
        left={renderListIcon(expense.category)}
        right={() => renderExpenseAmount(expense.amount)}
      />
      <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 16,
  },
});
