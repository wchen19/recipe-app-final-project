import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../constants';

const AppTextInput = ({...otherProps}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={COLORS.black}
      style={[
        {
          padding: 20,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          marginVertical: 10,
          color: COLORS.black,
          ...FONTS.body3,
        },
        focused && {
          borderWidth: 3,
          borderColor: COLORS.black,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
