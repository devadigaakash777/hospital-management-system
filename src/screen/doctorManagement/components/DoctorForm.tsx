import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { InputField, SearchablePicker } from '../../../components';
import { colors } from '../../../theme';
import RegularDaysSection from './RegularDaysSection';
import SpecificWeekSection from './SpecificWeekSection';
import {
  DoctorFormValues,
  VisitingType,
  WeekSelection,
} from '../../../types/doctor.types';

interface Props {
  values: DoctorFormValues;
  departments: string[];

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
}

const DoctorForm: React.FC<Props> = ({
  values,
  departments,
  onChange,
  showTimePicker,
  onOpenTimePicker,
  onTimeChange,
}) => {
  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Select Time';

  const pickerValue =
    showTimePicker === 'from'
      ? values.opdFrom ?? new Date()
      : values.opdTo ?? new Date();

  return (
    <>
      <InputField
        label="Doctor Name"
        value={values.doctorName}
        onChangeText={(val) => onChange('doctorName', val)}
      />

      <SearchablePicker
        label="Department"
        labelColor={colors.textPrimary}
        value={values.department}
        options={departments}
        onSelect={(val) => onChange('department', val)}
      />

      <Text style={styles.sectionTitle}>OPD Timing</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => onOpenTimePicker('from')}
        >
          <Text style={styles.text}>{formatTime(values.opdFrom)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => onOpenTimePicker('to')}
        >
          <Text style={styles.text}>{formatTime(values.opdTo)}</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={pickerValue}
          onChange={(event, date) => onTimeChange(showTimePicker, event, date)}
        />
      )}

      <Text style={styles.sectionTitle}>Visiting Days</Text>

      <View style={styles.tabRow}>
        {(['regular', 'specific'] as VisitingType[]).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => onChange('visitingType', type)}
          >
            <Text
              style={[
                styles.tabText,
                values.visitingType === type && styles.activeTab,
              ]}
            >
              {type === 'regular' ? 'Regular Days' : 'Specific Week'}
            </Text>
          </TouchableOpacity>
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
                ? values.regularDays.filter((d) => d !== day)
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
                  ? values.specificWeeks[week].filter((d) => d !== day)
                  : [...(values.specificWeeks[week] || []), day],
              };

              onChange('specificWeeks', updated);
            }}
          />
        )}
      </View>

      <InputField
        label="Patients Per Hour"
        keyboardType="numeric"
        value={values.patientsPerHour}
        onChangeText={(val) => onChange('patientsPerHour', val)}
      />

      <InputField
        label="Advance Booking Days"
        keyboardType="numeric"
        value={values.advanceBookingDays}
        onChangeText={(val) => onChange('advanceBookingDays', val)}
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
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.card,
  },
  text: {
    color: colors.textPrimary,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  tabText: {
    color: colors.textSecondary,
    paddingBottom: 4,
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabContainer: { marginBottom: 20 },
});
