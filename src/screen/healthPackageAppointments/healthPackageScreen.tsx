import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import IconButton from '../../components/ui/AppButton';
import { colors } from '../../theme';

import CreateHealthPackageModal from './components/CreateHealthPackageModal';
import { HealthPackage } from './types';

/* ======================
   CONSTANT PACKAGE DATA
   ====================== */
const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: '1',
    name: 'Abroad Health Checkup',
    description:
      'Comprehensive medical examination for international travel requirements. Includes complete medical tests and certification.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 3,
    visitingDays:
      'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
    advanceBooking: '7 days',
  },
  {
    id: '2',
    name: 'Cardio Diabetic Evaluation',
    description:
      'Specialized screening for heart and diabetes-related conditions. Includes blood sugar and cardiac function tests.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 4,
    visitingDays: 'Not Set',
    advanceBooking: '7 days',
  },
  {
    id: '3',
    name: 'Master Health Checkup',
    description:
      'Advanced health screening for adults including age-specific tests, cancer markers, and lifestyle counseling.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 4,
    visitingDays: 'Not Set',
    advanceBooking: '7 days',
  },
  {
    id: '4',
    name: 'Mini Health Checkup',
    description:
      'Basic health screening for routine monitoring and wellness. Includes blood tests and physical examination.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 4,
    visitingDays: 'Not Set',
    advanceBooking: '7 days',
  },
];

const ManageHealthPackages = () => {
  const [showModal, setShowModal] = useState(false);
  const [packages, setPackages] =
    useState<HealthPackage[]>(HEALTH_PACKAGES);

  const renderPackage = ({
    item,
  }: {
    item: HealthPackage;
  }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.packageTitle}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            OPD Timing: {item.opdTime}
          </Text>
          <Text style={styles.metaText}>
            Patients/Hour: {item.patientsPerHour}
          </Text>
        </View>

        <Text style={styles.metaText}>
          Visiting Days: {item.visitingDays}
        </Text>

        <Text style={styles.metaText}>
          Advance Booking: {item.advanceBooking}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Manage Health Packages</Text>
        <Text style={styles.subtitle}>
          Configure visiting days, OPD timings, and booking settings
          for health packages.
        </Text>

        <IconButton
          text="Create New Health Package"
          iconName="plus"
          iconFamily="Feather"
          backgroundColor={colors.primary}
          color={colors.textPrimary}
          onPress={() => setShowModal(true)}
        />
      </View>

      {/* MODAL */}
      <CreateHealthPackageModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreate={(data) => {
          setPackages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              name: data.name,
              description: data.description,
              opdTime: '09:00 AM - 05:00 PM',
              patientsPerHour: 4,
              visitingDays: 'Not Set',
              advanceBooking: '7 days',
            },
          ]);
        }}
      />

      {/* LIST */}
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={renderPackage}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ManageHealthPackages;

/* ======================
   STYLES
   ====================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // MUST be dark
  },
  header: {
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
});
