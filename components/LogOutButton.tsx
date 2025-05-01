import * as React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

interface LogOutButtonProps {
  onPress: () => Promise<void>;
}

export const LogOutButton = ({ onPress }: LogOutButtonProps) => (
  <IconButton
    icon="logout"
    mode="contained-tonal"
    size={24}
    onPress={onPress}
    style={styles.button}
  />
);

const styles = StyleSheet.create({
  button: {
    margin: 0,
  },
});
