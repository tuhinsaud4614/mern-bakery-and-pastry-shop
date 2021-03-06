import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AuthContainer from '../../components/auth-container';
import { RootNavigationProps } from '../../shared/routes';
import RegisterForm from './form';

const RegisterScreen = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  return (
    <AuthContainer
      memberProps={{
        text: 'Already a member',
        title: 'Login',
        pressHandler() {
          navigate('Login');
        },
      }}
      title="Registration"
      facebookBtnHandler={() => {}}
      googleBtnHandler={() => {}}
    >
      <RegisterForm />
    </AuthContainer>
  );
};

export default RegisterScreen;
