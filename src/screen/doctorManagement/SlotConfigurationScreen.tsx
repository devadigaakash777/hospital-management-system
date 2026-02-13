import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
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
