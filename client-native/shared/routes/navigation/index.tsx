import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { RootStackParamList } from '..';
import CategoryScreen from '../../../screens/category';
import DetailScreen from '../../../screens/detail';
import RegisterScreen from '../../../screens/register';
import detailNavigationOptions from './navigation-options';
import TabBarContainer from './tab-bar';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const theme = useTheme();
  return (
    <RootStack.Navigator initialRouteName="Register">
      <RootStack.Screen
        name="Tabs"
        component={TabBarContainer}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Category"
        component={CategoryScreen}
        // initialParams={{ id: '123', title: 'hello', }}
        options={() => detailNavigationOptions(theme, 'Category')}
      />
      <RootStack.Screen
        name="Detail"
        component={DetailScreen}
        // initialParams={{ productId: '', title: '' }}
        options={() => detailNavigationOptions(theme, 'Detail')}
      />
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={() => ({ header: () => null })}
      />
    </RootStack.Navigator>
  );
};

RootStackNavigator.displayName = 'RootStackNavigator';
export default RootStackNavigator;
