import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function HealthPackageScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Write Code For Health Packages</Text>
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
});
