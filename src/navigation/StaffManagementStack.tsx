import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme';

import CreateStaffScreen from '../screen/manageStaff/CreateStaffScreen';
import ManageStaffScreen from '../screen/manageStaff/ManageStaffScreen';

/* ------------------------------------------------ */
/* Stack Param List */
/* ------------------------------------------------ */

export type StaffStackParamList = {
  ManageStaffHome: undefined;
  CreateStaff: undefined;
};

const Stack = createNativeStackNavigator<StaffStackParamList>();

/* ------------------------------------------------ */
/* Navigator */
/* ------------------------------------------------ */

export default function StaffManagementStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="ManageStaffHome"
        component={ManageStaffScreen}
        options={{ title: 'Staff Management' }}
      />

      <Stack.Screen
        name="CreateStaff"
        component={CreateStaffScreen}
        options={{ title: 'Create or Edit Staff' }}
      />
    </Stack.Navigator>
  );
}
