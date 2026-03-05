import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import CreateStaffModal, { CreateStaffData } from './components/CreateStaffModal';

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  // store full data for pre-filling edit modal
  rawData: CreateStaffData;
}

const INITIAL_STAFF: Staff[] = [
  {
    id: '1',
    name: 'ANITHA S B',
    role: 'Dermatology Consultant',
    department: 'Dermatology',
    rawData: {
      name: 'ANITHA S B',
      role: 'Dermatology Consultant',
      departments: ['Dermatology'],
      permissions: ['Can Manage Staff'],
      group: '',
    },
  },
];

const ManageStaffScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);

  // ── Edit state ──
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  /* ── CREATE ── */
  const handleCreateStaff = (data: CreateStaffData) => {
    setStaffList(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: data.name,
        role: data.role || 'Staff',
        department:
          data.departments.length > 0
            ? data.departments.join(', ')
            : data.group || 'General',
        rawData: data,
      },
    ]);
  };

  /* ── EDIT ── */
  const handleEditPress = (staff: Staff) => {
    setEditingStaff(staff);
    setShowModal(true);
  };

  const handleEditStaff = (data: CreateStaffData) => {
    if (!editingStaff) return;
    setStaffList(prev =>
      prev.map(s =>
        s.id === editingStaff.id
          ? {
              ...s,
              name: data.name,
              role: data.role || 'Staff',
              department:
                data.departments.length > 0
                  ? data.departments.join(', ')
                  : data.group || 'General',
              rawData: data,
            }
          : s,
      ),
    );
    setEditingStaff(null);
  };

  /* ── DELETE ── */
  const handleDeletePress = (staff: Staff) => {
    Alert.alert(
      'Delete Staff',
      `Are you sure you want to delete "${staff.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setStaffList(prev => prev.filter(s => s.id !== staff.id)),
        },
      ],
    );
  };

  /* ── CLOSE MODAL ── */
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStaff(null);
  };

  /* ── CARD ── */
  const renderStaff = ({ item }: { item: Staff }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.role}</Text>
        <Text style={styles.meta}>{item.department}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => handleEditPress(item)}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDeletePress(item)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CreateStaffModal
        visible={showModal}
        onClose={handleCloseModal}
        onCreate={handleCreateStaff}
        editMode={!!editingStaff}
        initialData={editingStaff?.rawData}
        onEdit={handleEditStaff}
      />

      <FlatList
        data={staffList}
        keyExtractor={item => item.id}
        renderItem={renderStaff}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Manage Staff</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.addText}>+ Add Staff Member</Text>
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default ManageStaffScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  addBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 13, color: colors.textSecondary },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editBtn: {
    padding: 6,
  },
  editIcon: {
    fontSize: 18,
  },
  deleteBtn: {
    padding: 6,
  },
  deleteIcon: {
    fontSize: 18,
  },
});