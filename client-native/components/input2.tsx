import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import { typographyStyles } from '../shared/utils/common.styles';

export interface Input2Props {
  helperText?: string;
  error?: boolean;
  classes?: {
    wrapper?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    root?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
    helper?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  };
}

const Input2 = ({
  classes,
  helperText,
  error = false,
  onBlur,
  onFocus,
  ...rest
}: Input2Props & TextInputProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [focus, setFocus] = useState(false);

  const focusHandler = (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
    type: 'focus' | 'blur'
  ) => {
    if (type === 'focus') {
      setFocus(true);
      onFocus && onFocus(e);
    } else {
      setFocus(false);
      onBlur && onBlur(e);
    }
  };

  return (
    <View style={classes?.wrapper}>
      <TextInput
        {...rest}
        style={StyleSheet.flatten([
          styles.root,
          {
            borderColor: theme.colors.palette.primary[focus ? 'light' : 'main'],
          },
          error && { borderColor: theme.colors.palette.secondary.main },
          classes?.root,
        ])}
        onFocus={(e) => focusHandler(e, 'focus')}
        onBlur={(e) => focusHandler(e, 'blur')}
      />
      {!!helperText && (
        <HelperText style={classes?.helper} type="error">
          {helperText}
        </HelperText>
      )}
    </View>
  );
};

Input2.displayName = 'Input2';
export default Input2;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      ...typographyStyles.body2,
      padding: theme.spacing,
      borderRadius: theme.spacing * 0.5,
      borderWidth: 1,
    },
  });
};
