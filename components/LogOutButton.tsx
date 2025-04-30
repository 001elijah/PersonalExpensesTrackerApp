import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export const LogOutButton = () => (
  <View style={styles.container}>
    <Svg width={24} height={24} fill="none">
      <Path
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
