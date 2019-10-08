import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { fontPlaceholderColor, white } from '~/styles/colors';

const Input = ({ onChangeText, style, ...rest }: TextInputProps) => {
  return (
    <TextInput
      {...rest}
      keyboardAppearance="dark"
      onChangeText={onChangeText}
      placeholderTextColor={fontPlaceholderColor}
      style={[styles.input, style]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: white,
    borderRadius: 6,
    padding: 15,
    color: white,
    fontSize: 18,
  },
});
