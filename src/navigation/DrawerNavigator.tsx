import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screen/DashboardScreen';
import { colors } from '../theme';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerStyle: { backgroundColor: colors.surface},
          headerTintColor: colors.text,
        }}

      />
    </Drawer.Navigator>
  );
}
