import React from 'react';
import { View } from 'react-native';
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
import { wp, hp } from '../../utils/responsive';

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

  const timeBoxStyle = {
    flex: 3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: wp(2),
    padding: wp(2.5),
    backgroundColor: colors.card,
  };

  const inputStyle = {
    backgroundColor: colors.card,
    marginBottom: hp(1.5),
  };

  const btnStyle = {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  };

  return (
    <>
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

      {/* OPD Timing */}
      <Text
        style={{
          marginTop: hp(2),
          marginBottom: hp(1),
          fontWeight: '700',
          color: colors.textPrimary,
        }}
      >
        OPD Timing
      </Text>

      {/* Input Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: wp(1.5),
          marginBottom: hp(1),
        }}
      >
        <TouchableRipple
          style={timeBoxStyle}
          onPress={() => onOpenTimePicker('from')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={{ color: colors.textPrimary }}>{formatTime(currentFrom)}</Text>
        </TouchableRipple>

        <TouchableRipple
          style={timeBoxStyle}
          onPress={() => onOpenTimePicker('to')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={{ color: colors.textPrimary }}>{formatTime(currentTo)}</Text>
        </TouchableRipple>

        <TextInput
          value={currentPatients}
          onChangeText={onPatientsChange}
          keyboardType="numeric"
          placeholder="Pts"
          mode="outlined"
          style={{
            flex: 2,
            backgroundColor: colors.card,
            height: hp(5),
          }}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
          dense
        />

        <Button
          mode="contained"
          onPress={onAddTimeRange}
          disabled={!canAdd}
          buttonColor={canAdd ? colors.primary : colors.border}
          style={btnStyle}
          labelStyle={{
            color: colors.textPrimary,
            fontSize: wp(5),
            fontWeight: '600',
          }}
          compact
        >
          +
        </Button>
      </View>

      {/* Saved Ranges */}
      {(values.opdTimeRanges ?? []).map((range, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: wp(1.5),
            marginBottom: hp(1),
          }}
        >
          <View style={timeBoxStyle}>
            <Text style={{ color: colors.textPrimary }}>{formatTime(range.from)}</Text>
          </View>
          <View style={timeBoxStyle}>
            <Text style={{ color: colors.textPrimary }}>{formatTime(range.to)}</Text>
          </View>
          <View
            style={{
              flex: 2,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: wp(2),
              padding: wp(2.5),
              backgroundColor: colors.card,
            }}
          >
            <Text style={{ color: colors.textPrimary }}>{range.patients}</Text>
          </View>

          <Button
            mode="contained"
            onPress={() => onRemoveTimeRange(index)}
            buttonColor={colors.border}
            style={btnStyle}
            labelStyle={{
              color: colors.textSecondary,
              fontSize: wp(3.5),
              fontWeight: '600',
            }}
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

      {/* Visiting Days */}
      <Text
        style={{
          marginTop: hp(2),
          marginBottom: hp(1),
          fontWeight: '700',
          color: colors.textPrimary,
        }}
      >
        Visiting Days
      </Text>

      {/* Tab Row */}
      <View
        style={{
          flexDirection: 'row',
          gap: wp(5),
          marginBottom: hp(1.2),
        }}
      >
        {(['regular', 'specific'] as VisitingType[]).map(type => (
          <TouchableRipple
            key={type}
            onPress={() => onChange('visitingType', type)}
            rippleColor={colors.primary + '22'}
            style={{ paddingBottom: hp(0.5) }}
          >
            <Text
              style={[
                { color: colors.textSecondary },
                values.visitingType === type && {
                  color: colors.primary,
                  borderBottomWidth: 2,
                  borderBottomColor: colors.primary,
                },
              ]}
            >
              {type === 'regular' ? 'Regular Days' : 'Specific Week'}
            </Text>
          </TouchableRipple>
        ))}
      </View>

      <View style={{ marginBottom: hp(2.5) }}>
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

      {/* Room & Advance Booking */}
      <TextInput
        label="Room"
        value={values.roomNumber}
        onChangeText={val => onChange('roomNumber', val)}
        placeholder="e.g. Room 204"
        mode="outlined"
        style={inputStyle}
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
        style={inputStyle}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
      />
    </>
  );
};

export default DoctorForm;