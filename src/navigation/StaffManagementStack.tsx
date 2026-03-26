import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '../theme';
import CreateStaffScreen from '../screen/StaffManagement/CreateStaffScreen';
import ManageStaffScreen from '../screen/StaffManagement/ManageStaffScreen';
import { StaffProvider, StaffData } from '../context/StaffContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

/* ------------------------------------------------ */
/* Stack Param List */
/* ------------------------------------------------ */

export type StaffStackParamList = {
  ManageStaffHome: undefined;
  CreateStaff: {
    editStaff?: StaffData;
  } | undefined;
};

const Stack = createNativeStackNavigator<StaffStackParamList>();

/* ── Hamburger button ── */
const DrawerToggle = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ paddingHorizontal: 12 }}
    >
      <FontAwesome6 name="bars" size={20} color={colors.textPrimary} />
    </TouchableOpacity>
  );
};

/* ------------------------------------------------ */
/* Navigator */
/* ------------------------------------------------ */

export default function StaffManagementStack() {
  return (
    <StaffProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
        }}
      >
        <Stack.Screen
          name="ManageStaffHome"
          component={ManageStaffScreen}
          options={{
            title: 'Staff Management',
            headerLeft: () => <DrawerToggle />,
          }}
        />
        <Stack.Screen
          name="CreateStaff"
          component={CreateStaffScreen}
          options={({ route }) => ({
            title: route.params?.editStaff ? 'Edit Staff' : 'Create Staff',
          })}
/>
      </Stack.Navigator>
    </StaffProvider>
  );
}