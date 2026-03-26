import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DoctorScheduleTab from '../../components/ManageDoctor/DoctorScheduleTab';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput, ConfirmModal } from '../../components';
import AddDoctorModal from '../../components/ManageDoctor/AddDoctorModal';
import { DoctorFormValues, WeekSelection } from '../../types/doctor.types';

interface DoctorSchedule {
  id: string;
  doctorName: string;
  department: string;
  roomNumber?: string;
  opdTiming: string;
  visitingDays: string;
  totalSlots: number;
}

export default function ManageDoctorsScreen() {
  const [data, setData] = useState<DoctorSchedule[]>([
    {
      id: '1',
      doctorName: 'Dr. Rajesh Kumar',
      department: 'Cardiology',
      roomNumber: 'Room 204',
      opdTiming: '09:00 AM - 02:00 PM',
      visitingDays: 'Mon - Sat',
      totalSlots: 40,
    },
    {
      id: '2',
      doctorName: 'Dr. Anjali Sharma',
      department: 'Dermatology',
      opdTiming: '10:00 AM - 04:00 PM',
      visitingDays: 'Full Time',
      totalSlots: 36,
    },
    {
      id: '3',
      doctorName: 'Dr. Vivek Rao',
      department: 'Orthopedics',
      roomNumber: 'Room 110',
      opdTiming: '08:00 AM - 01:00 PM',
      visitingDays: 'Mon, Wed, Fri',
      totalSlots: 25,
    },
  ]);

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingValues, setEditingValues] = useState<Partial<DoctorFormValues> | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredData = data.filter(
    item =>
      item.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => setDeleteConfirm(id);

  const handleEdit = (item: DoctorSchedule) => {
    setEditingValues({
      user: item.doctorName,
      department: item.department,
      roomNumber: item.roomNumber ?? '',
      opdTimeRanges: [],
      visitingType: 'regular',
      regularDays: [],
      specificWeeks: {} as WeekSelection,
      advanceBookingDays: '',
    });
    setIsEditMode(true);
    setModalVisible(true);
  };

  const handleAddDoctor = () => {
    setEditingValues(undefined);
    setIsEditMode(false);
    setModalVisible(true);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>Manage Doctors</Text>
            <Text style={styles.subtitle}>
              Add and manage hospital doctors
            </Text>

            {/* ✅ SearchInput unchanged — already converted */}
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search doctor or department..."
            />

            {/* ✅ Paper Button replaces TouchableOpacity + MaterialCommunityIcons + Text */}
            <Button
              mode="contained"
              icon="plus"
              onPress={handleAddDoctor}
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.addBtn}
              labelStyle={styles.addBtnLabel}
            >
              Add Doctor
            </Button>

            <Text style={styles.sectionLabel}>Current Doctors</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No doctors found.</Text>
        }
        renderItem={({ item }) => (
          // ✅ DoctorScheduleTab unchanged — already converted
          <DoctorScheduleTab
            doctorName={item.doctorName}
            department={item.department}
            roomNumber={item.roomNumber}
            opdTiming={item.opdTiming}
            visitingDays={item.visitingDays}
            totalSlots={item.totalSlots}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item)}
          />
        )}
      />

      {/* ✅ AddDoctorModal unchanged — already converted */}
      <AddDoctorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialValues={editingValues}
        isEditMode={isEditMode}
      />

      {/* ✅ ConfirmModal unchanged — already converted */}
      <ConfirmModal
        visible={!!deleteConfirm}
        type="delete"
        onConfirm={() => {
          setData(prev => prev.filter(item => item.id !== deleteConfirm));
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
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
});