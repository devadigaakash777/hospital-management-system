import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../theme';

const AppointmentFilterSheet: React.FC = () => {
  const [status, setStatus] = useState('All');
  const [department, setDepartment] = useState('All');
  const [date, setDate] = useState('06-02-2026');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Management</Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>＋ Add Appointment</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search patients, phone, email, ID..."
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={status} onValueChange={setStatus}>
          <Picker.Item label="All Statuses" value="All" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Approved" value="Approved" />
          <Picker.Item label="Completed" value="Completed" />
        </Picker>
      </View>

      <Text style={styles.label}>Department</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={department} onValueChange={setDepartment}>
          <Picker.Item label="All Departments" value="All" />
          <Picker.Item label="Cardiology" value="Cardiology" />
          <Picker.Item label="Orthopedics" value="Orthopedics" />
          <Picker.Item label="ENT" value="ENT" />
        </Picker>
      </View>
    </View>
  );
};

export default AppointmentFilterSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 14,
  },
});
