import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import DepartmentAppointmentsScreen from '../screen/departmentAppointments/DepartmentAppointmentsScreen';
import { colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppHeader } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  { name: 'Department Appointments', icon: 'calendar-clear-outline' },
  { name: 'Health Package Appointments', icon: 'heart-outline' },
  { name: 'Call Back Requests', icon: 'call-outline' },
  { name: 'Job Applications', icon: 'briefcase-outline' },
] as const;

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
          contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 0 }}
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
      )}
    >
      {drawerItems.map(item => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={DepartmentAppointmentsScreen}
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = {
  headerContainer: {
    paddingBottom: 10,
    marginBottom: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.border
  },
}
