import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { BaseModal, ConfirmModal } from '..';
import { colors } from '../../theme';
import DoctorForm from './DoctorForm';
import { useDoctorSchedule } from './useDoctorSchedule';
import { DoctorFormValues, WeekSelection } from '../../types/doctor.types';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { validateDoctorForm } from './doctor.validation';

interface Props {
  visible: boolean;
  onClose: () => void;
  initialValues?: Partial<DoctorFormValues>;
  isEditMode?: boolean;
}

const departments = ['Cardiology', 'Dermatology', 'General Medicine'];
const users = ['Dr. Sunil G', 'Dr. Anitha R', 'Dr. Kavya M', 'Dr. Ramesh K'];

const emptyValues: DoctorFormValues = {
  user: null,
  department: null,
  opdTimeRanges: [],
  visitingType: 'regular',
  regularDays: [],
  specificWeeks: {} as WeekSelection,
  advanceBookingDays: '',
  roomNumber: '',
};

const AddDoctorModal: React.FC<Props> = ({
  visible,
  onClose,
  initialValues,
  isEditMode = false,
}) => {
  const { showTimePicker, setShowTimePicker } = useDoctorSchedule();

  const [values, setValues] = useState<DoctorFormValues>(
    initialValues ? { ...emptyValues, ...initialValues } : emptyValues,
  );

  const [currentFrom, setCurrentFrom] = useState<Date | null>(null);
  const [currentTo, setCurrentTo] = useState<Date | null>(null);
  const [currentPatients, setCurrentPatients] = useState<string>('');
  const [showAddConfirm, setShowAddConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (visible) {
      setValues(initialValues ? { ...emptyValues, ...initialValues } : emptyValues);
      setCurrentFrom(null);
      setCurrentTo(null);
      setCurrentPatients('');
    }
  }, [visible, initialValues]);

  const hasData = !!(
    values.user ||
    values.department ||
    values.opdTimeRanges.length > 0 ||
    values.regularDays.length > 0 ||
    values.advanceBookingDays ||
    values.roomNumber ||
    currentFrom ||
    currentTo ||
    currentPatients
  );

  const handleCancelPress = () => {
    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  const handleChange = <K extends keyof DoctorFormValues>(
    key: K,
    value: DoctorFormValues[K],
  ) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleTimeChange = (
    type: 'from' | 'to',
    event: DateTimePickerEvent,
    date?: Date,
  ): void => {
    setShowTimePicker(null);
    if (event.type === 'dismissed' || !date) return;

    if (type === 'from') {
      if (currentTo && date >= currentTo) {
        Alert.alert('Invalid Time', '"From" must be earlier than "To"');
        return;
      }
      setCurrentFrom(date);
    }

    if (type === 'to') {
      if (!currentFrom) {
        Alert.alert('Select From Time First');
        return;
      }
      if (date <= currentFrom) {
        Alert.alert('Invalid Time', '"To" must be later than "From"');
        return;
      }
      setCurrentTo(date);
    }
  };

  const handleAddTimeRange = () => {
    if (!currentFrom || !currentTo || !currentPatients.trim()) return;
    handleChange('opdTimeRanges', [
      ...values.opdTimeRanges,
      { from: currentFrom, to: currentTo, patients: currentPatients },
    ]);
    setCurrentFrom(null);
    setCurrentTo(null);
    setCurrentPatients('');
  };

  const handleRemoveTimeRange = (index: number) => {
    handleChange(
      'opdTimeRanges',
      values.opdTimeRanges.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = () => {
    const error = validateDoctorForm(values);
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }
    setShowAddConfirm(true);
  };

  return (
    <BaseModal
      visible={visible}
      title={isEditMode ? 'Edit Doctor' : 'Add Doctor'}
      onClose={handleCancelPress}
    >
      {/* ✅ DoctorForm unchanged — internal conversion handled separately */}
      <DoctorForm
        values={values}
        departments={departments}
        users={users}
        onChange={handleChange}
        showTimePicker={showTimePicker}
        onOpenTimePicker={setShowTimePicker}
        onTimeChange={handleTimeChange}
        currentFrom={currentFrom}
        currentTo={currentTo}
        currentPatients={currentPatients}
        onPatientsChange={setCurrentPatients}
        onAddTimeRange={handleAddTimeRange}
        onRemoveTimeRange={handleRemoveTimeRange}
      />

      {/* ✅ Paper Button replaces AppButton */}
      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          onPress={handleCancelPress}
          buttonColor={colors.border}
          textColor={colors.textPrimary}
          style={styles.halfBtn}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          buttonColor={colors.primary}
          style={styles.halfBtn}
        >
          {isEditMode ? 'Save Changes' : 'Add Doctor'}
        </Button>
      </View>

      {/* ✅ ConfirmModals unchanged */}
      <ConfirmModal
        visible={showCancelConfirm}
        type="cancel"
        onConfirm={() => {
          setShowCancelConfirm(false);
          onClose();
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />

      <ConfirmModal
        visible={showAddConfirm}
        type={isEditMode ? 'edit' : 'add'}
        onConfirm={() => {
          setShowAddConfirm(false);
          onClose();
        }}
        onCancel={() => setShowAddConfirm(false)}
      />
    </BaseModal>
  );
};

export default AddDoctorModal;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
  halfBtn: {
    flex: 1,
  },
});