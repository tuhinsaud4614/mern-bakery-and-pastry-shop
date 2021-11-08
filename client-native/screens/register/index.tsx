import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, TouchableRipple, useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Logo from '../../components/logo';
import Spacer from '../../components/spacer';
import Typography from '../../components/typography';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import RegisterForm from './form';

const RegisterScreen = () => {
  const theme = useTheme();
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');
  const styles = makeStyles(theme, isSmUp);

  return (
    <Container contentContainerStyle={styles.container}>
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Logo />
          </View>
          <Typography
            variant="h4"
            style={{ color: theme.colors.palette.primary.dark }}
          >
            Registration
          </Typography>
          <View style={styles.socialBtnContainer}>
            <Button
              onPress={() => {}}
              style={!isSmUp && styles.socialBtn}
              mode="contained"
              color="#1a73e8"
              icon={(props) => <AntDesign {...props} name="google" />}
            >
              Google
            </Button>
            <Spacer weight={theme.spacing * 2} direction="horizontal" />
            <Button
              onPress={() => {}}
              style={!isSmUp && styles.socialBtn}
              mode="contained"
              color="#3b5998"
              icon={(props) => <AntDesign {...props} name="facebook-square" />}
            >
              Facebook
            </Button>
          </View>
        </View>
        <View style={styles.breaker}>
          <Divider style={styles.breakerLine} />
          <Spacer weight={theme.spacing * 2} direction="horizontal" />
          <Typography variant="body1">OR</Typography>
          <Spacer weight={theme.spacing * 2} direction="horizontal" />
          <Divider style={styles.breakerLine} />
        </View>
        <RegisterForm />
        <View style={styles.member}>
          <Typography variant="h6">Already a member?</Typography>
          <Spacer direction="horizontal" />
          <TouchableRipple onPress={() => {}}>
            <Typography
              style={{ color: theme.colors.palette.secondary.main }}
              variant="h6"
            >
              Login
            </Typography>
          </TouchableRipple>
        </View>
      </View>
    </Container>
  );
};

export default RegisterScreen;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme, isSmUp: boolean) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    root: {
      maxWidth: 600,
      width: '100%',
      marginTop: theme.spacing * 4,
    },
    header: {
      width: '100%',
    },
    logo: {
      height: 60,
      width: 180,
      marginBottom: theme.spacing * 1,
    },
    socialBtnContainer: {
      paddingVertical: theme.spacing,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    socialBtn: {
      flex: 1,
    },
    breaker: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    breakerLine: {
      flex: 1,
    },
    member: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isSmUp ? 'flex-start' : 'center',
      paddingVertical: theme.spacing,
    },
  });
};
