import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const Spinner = ({ size = 'large', color }: {size?: number | 'small' | 'large' | undefined, color?: string | undefined}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
