import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Input, { InputProps } from './input';

const PasswordInput = ({ theme, ...rest }: InputProps) => {
  const [secure, setSecure] = useState(true);
  return (
    <Input
      {...rest}
      theme={theme}
      secureTextEntry={secure}
      right={
        <TextInput.Icon
          onPress={() => setSecure((prev) => !prev)}
          color={theme.colors.palette.secondary[secure ? 'light' : 'main']}
          name={secure ? 'eye' : 'eye-off'}
        />
      }
    />
  );
};

PasswordInput.displayName = 'Input.Password';
export default PasswordInput;
