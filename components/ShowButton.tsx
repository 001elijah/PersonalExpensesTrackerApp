import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ShowButtonProps = {
  onPress: () => void;
}

export const ShowButton = ({onPress}: ShowButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.showPasswordButton}>
      <Text style={styles.showPasswordText}>Show</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  showPasswordButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  showPasswordText: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: 400,
  },
});
