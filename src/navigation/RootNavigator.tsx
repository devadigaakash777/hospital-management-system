import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screen/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import AppointmentFilterPage from '../screen/appointments/AppointmentFilterPage';

export default function RootNavigator() {
  // 🔴 Toggle this flag for testing
  const SHOW_FILTER_ONLY = true;

  if (SHOW_FILTER_ONLY) {
    return <AppointmentFilterPage />;
  }

  // 🔵 Normal app flow
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <DrawerNavigator /> : <LoginScreen />;
}
