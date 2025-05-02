import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Dialog,
  HelperText,
  Portal,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';

import {Expense, ExpenseCategory} from '../types/ExpenseTypes.ts';

interface ExpenseFormProps {
  title: string;
  submitTitle: string;
  expense: Expense;
  onSetExpense: (expense: Expense) => void;
  onDatePress: () => void;
  onSubmit: () => void;
  showDatePicker: boolean;
  onShowDatePicker: (showDatePicker: boolean) => void;
  onDelete?: () => void;
}

export const ExpenseForm = ({
  title,
  submitTitle,
  expense,
  onSetExpense,
  onDatePress,
  onSubmit,
  showDatePicker,
  onShowDatePicker,
  onDelete,
}: ExpenseFormProps) => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({
    title: '',
    amount: '',
  });
  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      amount: '',
    };
    let isValid = true;

    if (!expense.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!expense.amount) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else if (isNaN(Number(expense.amount)) || Number(expense.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    onDelete?.();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
        {onDelete && (
          <Appbar.Action
            icon="delete"
            onPress={handleDelete}
          />
        )}
      </Appbar.Header>

      <Surface style={styles.form}>
        <TextInput
          label="Title"
          value={expense.title}
          onChangeText={text => onSetExpense({...expense, title: text})}
          mode="outlined"
          error={!!errors.title}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.title}>
          {errors.title}
        </HelperText>

        <TextInput
          label="Amount"
          value={expense.amount.toString()}
          maxLength={10}
          mode="outlined"
          onChangeText={text => onSetExpense({...expense, amount: +text})}
          keyboardType="decimal-pad"
          error={!!errors.amount}
          returnKeyType="done"
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.amount}>
          {errors.amount}
        </HelperText>

        <Text style={styles.label}>Category</Text>
        <SegmentedButtons
          value={expense.category}
          onValueChange={value =>
            onSetExpense({...expense, category: value as ExpenseCategory})
          }
          buttons={[
            {value: 'Food', label: 'Food'},
            {value: 'Transport', label: 'Transport'},
            {value: 'Bills', label: 'Bills'},
            {value: 'Other', label: 'Other'},
          ]}
          style={styles.categoryButtons}
        />

        <TouchableRipple onPressIn={onDatePress}>
          <TextInput
            label="Date"
            value={format(expense.date, 'PPP')}
            onPress={onDatePress}
            mode="outlined"
            style={styles.input}
            editable={false}
            right={<TextInput.Icon icon="calendar" onPressIn={onDatePress} />}
          />
        </TouchableRipple>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}>
          {submitTitle}
        </Button>
      </Surface>

      {Platform.OS === 'ios' && (
        <Portal>
          <Dialog
            visible={showDatePicker}
            onDismiss={() => onShowDatePicker(false)}>
            <Dialog.Title>Select Date</Dialog.Title>
            <Dialog.Content>
              <DateTimePicker
                value={expense.date}
                mode="date"
                display="spinner"
                onChange={(_event, selectedDate) => {
                  if (selectedDate) {
                    onSetExpense({...expense, date: selectedDate});
                  }
                }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => onShowDatePicker(false)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  categoryButtons: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
