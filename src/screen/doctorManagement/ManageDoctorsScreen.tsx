import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '../../theme';
import SearchablePicker from '../../components/layout/SearchablePicker';
import { AppButton } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDoctorModal from './components/AddDoctorModal';
import DoctorForm from './components/DoctorForm';
import { useDoctorSchedule } from './components/useDoctorSchedule';
import { DoctorFormValues, WeekSelection } from '../../types/doctor.types';
import { validateDoctorForm } from './components/doctor.validation';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const departmentsData = ['Cardiology', 'Dermatology', 'GeneralMedicine'];
const doctorData = [
  'Dr. Sunil G',
  'Dr. Anitha R',
  'Dr. Kavya M',
  'Dr. Ramesh K',
];

const DoctorSelectionSection = () => {
  const [department, setDepartment] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const departments = ['Cardiology', 'Dermatology', 'General Medicine'];
  const { showTimePicker, setShowTimePicker } = useDoctorSchedule();

  const [values, setValues] = useState<DoctorFormValues>({
    doctorName: '',
    department: null,
    opdFrom: null,
    opdTo: null,
    visitingType: 'regular',
    regularDays: [],
    specificWeeks: {} as WeekSelection,
    patientsPerHour: '',
    advanceBookingDays: '',
  });

  const handleChange = <K extends keyof DoctorFormValues>(
    key: K,
    value: DoctorFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTimeChange = (
    type: 'from' | 'to',
    event: DateTimePickerEvent,
    date?: Date,
  ): void => {
    setShowTimePicker(null);

    if (event.type === 'dismissed' || !date) return;

    if (type === 'from') {
      if (values.opdTo && date >= values.opdTo) {
        Alert.alert('Invalid Time', '"From" must be earlier than "To"');
        return;
      }
      handleChange('opdFrom', date);
    }

    if (type === 'to') {
      if (!values.opdFrom) {
        Alert.alert('Select From Time First');
        return;
      }

      if (date <= values.opdFrom) {
        Alert.alert('Invalid Time', '"To" must be later than "From"');
        return;
      }

      handleChange('opdTo', date);
    }
  };

  const handleSubmit = () => {
    const error = validateDoctorForm(values);
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }
    // const payload = {
    //   ...values,
    //   regularDays:
    //     values.visitingType === 'regular' ? values.regularDays : null,
    //   specificWeeks:
    //     values.visitingType === 'specific' ? values.specificWeeks : null,
    //   patientsPerHour: Number(values.patientsPerHour),
    //   advanceBookingDays: Number(values.advanceBookingDays),
    // };

    // console.log('FINAL PAYLOAD:', payload);
    Alert.alert('Doctor Added (Check Console)');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchablePicker
          label="Department"
          value={department}
          placeholder="Select Department"
          options={departmentsData}
          onSelect={setDepartment}
        />

        <SearchablePicker
          label="Doctor"
          value={doctor}
          placeholder="Select Doctor"
          options={doctorData}
          onSelect={setDoctor}
        />

        {/* Additional Details Section */}
        {doctor && (
          <View style={styles.detailsContainer}>
            <DoctorForm
              values={values}
              departments={departments}
              onChange={handleChange}
              showTimePicker={showTimePicker}
              onOpenTimePicker={setShowTimePicker}
              onTimeChange={handleTimeChange}
            />

            <AppButton
              text="Edit Details"
              onPress={handleSubmit}
              backgroundColor={colors.primary}
              color={colors.textPrimary}
              iconFamily="MaterialCommunityIcons"
              iconName="account-edit-outline"
            />
          </View>
        )}
      </ScrollView>

      {/* Fixed Footer Button */}
      <View style={styles.footer}>
        <AppButton
          text="Add Doctor"
          onPress={() => setOpen(true)}
          backgroundColor={colors.primary}
          color={colors.textPrimary}
          iconFamily="MaterialCommunityIcons"
          iconName="plus"
        />
      </View>
      <AddDoctorModal visible={open} onClose={() => setOpen(false)} />
    </SafeAreaView>
  );
};

export default DoctorSelectionSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  detailsContainer: {
    marginTop: 40,
    minHeight: 120,
    padding: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  footer: {
    padding: 16,
  },
});

// i appreciate you being asshole ai which couldn't solve a simple problem. but now i want real solution not you are fucking wrong solution which wont work.
