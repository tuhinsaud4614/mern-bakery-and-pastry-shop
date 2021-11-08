import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AuthContainer from '../../components/auth-container';
import { RootNavigationProps } from '../../shared/routes';
import LoginForm from './form';

const LoginScreen = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  return (
    <AuthContainer
      memberProps={{
        text: 'Not a member',
        title: 'Register now',
        pressHandler() {
          navigate('Register');
        },
      }}
      title="Login"
      facebookBtnHandler={() => {}}
      googleBtnHandler={() => {}}
    >
      <LoginForm />
    </AuthContainer>
  );
};

export default LoginScreen;
