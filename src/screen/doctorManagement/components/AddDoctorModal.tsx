import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { BaseModal, AppButton } from '../../../components';
import { colors } from '../../../theme';
import DoctorForm from './DoctorForm';
import { useDoctorSchedule } from './useDoctorSchedule';
import { DoctorFormValues, WeekSelection } from '../../../types/doctor.types';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { validateDoctorForm } from './doctor.validation';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const departments = ['Cardiology', 'Dermatology', 'General Medicine'];

const AddDoctorModal: React.FC<Props> = ({ visible, onClose }) => {
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
    // Alert.alert('Doctor Added (Check Console)');
    onClose();
  };

  return (
    <BaseModal visible={visible} title="Add Doctor" onClose={onClose}>
      <DoctorForm
        values={values}
        departments={departments}
        onChange={handleChange}
        showTimePicker={showTimePicker}
        onOpenTimePicker={setShowTimePicker}
        onTimeChange={handleTimeChange}
      />

      <View style={styles.buttonRow}>
        <AppButton
          text="Cancel"
          onPress={onClose}
          backgroundColor={colors.border}
        />
        <AppButton
          text="Add Doctor"
          onPress={handleSubmit}
          backgroundColor={colors.primary}
        />
      </View>
    </BaseModal>
  );
};

export default AddDoctorModal;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
});
