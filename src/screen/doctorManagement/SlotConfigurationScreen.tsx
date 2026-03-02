import React, { useState } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import DoctorScheduleTab from './components/DoctorScheduleTab';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput } from '../../components';

interface DoctorSchedule {
  id: string;
  doctorName: string;
  department: string;
  roomNumber?: string;
  opdTiming: string;
  visitingDays: string;
  patientsPerHour: number;
  slotsPerHour: number;
  slotsPerDay: number;
}

export default function SlotConfigurationScreen() {
  const [data, setData] = useState<DoctorSchedule[]>([
    {
      id: '1',
      doctorName: 'Dr. Rajesh Kumar',
      department: 'Cardiology',
      roomNumber: 'Room 204',
      opdTiming: '09:00 AM - 02:00 PM',
      visitingDays: 'Mon - Sat',
      patientsPerHour: 6,
      slotsPerHour: 8,
      slotsPerDay: 40,
    },
    {
      id: '2',
      doctorName: 'Dr. Anjali Sharma',
      department: 'Dermatology',
      opdTiming: '10:00 AM - 04:00 PM',
      visitingDays: 'Full Time',
      patientsPerHour: 5,
      slotsPerHour: 6,
      slotsPerDay: 36,
    },
    {
      id: '3',
      doctorName: 'Dr. Vivek Rao',
      department: 'Orthopedics',
      roomNumber: 'Room 110',
      opdTiming: '08:00 AM - 01:00 PM',
      visitingDays: 'Mon, Wed, Fri',
      patientsPerHour: 4,
      slotsPerHour: 5,
      slotsPerDay: 25,
    },
  ]);

  const [search, setSearch] = useState('');

  const handleSearchChange = (text: string) => {
    setSearch(text);
    // console.log('Search value:', text);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setData((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <SearchInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Search doctor or department..."
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.doctorScheduleContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DoctorScheduleTab
            doctorName={item.doctorName}
            department={item.department}
            roomNumber={item.roomNumber}
            opdTiming={item.opdTiming}
            visitingDays={item.visitingDays}
            patientsPerHour={item.patientsPerHour}
            slotsPerHour={item.slotsPerHour}
            slotsPerDay={item.slotsPerDay}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  doctorScheduleContainer: { paddingHorizontal: 16 },
});
