import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme';

import DoctorManagementHomeScreen from '../screen/doctorManagement/DoctorManagementHomeScreen';
import ManageDepartmentsScreen from '../screen/doctorManagement/ManageDepartmentsScreen';
import ManageDoctorsScreen from '../screen/doctorManagement/ManageDoctorsScreen';
import BlockAvailabilityScreen from '../screen/doctorManagement/BlockAvailabilityScreen';
import SlotConfigurationScreen from '../screen/doctorManagement/SlotConfigurationScreen';

/* ------------------------------------------------ */
/* Stack Param List */
/* ------------------------------------------------ */

export type DoctorStackParamList = {
  DoctorManagementHome: undefined;
  ManageDepartments: undefined;
  ManageDoctors: undefined;
  BlockAvailability: undefined;
  SlotConfiguration: undefined;
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
        name="ManageDepartments"
        component={ManageDepartmentsScreen}
        options={{ title: 'Manage Departments' }}
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

      <Stack.Screen
        name="SlotConfiguration"
        component={SlotConfigurationScreen}
        options={{ title: 'Slot Configuration' }}
      />
    </Stack.Navigator>
  );
}
