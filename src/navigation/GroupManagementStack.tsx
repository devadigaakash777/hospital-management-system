import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '../theme';
import CreateGroupScreen from '../screen/groups/CreateGroupScreen';
import ManageGroupScreen from '../screen/groups/ManageGroupsScreen';
import { GroupsProvider, GroupData } from '../context/GroupContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export type GroupStackParamList = {
  ManageGroupHome: undefined;
  CreateGroupScreen: {
    editGroup?: GroupData;
  } | undefined;
};

const Stack = createNativeStackNavigator<GroupStackParamList>();

/* ── Hamburger button component ── */
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

export default function GroupManagementStack() {
  return (
    <GroupsProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
        }}
      >
        <Stack.Screen
          name="ManageGroupHome"
          component={ManageGroupScreen}
          options={{
            title: 'Group Management',
            headerLeft: () => <DrawerToggle />,  // ← hamburger replaces back button
          }}
        />
        <Stack.Screen
          name="CreateGroupScreen"
          component={CreateGroupScreen}
          options={{ title: 'Create or Edit Group' }}
          // ← default back button shows here, no hamburger needed
        />
      </Stack.Navigator>
    </GroupsProvider>
  );
}