import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screen/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import AppointmentFilterPage from '../screen/appointments/AppointmentFilterPage';
import TestBottomSheet from '../screen/TestBottomSheet';

export default function RootNavigator() {

  return <TestBottomSheet />;
  // 🔴 TEMPORARY: force filter page
  const SHOW_FILTER_ONLY = true;

  if (SHOW_FILTER_ONLY) {
    return <AppointmentFilterPage />;
  }

  // 🔵 Original logic (keep it)
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <DrawerNavigator /> : <LoginScreen />;
}
