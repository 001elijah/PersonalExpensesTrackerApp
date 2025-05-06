import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Button, Dialog, FAB, Portal, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {ExpenseCard} from '../components/ExpenseCard.tsx';
import {NoExpensesMessage} from '../components/NoExpensesMessage.tsx';
import {Spinner} from '../components/Spinner.tsx';
import {UserInfo} from '../components/UserInfo.tsx';
import {getCurrentUserInfo, logout} from '../redux/operations/authOperations';
import {read} from '../redux/operations/expensesOperations.ts';
import {selectUser} from '../redux/selectors/authSelectors';
import {selectExpenses} from '../redux/selectors/expensesSelectors.ts';
import {selectIsLoading} from '../redux/selectors/loaderSelectors.ts';
import {AppDispatch} from '../redux/store';
import {HomeStackParamList} from '../types/HomeStackParamList';
import {RootStackParamList} from '../types/RootStackParamList';

type ExpensesScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const ExpensesScreen = () => {
  const navigation = useNavigation<ExpensesScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const expenses = useSelector(selectExpenses);
  const theme = useTheme();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutPress = () => {
    setShowLogoutDialog(true);
  };
  const handleLogOut = async () => {
    setShowLogoutDialog(false);
    await dispatch(logout());
    navigation.replace('AuthScreen');
  };
  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(read(user?.uid)); // expenses
    }
  }, [dispatch, user?.uid]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <UserInfo user={user} onLogoOut={handleLogoutPress} />
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          bounces={true}
          contentContainerStyle={styles.listContainer}
          data={expenses}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          ListEmptyComponent={<NoExpensesMessage />}
          renderItem={({item}) => (
            <ExpenseCard
              key={item.id}
              onNavigate={() =>
                navigation.navigate('ManageExpenseScreen', {expense: item})
              }
              expense={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Portal>
        <Dialog
          visible={showLogoutDialog}
          onDismiss={() => setShowLogoutDialog(false)}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to log out?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowLogoutDialog(false)}>Cancel</Button>
            <Button onPress={handleLogOut}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={() =>
          navigation.navigate('AddExpenseScreen', {uid: user?.uid})
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
});
