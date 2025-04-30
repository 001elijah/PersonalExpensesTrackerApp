import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type SubmitAuthProps = {
  onSubmit: () => void;
  text: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const SubmitAuth = ({onSubmit, text, icon, disabled}: SubmitAuthProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        disabled && styles.buttonDisabled,
      ]}
      activeOpacity={0.5}
      onPress={onSubmit}
      disabled={disabled}
    >
      {text && <Text style={styles.buttonTextStyle}>{icon || text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FF6C00',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#FF6C00',
    height: 51,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 16,
  },
  buttonTextStyle: {
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
