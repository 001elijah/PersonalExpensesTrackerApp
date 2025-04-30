import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {AuthFormProps} from '../types/AuthStackParamList.ts';

type ToggleAuthProps = AuthFormProps & {
  text: string;
  prompt: string;
}

export const ToggleAuth = ({text, prompt, onNavigate}: ToggleAuthProps) => {
  return (
    <View style={styles.secondaryButtonStyle}>
      <Text style={styles.secondaryButtonTextStyle}>
        {text}
        <Text style={styles.underlinedText} onPress={onNavigate}>
          {prompt}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryButtonStyle: {
    height: 19,
    alignItems: 'center',
    marginBottom: 78,
  },
  secondaryButtonTextStyle: {
    color: '#1B4371',
    fontSize: 16,
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
});
