import React, { useState } from 'react';
import { StyleSheet, View, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { colors } from '../../theme';

import StatusFilterBar from '../../components/HomeScreen/StatusFilterBar';
import AppointmentCard from '../../components/HomeScreen/AppointmentCard';
import CreateAppointmentModal from '../../components/HomeScreen/CreateAppointmentModal';
import FilterHeader from '../../components/HomeScreen/FilterHeader';
import AppointmentFilterSheet from '../../components/HomeScreen/AppointmentFilterModal';

import { ListRenderItem } from 'react-native';

/* ---------------- Types ---------------- */

type Appointment = {
  id: string;
  name: string;
  bookedBy: string;
  phoneNumber: string;
  department: string;
  doctorName: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  token: string;
  patientMessage: string;
  status: 'confirmed' | 'cancelled' | 'admitted';
};

/* ---------------- Dummy Data ---------------- */

const APPOINTMENTS_DATA: Appointment[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    bookedBy: 'Vishak',
    phoneNumber: '9481365071',
    department: 'Cardiology',
    doctorName: 'Dr. Sharma',
    date: '12 Feb 2026',
    timeFrom: '10:00 AM',
    timeTo: '10:30 AM',
    token: 'Token #1',
    patientMessage: 'Severe chest pain',
    status: 'confirmed',
  },
  {
    id: '2',
    name: 'Suresh Naik',
    bookedBy: 'Akash',
    phoneNumber: '9481515140',
    department: 'Neurology',
    doctorName: 'Dr. Rao',
    date: '13 Feb 2026',
    timeFrom: '11:00 AM',
    timeTo: '11:30 AM',
    token: 'Token #2',
    patientMessage: 'Frequent headaches',
    status: 'cancelled',
  },
  {
    id: '3',
    name: 'Meena Shetty',
    bookedBy: 'Admin',
    phoneNumber: '9481515140',
    department: 'Orthopedics',
    doctorName: 'Dr. Patil',
    date: '14 Feb 2026',
    timeFrom: '09:30 AM',
    timeTo: '10:00 AM',
    token: 'Token #3',
    patientMessage: 'Knee pain',
    status: 'admitted',
  },
];

const handleCall = (phoneNumber: string) => {
  Linking.openURL(`tel:${phoneNumber}`).catch(() => {
    Alert.alert('Error', 'Unable to open dialer');
  });
};

const renderItem: ListRenderItem<Appointment> = ({ item }) => (
  <AppointmentCard
    name={item.name}
    bookedBy={item.bookedBy}
    phoneNumber={item.phoneNumber}
    department={item.department}
    doctorName={item.doctorName}
    date={item.date}
    timeFrom={item.timeFrom}
    timeTo={item.timeTo}
    token={item.token}
    patientMessage={item.patientMessage}
    status={item.status}
    onCallPress={() => handleCall(item.phoneNumber)}
    onDeletePress={() =>
      Alert.alert(
        'Delete Appointment',
        `Are you sure you want to delete appointment for ${item.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive' },
        ],
      )
    }
  />
);

const DepartmentAppointmentsScreen = () => {
  const handleFilterChange = (status: string) => {
    Alert.alert('filter', status);
  };

  const [filterVisible, setFilterVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={APPOINTMENTS_DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              {/* ✅ Paper Button replaces AppButton */}
              <Button
                mode="contained"
                icon="plus"
                onPress={() => setCreateModalVisible(true)}
                buttonColor={colors.primary}
                textColor={colors.textPrimary}
                style={styles.addBtn}
              >
              Add Appointment
              </Button>

              {/* ✅ All below unchanged — already converted */}
              <StatusFilterBar onFilterChange={handleFilterChange} />
              <FilterHeader
                onDayChange={day =>
                  Alert.alert('Day Filter', `Selected day: ${day}`)
                }
                onAdvancedFilterPress={() => setFilterVisible(true)}
              />
            </View>
          }
        />

        <AppointmentFilterSheet
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
        />
        <CreateAppointmentModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default DepartmentAppointmentsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  addBtn: {
    marginBottom: 8,
    borderRadius: 8,
  },
});