import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';

export default function ManageDoctorsScreen() {
  return (
    <View style={styles.container}>
      <SettingItem
        title="Manage Doctors"
        subtitle="Add, update and manage doctors"
        iconName="user-doctor"
        iconFamily="FontAwesome6"
        onPress={() => Alert.alert('Manage Doctors', 'Manage Doctors functionality coming soon!')}
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
