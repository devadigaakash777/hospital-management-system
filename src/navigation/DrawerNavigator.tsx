import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import DepartmentAppointmentsScreen from '../screen/HomeScreen/DepartmentAppointmentsScreen';
import DoctorManagementStack from './DoctorManagementStack';
import HealthPackageScreen from '../screen/HealthPackageAppointments/HealthPackageScreen';
// import ManageGroupsScreen from '../screen/groups/ManageGroupsScreen';
import StaffManagementStack from './StaffManagementStack';
import GroupManagementStack from './GroupManagementStack';
import { AppHeader } from '../components';
import { colors } from '../theme';
import DepartmentManagementStack from './DepartmentManagementStack';

/* ----------------------------- */
/* Drawer Param List */
/* ----------------------------- */

export type DrawerParamList = {
  'Appointment Management': undefined;
  'Health Package Appointments': undefined;
  'Department Management': undefined;
  'Doctor Management': undefined;
  'Staff Management': undefined;
  'Group Management': undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

/* ----------------------------- */
/* Drawer Items */
/* ----------------------------- */

const drawerItems: {
  name: keyof DrawerParamList;
  icon: string;
  component: React.ComponentType<unknown>;
}[] = [
  {
    name: 'Appointment Management',
    icon: 'calendar',
    component: DepartmentAppointmentsScreen,
  },
  {
    name: 'Health Package Appointments',
    icon: 'heart',
    component: HealthPackageScreen,
  },
  {
    name: 'Department Management',
    icon: 'building',
    component: DepartmentManagementStack,
  },
  {
    name: 'Doctor Management',
    icon: 'user-doctor',
    component: DoctorManagementStack,
  },
  {
    name: 'Staff Management',
    icon: 'users-gear',
    component: StaffManagementStack,
  },
  {
    name: 'Group Management',
    icon: 'user-group',
    component: GroupManagementStack,
  },
];

/* ----------------------------- */
/* screenOptions */
/* ----------------------------- */

const screenOptions = ({
  route,
}: {
  route: RouteProp<DrawerParamList, keyof DrawerParamList>;
}): DrawerNavigationOptions => {
  const item = drawerItems.find((i) => i.name === route.name);

  return {
    drawerStyle: {
      backgroundColor: colors.surface,
    },
    drawerActiveTintColor: colors.primary,
    drawerInactiveTintColor: colors.textPrimary,
    drawerActiveBackgroundColor: colors.background,
    drawerItemStyle: {
      borderRadius: 0,
      marginHorizontal: 0,
    },
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerTintColor: colors.textPrimary,
    drawerIcon: ({ color, size }) => (
      <FontAwesome6 name={item?.icon ?? 'circle'} size={size} color={color} />
    ),
  };
};

/* ----------------------------- */
/* Custom Drawer Content */
/* ----------------------------- */

const CustomDrawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContentScrollView
    {...props}
    contentContainerStyle={styles.drawerContent}
  >
    <SafeAreaView edges={['top']} style={styles.headerContainer}>
      <AppHeader
        logo={require('../assets/admin-logo.jpg')}
        title="Admin Portal"
        subtitle="Adarsha Hospital Management"
      />
    </SafeAreaView>

    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

/* ----------------------------- */
/* Drawer Navigator */
/* ----------------------------- */

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={CustomDrawerContent}
    >
      {drawerItems.map((item) => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={
            item.name === 'Doctor Management' || item.name === 'Staff Management' || item.name === 'Group Management'||item.name === 'Department Management'
              ? { headerShown: false }
              : undefined
          }
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = {
  drawerContent: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  headerContainer: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
};