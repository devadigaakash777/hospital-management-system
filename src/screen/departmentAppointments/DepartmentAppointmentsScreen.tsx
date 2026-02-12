import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme';
import StatusFilterBar from './components/StatusFilterBar';

const DepartmentAppointmentsScreen = () => {
  const handleFilterChange = (status: string) => {
    console.log('Selected:', status);

    // In future:
    // fetchAppointments(status)
    // filter local data
  };

  return (
    <ScrollView style={styles.container}>
      <StatusFilterBar onFilterChange={handleFilterChange} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5,
  },
});

export default DepartmentAppointmentsScreen;
