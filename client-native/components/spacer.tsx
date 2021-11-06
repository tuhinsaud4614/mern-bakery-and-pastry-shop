import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  weight?: number;
  direction?: 'vertical' | 'horizontal' | 'all';
}

const Spacer = ({ direction = 'all', weight = 8 }: Props) => {
  let styles: StyleProp<ViewStyle>;
  if (direction === 'horizontal') {
    styles = { paddingHorizontal: weight / 2 };
  } else if (direction === 'vertical') {
    styles = { paddingVertical: weight / 2 };
  } else {
    styles = { padding: weight / 2 };
  }
  return <View style={styles} />;
};

export default Spacer;
