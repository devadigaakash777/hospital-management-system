import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  TouchableRipple,
  TextInput,
  Button,
} from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { SearchablePicker } from '..';
import { colors } from '../../theme';
import RegularDaysSection from './RegularDaysSection';
import SpecificWeekSection from './SpecificWeekSection';
import {
  DoctorFormValues,
  VisitingType,
  WeekSelection,
} from '../../types/doctor.types';

interface Props {
  values: DoctorFormValues;
  departments: string[];
  users: string[];
  onChange: <K extends keyof DoctorFormValues>(
    key: K,
    value: DoctorFormValues[K],
  ) => void;
  showTimePicker: 'from' | 'to' | null;
  onOpenTimePicker: (type: 'from' | 'to') => void;
  onTimeChange: (
    type: 'from' | 'to',
    event: DateTimePickerEvent,
    date?: Date,
  ) => void;
  currentFrom: Date | null;
  currentTo: Date | null;
  currentPatients: string;
  onPatientsChange: (val: string) => void;
  onAddTimeRange: () => void;
  onRemoveTimeRange: (index: number) => void;
}

const DoctorForm: React.FC<Props> = ({
  values,
  departments,
  users,
  onChange,
  showTimePicker,
  onOpenTimePicker,
  onTimeChange,
  currentFrom,
  currentTo,
  currentPatients,
  onPatientsChange,
  onAddTimeRange,
  onRemoveTimeRange,
}) => {
  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'Select Time';

  const pickerValue =
    showTimePicker === 'from'
      ? currentFrom ?? new Date()
      : currentTo ?? new Date();

  const canAdd = !!currentFrom && !!currentTo && currentPatients.trim() !== '';

  return (
    <>
      {/* ✅ SearchablePicker unchanged */}
      <SearchablePicker
        label="User"
        labelColor={colors.textPrimary}
        value={values.user}
        options={users}
        onSelect={val => onChange('user', val)}
      />

      <SearchablePicker
        label="Department"
        labelColor={colors.textPrimary}
        value={values.department}
        options={departments}
        onSelect={val => onChange('department', val)}
      />

      <Text style={styles.sectionTitle}>OPD Timing</Text>

      {/* ✅ Input row: From | To | Patients | + */}
      <View style={styles.rangeRow}>

        {/* ✅ TouchableRipple replaces TouchableOpacity time boxes */}
        <TouchableRipple
          style={styles.timeBox}
          onPress={() => onOpenTimePicker('from')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={styles.text}>{formatTime(currentFrom)}</Text>
        </TouchableRipple>

        <TouchableRipple
          style={styles.timeBox}
          onPress={() => onOpenTimePicker('to')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={styles.text}>{formatTime(currentTo)}</Text>
        </TouchableRipple>

        {/* ✅ Paper TextInput replaces RN TextInput for patients */}
        <TextInput
          value={currentPatients}
          onChangeText={onPatientsChange}
          keyboardType="numeric"
          placeholder="Pts"
          mode="outlined"
          style={styles.patientsInput}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
          dense
        />

        {/* ✅ Paper Button replaces add icon TouchableOpacity */}
        <Button
          mode="contained"
          onPress={onAddTimeRange}
          disabled={!canAdd}
          buttonColor={canAdd ? colors.primary : colors.border}
          style={styles.addIconBtn}
          labelStyle={styles.addIconText}
          compact
        >
          +
        </Button>
      </View>

      {/* ✅ Saved ranges */}
      {(values.opdTimeRanges ?? []).map((range, index) => (
        <View key={index} style={styles.rangeRow}>
          <View style={styles.timeBox}>
            <Text style={styles.text}>{formatTime(range.from)}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.text}>{formatTime(range.to)}</Text>
          </View>
          <View style={styles.patientsBox}>
            <Text style={styles.text}>{range.patients}</Text>
          </View>

          {/* ✅ Paper Button replaces remove TouchableOpacity */}
          <Button
            mode="contained"
            onPress={() => onRemoveTimeRange(index)}
            buttonColor={colors.border}
            style={styles.removeBtn}
            labelStyle={styles.removeBtnText}
            compact
          >
            ✕
          </Button>
        </View>
      ))}

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={pickerValue}
          onChange={(event, date) => onTimeChange(showTimePicker, event, date)}
        />
      )}

      <Text style={styles.sectionTitle}>Visiting Days</Text>

      {/* ✅ TouchableRipple replaces TouchableOpacity tabs */}
      <View style={styles.tabRow}>
        {(['regular', 'specific'] as VisitingType[]).map(type => (
          <TouchableRipple
            key={type}
            onPress={() => onChange('visitingType', type)}
            rippleColor={colors.primary + '22'}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabText,
                values.visitingType === type && styles.activeTab,
              ]}
            >
              {type === 'regular' ? 'Regular Days' : 'Specific Week'}
            </Text>
          </TouchableRipple>
        ))}
      </View>

      <View style={styles.tabContainer}>
        {values.visitingType === 'regular' && (
          <RegularDaysSection
            weekDays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            selectedDays={values.regularDays}
            allDays={values.regularDays.length === 7}
            toggleDay={(day: string) => {
              const updated = values.regularDays.includes(day)
                ? values.regularDays.filter(d => d !== day)
                : [...values.regularDays, day];
              onChange('regularDays', updated);
            }}
            toggleAllDays={(value: boolean) => {
              const updated = value
                ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                : [];
              onChange('regularDays', updated);
            }}
          />
        )}

        {values.visitingType === 'specific' && (
          <SpecificWeekSection
            selected={values.specificWeeks}
            onToggle={(week, day) => {
              const updated: WeekSelection = {
                ...values.specificWeeks,
                [week]: values.specificWeeks[week]?.includes(day)
                  ? values.specificWeeks[week].filter(d => d !== day)
                  : [...(values.specificWeeks[week] || []), day],
              };
              onChange('specificWeeks', updated);
            }}
          />
        )}
      </View>

      {/* ✅ Paper TextInput replaces InputField */}
      <TextInput
        label="Room"
        value={values.roomNumber}
        onChangeText={val => onChange('roomNumber', val)}
        placeholder="e.g. Room 204"
        mode="outlined"
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
      />

      <TextInput
        label="Advance Booking Days"
        keyboardType="numeric"
        value={values.advanceBookingDays}
        onChangeText={val => onChange('advanceBookingDays', val)}
        mode="outlined"
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
      />
    </>
  );
};

export default DoctorForm;

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  timeBox: {
    flex: 3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.card,
  },
  patientsBox: {
    flex: 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.card,
  },
  patientsInput: {
    flex: 2,
    backgroundColor: colors.card,
    height: 40,
  },
  text: {
    color: colors.textPrimary,
  },
  addIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  tabItem: {
    paddingBottom: 4,
  },
  tabText: {
    color: colors.textSecondary,
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 12,
  },
});