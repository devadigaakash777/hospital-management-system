import React, { useState } from 'react';
import { View } from 'react-native';
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
import { wp, hp } from '../../utils/responsive';

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
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: colors.background,
          padding: wp(4),
          marginHorizontal: 0,
          borderTopLeftRadius: wp(4),
          borderTopRightRadius: wp(4),
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: wp(5),
            fontWeight: '700',
            marginBottom: hp(1.5),
            color: colors.textPrimary,
          }}
        >
          Appointment Filters
        </Text>

        {/* Search */}
        <Text
          style={{
            marginBottom: hp(0.8),
            fontWeight: '600',
            color: colors.textPrimary,
          }}
        >
          Search
        </Text>
        <TextInput
          placeholder="Search By Status, Department..."
          value={search}
          onChangeText={setSearch}
          mode="outlined"
          style={{
            backgroundColor: colors.card,
            marginBottom: hp(1.8),
          }}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* Status */}
        <Text
          style={{
            marginBottom: hp(0.8),
            fontWeight: '600',
            color: colors.textPrimary,
          }}
        >
          Status
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: wp(2),
            marginBottom: hp(1.8),
          }}
        >
          <Picker selectedValue={status} onValueChange={setStatus}>
            {statusOptions.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* Department */}
        <SearchablePicker
          label="Department"
          value={department}
          placeholder="Select Department"
          options={Object.keys(departments)}
          onSelect={value => setDepartment(value as DepartmentKey)}
        />

        {/* Filter by Date */}
        <Text
          style={{
            marginBottom: hp(0.8),
            fontWeight: '600',
            color: colors.textPrimary,
          }}
        >
          Filter by Date
        </Text>
        <TouchableRipple
          style={{
            backgroundColor: colors.card,
            borderRadius: wp(2),
            padding: wp(3),
            marginBottom: hp(1.8),
          }}
          onPress={() => setActivePicker('filter')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={{ color: colors.textPrimary }}>
            {filterDate ? filterDate.toDateString() : 'Select Date'}
          </Text>
        </TouchableRipple>

        {/* Actions */}
        <View
          style={{
            flexDirection: 'row',
            gap: wp(2.5),
            marginTop: hp(1.5),
          }}
        >
          <Button
            mode="contained"
            onPress={clearFilters}
            buttonColor={colors.border}
            textColor={colors.textPrimary}
            style={{ flex: 1, borderRadius: wp(2) }}
          >
            Clear Filters
          </Button>
          <Button
            mode="contained"
            onPress={onClose}
            buttonColor={colors.primary}
            textColor={colors.textPrimary}
            style={{ flex: 1, borderRadius: wp(2) }}
          >
            Apply
          </Button>
        </View>

        {/* DateTimePicker */}
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