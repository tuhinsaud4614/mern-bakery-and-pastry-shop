/* eslint-disable no-undef */
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import Typography from '../../../components/typography';
import { boxShadow } from '../../utils';

const detailNavigationOptions = (
  theme: ReactNativePaper.Theme,
  title: string
): NativeStackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: theme.colors.palette.primary.main,
      ...boxShadow(3),
    },
    headerTintColor: theme.colors.palette.warning.main,
    headerTitle: () => (
      <Typography
        variant="h6"
        style={{ color: theme.colors.palette.common.white }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {title}
      </Typography>
    ),
  };
};

export default detailNavigationOptions;
