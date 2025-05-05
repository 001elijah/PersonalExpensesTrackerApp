import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const NoExpensesMessage = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text variant="headlineMedium">No Expenses Yet</Text>
      <Text variant="bodyLarge" style={styles.emptyText}>
        Tap the + button below to add your first expense
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
});
