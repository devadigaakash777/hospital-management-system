import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DepartmentAppointmentsScreen from '../screen/departmentAppointments/DepartmentAppointmentsScreen';
import DoctorManagementScreen from '../screen/doctorManagement/DoctorManagementScreen';
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
  component: React.ComponentType<any>;
}[] = [
  {
    name: 'Department Appointments',
    icon: 'calendar-clear-outline',
    component: DepartmentAppointmentsScreen,
  },
  {
    name: 'Health Package Appointments',
    icon: 'heart-outline',
    component: HealthPackageScreen,
  },
  {
    name: 'Doctor Management',
    icon: 'person-outline',
    component: DoctorManagementScreen,
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
  const item = drawerItems.find(i => i.name === route.name);

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
      <Ionicons
        name={item?.icon ?? 'ellipse-outline'}
        size={size}
        color={color}
      />
    ),
  };
};

/* ----------------------------- */
/* Drawer Navigator */
/* ----------------------------- */

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 0, paddingHorizontal: 0 }}
        >
          <SafeAreaView
            edges={['top']}
            style={styles.headerContainer}
          >
            <AppHeader
              logo={require('../assets/admin-logo.jpg')}
              title="Admin Portal"
              subtitle="Adarsha Hospital Management"
            />
          </SafeAreaView>

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
    >
      {drawerItems.map(item => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = {
  headerContainer: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
};
