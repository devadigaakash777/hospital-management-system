import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function ManageGroupsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Write Code For Manage Groups</Text>
      <Text style={styles.content}>
        List of Groups and add new groups(refer below path model for adding new
        group)
      </Text>
      <Text style={styles.content}>
        C:\HMS\HospitalManagementSystem\src\screen\manageStaff\components\ManualRightsSection.tsx
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.textPrimary,
  },
  content: {
    fontSize: 14,
    color: colors.textPrimary,
  },
});
