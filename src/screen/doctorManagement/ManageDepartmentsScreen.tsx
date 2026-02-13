import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';

export default function ManageDepartmentsScreen() {
  return (
    <View style={styles.container}>
      <SettingItem
        title="Manage Departments"
        subtitle="Add, update and manage departments"
        iconName="hospital-building"
        iconFamily="MaterialCommunityIcons"
        onPress={() => console.log('Manage Departments')}
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
