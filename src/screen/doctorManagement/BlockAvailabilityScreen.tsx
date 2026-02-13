import {
  View,
  StyleSheet,
} from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';

export default function BlockAvailabilityScreen() {
  return (
    <View style={styles.container}>
      <SettingItem
        title="Manage Departments"
        subtitle="Add, update and manage departments"
        iconName="hospital-building"
        iconFamily="MaterialCommunityIcons"
        onPress={() => console.log('Doctor Management')}
      />

      <SettingItem
        title="Manage Doctors"
        subtitle="Add, update and manage doctors"
        iconName="user-doctor"
        iconFamily="FontAwesome6"
        onPress={() => console.log('Manage Doctors')}
      />

      <SettingItem
        title="Block Doctor Availability"
        subtitle="Block or unblock doctor availability"
        iconName="calendar-times"
        iconFamily="FontAwesome6"
        onPress={() => console.log('Block Doctor Availability')}
      />
      <SettingItem
        title="Correct Doctor Slot Configuration"
        subtitle="Fix incorrect doctor slot configurations"
        iconName="wrench"
        iconFamily="FontAwesome6"
        onPress={() => console.log('Correct Doctor Slot Configuration')}
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
