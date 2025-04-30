import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {type PropsWithChildren, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';

import {LogOutButton} from '../components/LogOutButton.tsx';
import {
  getCurrentUserInfo,
  logout,
} from '../redux/operations/authOperations.ts';
import {selectUser} from '../redux/selectors/authSelectors.ts';
import {AppDispatch} from '../redux/store.ts';
import {RootStackParamList} from '../types/RootStackParamList.ts';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  const handleLogOut = async () => {
    await dispatch(logout());
    navigation.replace('AuthScreen');
  };

  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [dispatch]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors?.darker : Colors?.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';
  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header />
          {user && user.name && (
            <View style={styles.userInfoContainer}>
              <Text
                style={[
                  styles.userName,
                  {
                    color: isDarkMode ? Colors.white : Colors.black,
                  },
                ]}>
                Welcome, {user.name}
              </Text>
              <Text
                style={[
                  styles.userEmail,
                  {
                    color: isDarkMode ? Colors.light : Colors.dark,
                  },
                ]}>
                {user.email}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.5}
            onPress={handleLogOut}>
            <LogOutButton />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    padding: 16,
    marginTop: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 16,
    marginTop: 4,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logoutButton: {
    marginRight: 16,
  },
});
