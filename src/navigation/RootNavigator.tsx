import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screen/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <DrawerNavigator /> : <LoginScreen />;
}
