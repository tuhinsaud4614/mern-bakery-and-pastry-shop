/* eslint-disable react-native/no-inline-styles */
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import Typography from '../../../components/typography';
import { useBreakpointsWithDimensions } from '../../../shared/hooks';
import { boxShadow } from '../../../shared/utils';
import UserImage from '../user-image';
import OverviewForms from './forms';

const Overview = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');
  return (
    <View style={[styles.root, isSmUp && { flexDirection: 'row' }]}>
      <View
        style={[
          styles.header,
          isSmUp && {
            width: 250,
            justifyContent: 'flex-start',
          },
        ]}
      >
        <UserImage />
        <View style={styles.text}>
          <Typography
            variant={isSmUp ? 'h6' : 'body1'}
            numberOfLines={2}
            style={{
              color: theme.colors.palette.text.primary,
              fontWeight: '500',
            }}
            textAlign="center"
          >
            Tuhin Saud
          </Typography>
          <View style={{ paddingVertical: theme.spacing * 0.5 }} />
          <Typography
            variant={isSmUp ? 'body1' : 'body2'}
            numberOfLines={2}
            style={{ color: theme.colors.palette.text.secondary }}
            textAlign="center"
          >
            t@gmail.com
          </Typography>
        </View>
        <Button
          mode="contained"
          onPress={() => {}}
          icon={(props) => <AntDesign {...props} name="logout" />}
          color={theme.colors.palette.secondary.main}
          style={{
            marginBottom: theme.spacing,
            width: '100%',
          }}
        >
          Logout
        </Button>
      </View>
      {!isSmUp && <Divider />}
      <OverviewForms />
    </View>
  );
};

Overview.displayName = 'Overview';
export default Overview;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      ...boxShadow(3, 1),
      backgroundColor: theme.colors.palette.accent,
      overflow: 'hidden',
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing * 1.5,
      paddingVertical: theme.spacing,
    },
    text: {
      paddingVertical: theme.spacing,
    },
  });
};
