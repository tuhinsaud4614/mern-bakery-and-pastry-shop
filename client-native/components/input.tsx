import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

interface Props {
  helperText?: string;
  classes?: {
    root?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    helper?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  };
}

const Input = ({
  classes,
  helperText,
  theme,
  ...rest
}: Props & TextInputProps) => {
  return (
    <View style={classes?.root}>
      <TextInput
        {...rest}
        outlineColor={theme.colors.palette.primary.light}
        theme={{
          ...theme,
          colors: {
            ...theme.colors,
            primary: theme.colors.palette.primary.main,
          },
        }}
      />
      {!!helperText && (
        <HelperText style={classes?.helper} type="error">
          {helperText}
        </HelperText>
      )}
    </View>
  );
};

Input.displayName = "Input";
export default Input;
