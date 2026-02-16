import { View, StyleSheet, Alert } from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';

export default function SlotConfigurationScreen() {
  return (
    <View style={styles.container}>
      <SettingItem
        title="Correct Doctor Slot Configuration"
        subtitle="Fix incorrect doctor slot configurations"
        iconName="wrench"
        iconFamily="FontAwesome6"
        onPress={() =>
          Alert.alert(
            'Correct Doctor Slot Configuration',
            'Correct Doctor Slot Configuration functionality coming soon!',
          )
        }
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
