import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, List, Text} from 'react-native-paper';

import {ExpenseCategory, ExpenseData} from '../types/ExpenseTypes.ts';

type ExpenseCardProps = {
  expense: ExpenseData;
  onNavigate: () => void;
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

const renderRight = (amount: number) => () => (
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
      <List.Item
        title={expense.title}
        description={format(expense.date, 'PPP')}
        left={renderListIcon(expense.category)}
        onPress={onNavigate}
        right={renderRight(expense.amount)}
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
