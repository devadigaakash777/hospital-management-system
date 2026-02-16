import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';

export default function BlockAvailabilityScreen() {
  return (
    <View style={styles.container}>
      <SettingItem
        title="Block Doctor Availability"
        subtitle="Block or unblock doctor availability"
        iconName="calendar-times"
        iconFamily="FontAwesome6"
        onPress={() => Alert.alert('Block Doctor Availability', 'Block Doctor Availability functionality coming soon!')}
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
