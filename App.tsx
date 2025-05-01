import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store from './redux/store';
import {AuthScreen} from './screens/AuthScreen.tsx';
import {HomeScreen} from './screens/HomeScreen.tsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <StoreProvider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen">
              <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
