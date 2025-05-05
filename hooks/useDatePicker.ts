import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Platform} from 'react-native';

import {Expense} from '../types/ExpenseTypes.ts';

interface UseDatePickerProps {
  date: Date;
  onDateChange: (date: Expense['date']) => void;
}

export const useDatePicker = ({ date, onDateChange }: UseDatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePress = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date ?? new Date(),
        mode: 'date',
        onChange: (event, selectedDate) => {
          if (selectedDate && event.type === 'set') {
            onDateChange(selectedDate.toISOString());
          }
        },
      });
    } else {
      setShowDatePicker(true);
    }
  };

  return {
    showDatePicker,
    setShowDatePicker,
    handleDatePress,
  };
};
