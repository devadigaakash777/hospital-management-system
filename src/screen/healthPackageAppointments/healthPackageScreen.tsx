import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import {
  SearchInput,
  ConfirmModal,
  EntityCard,
  EntityCardRow,
} from '../../components';
import CreateHealthPackageModal from '../../components/manageHealthPackage/CreateHealthPackageModal';
import { HealthPackage } from '../../types/healthpackage.types';

const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: '1',
    name: 'Abroad Health Checkup',
    description: 'Comprehensive medical examination for international travel requirements. Includes complete medical tests and certification.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 3,
    visitingDays: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
    advanceBooking: '7 days',
  },
  {
    id: '2',
    name: 'Cardio Diabetic Evaluation',
    description: 'Specialized screening for heart and diabetes-related conditions. Includes blood sugar and cardiac function tests.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 4,
    visitingDays: 'Not Set',
    advanceBooking: '7 days',
  },
  {
    id: '3',
    name: 'Master Health Checkup',
    description: 'Advanced health screening for adults including age-specific tests, cancer markers, and lifestyle counseling.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 4,
    visitingDays: 'Not Set',
    advanceBooking: '7 days',
  },
  {
    id: '4',
    name: 'Mini Health Checkup',
    description: 'Basic health screening for routine monitoring and wellness. Includes blood tests and physical examination.',
    opdTime: '09:00 AM - 05:00 PM',
    patientsPerHour: 4,
    visitingDays: 'Not Set',
    advanceBooking: '7 days',
  },
];

const ManageHealthPackages = () => {
  const [showModal, setShowModal] = useState(false);
  const [packages, setPackages] = useState<HealthPackage[]>(HEALTH_PACKAGES);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<HealthPackage | null>(null);
  const [editPackage, setEditPackage] = useState<HealthPackage | null>(null);

  const filtered = packages.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderPackage = ({ item }: { item: HealthPackage }) => {
    const rows: EntityCardRow[] = [
      { icon: 'clock-outline',    label: 'OPD Timing:',      value: item.opdTime },
      { icon: 'account-group',    label: 'Patients/Hour:',   value: item.patientsPerHour },
      { icon: 'calendar-month',   label: 'Visiting Days:',   value: item.visitingDays },
      { icon: 'calendar-clock',   label: 'Advance Booking:', value: item.advanceBooking },
    ];

    return (
      <EntityCard
        title={item.name}
        subtitle={item.description}
        rows={rows}
        footer={
          // ✅ Paper Button replaces AppButton
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={() => { setEditPackage(item); setShowModal(true); }}
              icon="pencil"
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.actionBtn}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              onPress={() => setDeleteConfirm(item)}
              icon="delete"
              buttonColor={colors.error}
              textColor="#fff"
              style={styles.actionBtn}
            >
              Delete
            </Button>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderPackage}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>Manage Health Packages</Text>
            <Text style={styles.subtitle}>
              Configure visiting days, OPD timings, and booking settings
              for health packages.
            </Text>

            {/* ✅ SearchInput unchanged — already converted */}
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search health packages..."
            />

            {/* ✅ Paper Button replaces AppButton */}
            <Button
              mode="contained"
              icon="plus"
              onPress={() => { setEditPackage(null); setShowModal(true); }}
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.addBtn}
              labelStyle={styles.addBtnLabel}
            >
              Create New Health Package
            </Button>

            <Text style={styles.sectionLabel}>Available Packages</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No health packages found.</Text>
        }
      />

      {/* ✅ CreateHealthPackageModal unchanged — already converted */}
      <CreateHealthPackageModal
        visible={showModal}
        editPackage={editPackage}
        onClose={() => { setShowModal(false); setEditPackage(null); }}
        onCreate={data => {
          if (editPackage) {
            setPackages(prev =>
              prev.map(p =>
                p.id === editPackage.id
                  ? {
                      ...p,
                      name: data.name,
                      description: data.description,
                      patientsPerHour: Number(data.patientsPerHour) || p.patientsPerHour,
                      advanceBooking: data.advanceBooking || p.advanceBooking,
                      visitingDays: data.visitingDays.length > 0
                        ? data.visitingDays.join(', ')
                        : p.visitingDays,
                      opdTime: data.opdTimeRanges.length > 0
                        ? `${data.opdTimeRanges[0].from} - ${data.opdTimeRanges[0].to}`
                        : p.opdTime,
                    }
                  : p,
              ),
            );
          } else {
            setPackages(prev => [
              ...prev,
              {
                id: Date.now().toString(),
                name: data.name,
                description: data.description,
                opdTime: data.opdTimeRanges.length > 0
                  ? `${data.opdTimeRanges[0].from} - ${data.opdTimeRanges[0].to}`
                  : '09:00 AM - 05:00 PM',
                patientsPerHour: Number(data.patientsPerHour) || 4,
                visitingDays: data.visitingDays.length > 0
                  ? data.visitingDays.join(', ')
                  : 'Not Set',
                advanceBooking: data.advanceBooking || '7 days',
              },
            ]);
          }
          setEditPackage(null);
        }}
      />

      {/* ✅ ConfirmModal unchanged — already converted */}
      <ConfirmModal
        visible={!!deleteConfirm}
        type="delete"
        message={
          deleteConfirm
            ? `Are you sure you want to delete "${deleteConfirm.name}"?`
            : undefined
        }
        onConfirm={() => {
          if (deleteConfirm) {
            setPackages(prev => prev.filter(p => p.id !== deleteConfirm.id));
          }
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </SafeAreaView>
  );
};

export default ManageHealthPackages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  addBtn: {
    marginBottom: 16,
    marginTop: 8,
    borderRadius: 10,
  },
  addBtnLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
  },
});