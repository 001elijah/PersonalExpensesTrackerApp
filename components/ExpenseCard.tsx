import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, List, Text} from 'react-native-paper';

import {ExpenseCategory, ExpenseData} from '../types/ExpenseTypes.ts';
import {getCategoryIcon} from '../utils/getCategoryIcon.ts';

type ExpenseCardProps = {
  expense: ExpenseData;
  onNavigate: () => void;
};

const ExpenseIcon = ({
  props,
  category,
}: {
  props: any;
  category: ExpenseCategory;
}) => (
  <List.Icon
    {...props}
    icon={getCategoryIcon(category)}
  />
);

const renderListIcon = (category: ExpenseCategory) => {
  return (props: any) => <ExpenseIcon props={props} category={category} />;
};

const ExpenseAmount = ({amount}: {amount: number}) => {
  return <Text style={styles.amount}>${amount.toFixed(2)}</Text>;
};

const renderRight = (amount: number) => () =>
  (
    <View style={styles.rightContainer}>
      <ExpenseAmount amount={amount} />
      <IconButton
        icon="chevron-right"
        size={24}
        iconColor="rgba(0, 0, 0, 0.54)"
      />
    </View>
  );

export const ExpenseCard = ({expense, onNavigate}: ExpenseCardProps) => {
  return (
    <React.Fragment key={expense.id}>
      {!expense ||
      expense.title === null ||
      expense.amount === null ||
      expense.date === null ||
      expense.category === null ? (
        <Text>Error: Expense data is incomplete</Text>
      ) : (
        <React.Fragment>
          <List.Item
            title={expense.title}
            description={format(expense.date, 'PPP')}
            left={renderListIcon(expense.category.toLowerCase() as ExpenseCategory)}
            onPress={onNavigate}
            right={renderRight(Number(expense.amount))}
          />
          <Divider />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  listItem: {
    backgroundColor: '#fff',
    paddingVertical: 4,
  },
});
