import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useState} from 'react';
import {Alert, Platform, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Dialog,
  HelperText,
  MD2Colors,
  Portal,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {Spinner} from './Spinner.tsx';
import {EXPENSE_CATEGORIES_OPTIONS} from '../constants/expenseCategories.ts';
import {selectIsLoading} from '../redux/selectors/loaderSelectors.ts';
import {Expense, ExpenseCategory, ExpenseData} from '../types/ExpenseTypes.ts';

interface ExpenseFormProps {
  title: string;
  submitTitle: string;
  expense: Expense;
  onSetExpense: (expense: Expense | ExpenseData) => void;
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
  const loading = useSelector(selectIsLoading);
  const [errors, setErrors] = useState({
    title: '',
    amount: '',
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      amount: '',
    };
    let isValid = true;

    if (expense.title && !expense.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!expense.amount) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else {
      const numAmount = parseFloat(expense.amount);
      if (isNaN(numAmount)) {
        newErrors.amount = 'Please enter a valid number';
        isValid = false;
      } else if (numAmount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
        isValid = false;
      } else if (numAmount > 999999.99) {
        newErrors.amount = 'Amount is too large';
        isValid = false;
      } else if (!/^\d+([.,]\d{0,2})?$/.test(expense.amount)) {
        newErrors.amount = 'Maximum 2 decimal places allowed';
        isValid = false;
      }
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

  const handleDeletePress = () => {
    if (Platform.OS === 'android') {
      Alert.alert(
        'Delete Expense',
        'Are you sure you want to delete this expense?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              onDelete?.();
              navigation.goBack();
            },
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    } else {
      setShowDeleteDialog(true);
    }
  };

  const handleConfirmDelete = () => {
    onDelete?.();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
        {onDelete &&
          (!loading ? (
            <Appbar.Action icon="delete" onPress={handleDeletePress} />
          ) : (
            <Spinner color={MD2Colors.red800} size={'small'} />
          ))}
      </Appbar.Header>

      {!expense ||
      expense.title === null ||
      expense.amount === null ||
      expense.category === null ||
      expense.date === null ? (
        <Text>Error: Expense data is incomplete</Text>
      ) : (
        <React.Fragment>
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
              onChangeText={text => {
                const regex = /^\d*[.,]?\d{0,2}$/;
                if (text === '' || regex.test(text)) {
                  onSetExpense({...expense, amount: text});
                }
              }}
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
              buttons={EXPENSE_CATEGORIES_OPTIONS}
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
                right={
                  <TextInput.Icon icon="calendar" onPressIn={onDatePress} />
                }
              />
            </TouchableRipple>

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}>
              {loading ? (
                <Spinner color={'white'} size={'small'} />
              ) : (
                submitTitle
              )}
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
                    value={new Date(expense.date as string)}
                    mode="date"
                    display="spinner"
                    onChange={(_event, selectedDate) => {
                      if (selectedDate) {
                        onSetExpense({
                          ...expense,
                          date: selectedDate.toISOString(),
                        });
                      }
                    }}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => onShowDatePicker(false)}>Done</Button>
                </Dialog.Actions>
              </Dialog>
              <Dialog
                visible={showDeleteDialog}
                onDismiss={() => setShowDeleteDialog(false)}>
                <Dialog.Title>Delete Expense</Dialog.Title>
                <Dialog.Content>
                  <Text>Are you sure you want to delete this expense?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onPress={handleConfirmDelete}
                    textColor={MD2Colors.red800}>
                    Delete
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          )}
        </React.Fragment>
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
