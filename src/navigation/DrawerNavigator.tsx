import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import DashboardScreen from '../screen/dashboard/DashboardScreen';
import { colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* ----------------------------- */
/* Drawer Param List */
/* ----------------------------- */

export type DrawerParamList = {
  'Department Appointments': undefined;
  'Health Package Appointments': undefined;
  'Call Back Requests': undefined;
  'Job Applications': undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const drawerItems = [
  {
    name: 'Department Appointments',
    icon: 'calendar-clear-outline',
  },
  {
    name: 'Health Package Appointments',
    icon: 'heart-outline',
  },
  {
    name: 'Call Back Requests',
    icon: 'call-outline',
  },
  {
    name: 'Job Applications',
    icon: 'briefcase-outline',
  },
] as const;

/* ----------------------------- */
/* Stable screenOptions */
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
    drawerInactiveTintColor: colors.text,
    drawerActiveBackgroundColor: colors.background,
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    drawerIcon: ({ color, size }) => (
      <Ionicons
        name={item?.icon ?? 'ellipse-outline'}
        size={size}
        color={color}
      />
    ),
  };
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      {drawerItems.map(item => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={DashboardScreen}
        />
      ))}
    </Drawer.Navigator>
  );
}
