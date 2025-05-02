import {createStackNavigator} from '@react-navigation/stack';

import {AddExpenseScreen} from './AddExpenseScreen.tsx';
import {ExpensesScreen} from './ExpensesScreen.tsx';
import {ManageExpenseScreen} from './ManageExpenseScreen.tsx';

const Stack = createStackNavigator();

export const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="ExpensesScreen">
      <Stack.Screen
        name="ExpensesScreen"
        component={ExpensesScreen}
        options={{headerShown: false, title: 'ExpensesScreen'}}
      />
      <Stack.Screen
        name="AddExpenseScreen"
        component={AddExpenseScreen}
        options={{headerShown: false, title: 'AddExpenseScreen'}}
      />
      <Stack.Screen
        name="ManageExpenseScreen"
        component={ManageExpenseScreen}
        options={{headerShown: false, title: 'ManageExpenseScreen'}}
      />
    </Stack.Navigator>
  );
};
