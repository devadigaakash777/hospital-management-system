import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Portal,
  Modal,
  Text,
  TextInput,
  Button,
  TouchableRipple,
} from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../theme';
import SearchablePicker from '../layout/SearchablePicker';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const statusOptions = ['All', 'Pending', 'Approved', 'Completed'];

const departments = {
  Cardiology:  ['OPD', 'IPD'],
  Orthopedics: ['OPD', 'IPD'],
  ENT:         ['OPD'],
};

type DepartmentKey = keyof typeof departments;

const AppointmentFilterModal: React.FC<Props> = ({ visible, onClose }) => {
  const [status, setStatus] = useState('All');
  const [department, setDepartment] = useState<DepartmentKey | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [search, setSearch] = useState('');
  const [activePicker, setActivePicker] = useState<'filter' | null>(null);

  const onDateChange = (e: DateTimePickerEvent, date?: Date) => {
    if (e.type === 'set' && date) {
      if (activePicker === 'filter') setFilterDate(date);
    }
    setActivePicker(null);
  };

  const clearFilters = () => {
    setStatus('All');
    setDepartment(null);
    setFilterDate(null);
    setSearch('');
  };

  return (
    // ✅ Portal + Modal replaces react-native-modal
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.container}
      >
        {/* ✅ Paper Text replaces RN Text */}
        <Text style={styles.title}>Appointment Filters</Text>

        {/* ✅ Paper TextInput replaces RN TextInput */}
        <Text style={styles.label}>Search</Text>
        <TextInput
          placeholder="Search By Status, Department..."
          value={search}
          onChangeText={setSearch}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* ✅ Picker unchanged — no Paper equivalent */}
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={setStatus}>
            {statusOptions.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* ✅ SearchablePicker unchanged — already converted */}
        <SearchablePicker
          label="Department"
          value={department}
          placeholder="Select Department"
          options={Object.keys(departments)}
          onSelect={value => setDepartment(value as DepartmentKey)}
        />

        {/* ✅ TouchableRipple replaces TouchableOpacity date box */}
        <Text style={styles.label}>Filter by Date</Text>
        <TouchableRipple
          style={styles.dateBox}
          onPress={() => setActivePicker('filter')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={styles.text}>
            {filterDate ? filterDate.toDateString() : 'Select Date'}
          </Text>
        </TouchableRipple>

        {/* ✅ Paper Button replaces TouchableOpacity actions */}
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={clearFilters}
            buttonColor={colors.border}
            textColor={colors.textPrimary}
            style={styles.actionBtn}
          >
            Clear Filters
          </Button>
          <Button
            mode="contained"
            onPress={onClose}
            buttonColor={colors.primary}
            textColor={colors.textPrimary}
            style={styles.actionBtn}
          >
            Apply
          </Button>
        </View>

        {/* ✅ DateTimePicker unchanged */}
        {activePicker && (
          <DateTimePicker
            value={filterDate ?? new Date()}
            mode="date"
            onChange={onDateChange}
          />
        )}
      </Modal>
    </Portal>
  );
};

export default AppointmentFilterModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 16,
    marginHorizontal: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    backgroundColor: colors.card,
    marginBottom: 14,
  },
  dateBox: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  text: {
    color: colors.textPrimary,
  },
  pickerContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 8,
  },
});