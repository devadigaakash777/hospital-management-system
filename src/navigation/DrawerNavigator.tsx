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

import DepartmentAppointmentsScreen from '../screen/departmentAppointments/DepartmentAppointmentsScreen';
import DoctorManagementStack from './DoctorManagementStack';
import HealthPackageScreen from '../screen/healthPackageAppointments/healthPackageScreen';
import { AppHeader } from '../components';
import { colors } from '../theme';

/* ----------------------------- */
/* Drawer Param List */
/* ----------------------------- */

export type DrawerParamList = {
  'Department Appointments': undefined;
  'Health Package Appointments': undefined;
  'Doctor Management': undefined;
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
    name: 'Department Appointments',
    icon: 'calendar',
    component: DepartmentAppointmentsScreen,
  },
  {
    name: 'Health Package Appointments',
    icon: 'heart',
    component: HealthPackageScreen,
  },
  {
    name: 'Doctor Management',
    icon: 'user-doctor',
    component: DoctorManagementStack,
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
            item.name === 'Doctor Management'
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
