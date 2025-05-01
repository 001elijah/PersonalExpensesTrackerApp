import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, List, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {ExpenseCard} from '../components/ExpenseCard.tsx';
import {Spinner} from '../components/Spinner.tsx';
import {UserInfo} from '../components/UserInfo.tsx';
import {getCurrentUserInfo, logout} from '../redux/operations/authOperations';
import {selectUser} from '../redux/selectors/authSelectors';
import {AppDispatch} from '../redux/store';
import {ExpenseData} from '../types/ExpenseTypes.ts';
import {HomeStackParamList} from '../types/HomeStackParamList';
import {RootStackParamList} from '../types/RootStackParamList';

type ExpensesScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const getMockExpenses = (): ExpenseData[] => {
  return [
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 85.5,
      category: 'Food' as const,
      date: new Date('2024-03-15'),
    },
    {
      id: '2',
      title: 'Bus Ticket',
      amount: 25.0,
      category: 'Transport' as const,
      date: new Date('2024-03-14'),
    },
    {
      id: '3',
      title: 'Electricity Bill',
      amount: 120.75,
      category: 'Bills' as const,
      date: new Date('2024-03-13'),
    },
  ].sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const ExpensesScreen = () => {
  const navigation = useNavigation<ExpensesScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const handleLogOut = async () => {
    await dispatch(logout());
    navigation.replace('AuthScreen');
  };

  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [dispatch]);

  useEffect(() => {
    // TODO: Dispatch action to get expenses
    setTimeout(() => {
      setExpenses(getMockExpenses());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {user && user.name && <UserInfo user={user} onLogoOut={handleLogOut} />}

      {loading ? (
        <Spinner />
      ) : (
        <List.Section>
          {expenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </List.Section>
      )}

      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={() => navigation.navigate('AddExpenseScreen')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
