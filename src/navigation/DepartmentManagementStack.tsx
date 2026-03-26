import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';
import { TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ManageDepartmentsScreen from '../screen/DepartmentManagement/ManageDepartmentsScreen';

export type DepartmentStackParamList = {
  ManageDepartmentsHome: undefined;
};

const Stack = createNativeStackNavigator<DepartmentStackParamList>();

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

export default function DepartmentManagementStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="ManageDepartmentsHome"
        component={ManageDepartmentsScreen}
        options={{
          title: 'Department Management',
          headerLeft: () => <DrawerToggle />,
        }}
      />
    </Stack.Navigator>
  );
}