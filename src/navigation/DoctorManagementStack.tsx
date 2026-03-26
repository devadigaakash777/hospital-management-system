import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme';

import DoctorManagementHomeScreen from '../screen/DoctorManagement/DoctorManagementHomeScreen';
import ManageDoctorsScreen from '../screen/DoctorManagement/ManageDoctorsScreen';
import BlockAvailabilityScreen from '../screen/DoctorManagement/BlockAvailabilityScreen';

/* ------------------------------------------------ */
/* Stack Param List */
/* ------------------------------------------------ */

export type DoctorStackParamList = {
  DoctorManagementHome: undefined;
  ManageDoctors: undefined;
  BlockAvailability: undefined;
};

const Stack = createNativeStackNavigator<DoctorStackParamList>();

/* ------------------------------------------------ */
/* Navigator */
/* ------------------------------------------------ */

export default function DoctorManagementStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="DoctorManagementHome"
        component={DoctorManagementHomeScreen}
        options={{ title: 'Doctor Management' }}
      />

      <Stack.Screen
        name="ManageDoctors"
        component={ManageDoctorsScreen}
        options={{ title: 'Manage Doctors' }}
      />

      <Stack.Screen
        name="BlockAvailability"
        component={BlockAvailabilityScreen}
        options={{ title: 'Block Availability' }}
      />

    </Stack.Navigator>
  );
}
