import {
  View,
  StyleSheet,
} from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { DoctorStackParamList } from '../../navigation/DoctorManagementStack';

type NavigationProp = NativeStackNavigationProp<
  DoctorStackParamList,
  'DoctorManagementHome'
>;

export default function DoctorManagementHomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <SettingItem
        title="Manage Departments"
        subtitle="Add, update and manage departments"
        iconName="hospital-building"
        iconFamily="MaterialCommunityIcons"
        onPress={() => navigation.navigate('ManageDepartments')}
      />

      <SettingItem
        title="Manage Doctors"
        subtitle="Add, update and manage doctors"
        iconName="user-doctor"
        iconFamily="FontAwesome6"
        onPress={() => navigation.navigate('ManageDoctors')}
      />

      <SettingItem
        title="Block Doctor Availability"
        subtitle="Block or unblock doctor availability"
        iconName="calendar-times"
        iconFamily="FontAwesome6"
        onPress={() => navigation.navigate('BlockAvailability')}
      />

      <SettingItem
        title="Correct Doctor Slot Configuration"
        subtitle="Fix incorrect doctor slot configurations"
        iconName="wrench"
        iconFamily="FontAwesome6"
        onPress={() => navigation.navigate('SlotConfiguration')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
