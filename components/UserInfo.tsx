import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {LogOutButton} from './LogOutButton.tsx';
import {Spinner} from './Spinner.tsx';
import {selectIsLoading} from '../redux/selectors/loaderSelectors.ts';
import {User} from '../types/User.ts';

type UserInfoProps = {
  user: User;
  onLogoOut: () => Promise<void>;
}

export const UserInfo = ({user, onLogoOut}: UserInfoProps) => {
  const loading = useSelector(selectIsLoading);
  return (
    <Surface style={styles.userInfoContainer} elevation={1}>
      {loading ?
        <Spinner size={'small'}/> :
        <React.Fragment>
          <Text style={styles.userName}>Welcome, {user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.logoutButton}>
            <LogOutButton onPress={onLogoOut} />
          </View>
        </React.Fragment>
      }
    </Surface>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 16,
    marginTop: 4,
    opacity: 0.7,
  },
  logoutButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});
