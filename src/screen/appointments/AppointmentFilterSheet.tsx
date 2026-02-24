import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { colors } from '../../theme';
import SearchablePicker from '../../components/layout/SearchablePicker';

/* ================= PROPS ================= */

interface Props {
  visible: boolean;
  onClose: () => void;
}

/* ================= DATA ================= */

const statusOptions = [
  'All',
  'Pending',
  'Approved',
  'Completed',
];

const departments = {
  Cardiology: ['OPD', 'IPD'],
  Orthopedics: ['OPD', 'IPD'],
  ENT: ['OPD'],
};

type DepartmentKey = keyof typeof departments;

/* ================= COMPONENT ================= */

const AppointmentFilterModal: React.FC<Props> = ({
  visible,
  onClose,
}) => {
  /* -------- STATES -------- */

  const [status, setStatus] = useState('All');
  const [department, setDepartment] =
    useState<DepartmentKey | null>(null);

  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [search, setSearch] = useState('');

  const [activePicker, setActivePicker] = useState<
    'filter' | 'from' | 'to' | null
  >(null);

  /* -------- DATE HANDLER -------- */

  const onDateChange = (
    e: DateTimePickerEvent,
    date?: Date,
  ) => {
    if (e.type === 'set' && date) {
      if (activePicker === 'filter') setFilterDate(date);
      if (activePicker === 'from') setFromDate(date);
      if (activePicker === 'to') setToDate(date);
    }
    setActivePicker(null);
  };

  /* -------- CLEAR FILTERS -------- */

  const clearFilters = () => {
    setStatus('All');
    setDepartment(null);
    setFilterDate(null);
    setFromDate(null);
    setToDate(null);
    setSearch('');
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Appointment Filters</Text>

         {/* -------- SEARCH (NORMAL INPUT) -------- */}
        <Text style={styles.label}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Search By Status, Department..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />

        {/* -------- STATUS -------- */}
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={setStatus}>
            {statusOptions.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* -------- DEPARTMENT -------- */}
        <SearchablePicker
          label="Department"
          value={department}
          placeholder="Select Department"
          options={Object.keys(departments)}
          onSelect={(value) =>
            setDepartment(value as DepartmentKey)
          }
        />

        {/* -------- FILTER BY DATE -------- */}
        <Text style={styles.label}>Filter by Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setActivePicker('filter')}
        >
          <Text style={styles.text}>
            {filterDate
              ? filterDate.toDateString()
              : 'Select Date'}
          </Text>
        </TouchableOpacity>

        {/* -------- DATE RANGE (SAME LINE) --------
        <Text style={styles.label}>Date Range</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.input, styles.half]}
            onPress={() => setActivePicker('from')}
          >
            <Text style={styles.text}>
              {fromDate ? fromDate.toDateString() : 'From'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.input, styles.half]}
            onPress={() => setActivePicker('to')}
          >
            <Text style={styles.text}>
              {toDate ? toDate.toDateString() : 'To'}
            </Text>
          </TouchableOpacity>
        </View> */}

       

        {/* -------- ACTIONS -------- */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.clear}
            onPress={clearFilters}
          >
            <Text style={styles.clearText}>Clear Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.apply}
            onPress={onClose}
          >
            <Text style={styles.btnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* -------- DATE PICKER -------- */}
      {activePicker && (
        <DateTimePicker
          value={
            (activePicker === 'filter' && filterDate) ||
            (activePicker === 'from' && fromDate) ||
            (activePicker === 'to' && toDate) ||
            new Date()
          }
          mode="date"
          onChange={onDateChange}
        />
      )}
    </Modal>
  );
};

export default AppointmentFilterModal;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: colors.background,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  clear: {
    flex: 1,
    backgroundColor: colors.border,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  clearText: {
    color: colors.textPrimary,
    fontWeight: '600',
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
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
