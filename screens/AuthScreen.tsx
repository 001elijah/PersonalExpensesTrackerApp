import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from './LoginScreen.tsx';
import {RegistrationScreen} from './RegistrationScreen.tsx';

const Stack = createStackNavigator();

export const AuthScreen = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false, title: 'LoginScreen'}}
            />
            <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
                options={{headerShown: false, title: 'RegistrationScreen'}}
            />
        </Stack.Navigator>
    );
};
