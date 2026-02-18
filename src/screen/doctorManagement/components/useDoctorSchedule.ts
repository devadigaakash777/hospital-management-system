import { useState } from 'react';
import { Alert } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const useDoctorSchedule = () => {
  const [opdFrom, setOpdFrom] = useState<Date | null>(null);
  const [opdTo, setOpdTo] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState<'from' | 'to' | null>(
    null,
  );

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const allDays = selectedDays.length === weekDays.length;

  const toggleDay = (day: string) => {
    let updated: string[];

    if (selectedDays.includes(day)) {
      updated = selectedDays.filter((d) => d !== day);
    } else {
      updated = [...selectedDays, day];
    }

    setSelectedDays(updated);
  };

  const toggleAllDays = (value: boolean) => {
    setSelectedDays(value ? weekDays : []);
  };

  const handleTimeChange = (
    type: 'from' | 'to',
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
    setShowTimePicker(null);

    if (event.type === 'dismissed' || !date) return;

    if (type === 'from') {
      if (opdTo && date >= opdTo) {
        Alert.alert(
          'Invalid Time',
          '"From" time must be earlier than "To" time',
        );
        return;
      }
      setOpdFrom(date);
    }

    if (type === 'to') {
      if (!opdFrom) {
        Alert.alert('Select From Time First');
        return;
      }

      if (date <= opdFrom) {
        Alert.alert('Invalid Time', '"To" time must be later than "From" time');
        return;
      }

      setOpdTo(date);
    }
  };

  return {
    weekDays,
    opdFrom,
    opdTo,
    showTimePicker,
    setShowTimePicker,
    handleTimeChange,
    selectedDays,
    toggleDay,
    toggleAllDays,
    allDays,
  };
};
