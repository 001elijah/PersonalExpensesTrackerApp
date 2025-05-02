import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Platform} from 'react-native';

interface UseDatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export const useDatePicker = ({ date, onDateChange }: UseDatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePress = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        mode: 'date',
        onChange: (event, selectedDate) => {
          if (selectedDate && event.type === 'set') {
            onDateChange(selectedDate);
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
