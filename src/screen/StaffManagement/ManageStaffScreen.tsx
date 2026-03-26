import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useStaff, StaffData } from '../../context/StaffContext';
import {
  ConfirmModal,
  EntityCard,
  EntityCardRow,
  SearchInput,
} from '../../components';

const ManageStaffScreen = () => {
  const navigation = useNavigation<any>();
  const { staffList, deleteStaff } = useStaff();
  const [deleteConfirm, setDeleteConfirm] = useState<StaffData | null>(null);
  const [search, setSearch] = useState('');

  const filteredStaff = staffList.filter(item =>
    `${item.firstName ?? ''} ${item.lastName ?? ''}`
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.groupId ?? '').toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()),
  );

  const renderStaff = ({ item }: { item: StaffData }) => {
    const rows: EntityCardRow[] = [
      { icon: 'email-outline',          label: 'Email:',       value: item.email },
      { icon: 'shield-account-outline', label: 'Role:',        value: item.role },
      { icon: 'account-group',          label: 'Access:',      value: item.groupId ?? 'Manual Rights' },
      ...(item.departmentIds.length > 0
        ? [{ icon: 'map-marker-outline', label: 'Departments:', value: item.departmentIds.join(', ') }]
        : []),
      ...(!item.groupId
        ? [{
            icon: 'shield-key-outline',
            label: 'Permissions:',
            value: [
              item.canManageDoctorSlots    && 'Doctor Slots',
              item.canManageStaff          && 'Staff',
              item.canManageGroups         && 'Groups',
              item.canManageHealthPackages && 'Health Packages',
              item.canExportReports        && 'Reports',
            ].filter(Boolean).join(', ') || 'None',
          }]
        : []),
    ];

    return (
      <EntityCard
        title={`${item.firstName ?? ''} ${item.lastName ?? ''}`.trim()}
        subtitle={item.groupId ? item.groupId : 'Manual Rights'}
        rows={rows}
        footer={
          // ✅ Paper Button replaces AppButton
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateStaff', { editStaff: item })}
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
        data={filteredStaff}
        keyExtractor={item => item.id}
        renderItem={renderStaff}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>Manage Staff</Text>
            <Text style={styles.subtitle}>
              Create and manage staff accounts
            </Text>

            {/* ✅ SearchInput unchanged — already converted */}
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search staff..."
            />

            {/* ✅ Paper Button replaces TouchableOpacity + Text */}
            <Button
              mode="contained"
              icon="plus"
              onPress={() => navigation.navigate('CreateStaff', {})}
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.addBtn}
              labelStyle={styles.addBtnLabel}
            >
              Add Staff Member
            </Button>

            <Text style={styles.sectionLabel}>Current Staff Members</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No staff members found.</Text>
        }
      />

      {/* ✅ ConfirmModal unchanged — already converted */}
      <ConfirmModal
        visible={!!deleteConfirm}
        type="delete"
        message={
          deleteConfirm
            ? `Are you sure you want to delete "${`${deleteConfirm.firstName ?? ''} ${deleteConfirm.lastName ?? ''}`.trim()}"?`
            : undefined
        }
        onConfirm={() => {
          if (deleteConfirm) deleteStaff(deleteConfirm.id);
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </SafeAreaView>
  );
};

export default ManageStaffScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  addBtn: {
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  addBtnLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
});