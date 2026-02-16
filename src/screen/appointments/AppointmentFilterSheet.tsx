import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AppointmentFilterModal: React.FC<Props> = ({ visible, onClose }) => {
  const [status, setStatus] = useState('All');
  const [department, setDepartment] = useState('All');

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Appointment Filters</Text>

        <Text style={styles.label}>Search</Text>
        <TextInput style={styles.input} placeholder="Search..." />

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={setStatus}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Approved" value="Approved" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
        </View>

        <Text style={styles.label}>Department</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={department} onValueChange={setDepartment}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Cardiology" value="Cardiology" />
            <Picker.Item label="Orthopedics" value="Orthopedics" />
            <Picker.Item label="ENT" value="ENT" />
          </Picker>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.apply}
            onPress={() => {
              onClose();
            }}
          >
            <Text style={styles.btnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentFilterModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textPrimary,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  cancel: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  apply: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
