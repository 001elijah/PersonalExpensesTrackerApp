import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
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

export const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const [expense, setExpense] = useState<Expense>({
    title: '',
    amount: 0,
    category: 'Food',
    date: new Date(),
  });
  const [errors, setErrors] = useState({
    title: '',
    amount: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleDatePress = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: expense.date,
        mode: 'date',
        onChange: (event, selectedDate) => {
          if (selectedDate && event.type === 'set') {
            setExpense({...expense, date: selectedDate});
          }
        },
      });
    } else {
      setShowDatePicker(true);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Saving expense:', {
        ...expense,
        amount: Number(expense.amount),
      });
      // TODO: Dispatch action to save expense
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Expense" />
      </Appbar.Header>

      <Surface style={styles.form}>
        <TextInput
          label="Title"
          value={expense.title}
          onChangeText={text => setExpense({...expense, title: text})}
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
          onChangeText={text => setExpense({...expense, amount: +text})}
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
            setExpense({...expense, category: value as ExpenseCategory})
          }
          buttons={[
            {value: 'Food', label: 'Food'},
            {value: 'Transport', label: 'Transport'},
            {value: 'Bills', label: 'Bills'},
            {value: 'Other', label: 'Other'},
          ]}
          style={styles.categoryButtons}
        />

        <TouchableRipple onPressIn={handleDatePress}>
          <TextInput
            label="Date"
            value={format(expense.date, 'PPP')}
            onPress={handleDatePress}
            mode="outlined"
            style={styles.input}
            editable={false}
            right={
              <TextInput.Icon icon="calendar" onPressIn={handleDatePress} />
            }
          />
        </TouchableRipple>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Add Expense
        </Button>
      </Surface>

      {Platform.OS === 'ios' && (
        <Portal>
          <Dialog
            visible={showDatePicker}
            onDismiss={() => setShowDatePicker(false)}>
            <Dialog.Title>Select Date</Dialog.Title>
            <Dialog.Content>
              <DateTimePicker
                value={expense.date}
                mode="date"
                display="spinner"
                onChange={(_event, selectedDate) => {
                  if (selectedDate) {
                    setExpense({...expense, date: selectedDate});
                  }
                }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowDatePicker(false)}>Done</Button>
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
