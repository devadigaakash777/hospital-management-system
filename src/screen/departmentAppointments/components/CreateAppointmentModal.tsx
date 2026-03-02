import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../theme';
import { SearchablePicker, BaseModal } from '../../../components';

/* ================= PROPS ================= */

interface Props {
  visible: boolean;
  onClose: () => void;
}

/* ================= DUMMY DATA ================= */

const departments = {
  Cardiology: ['Dr. Sunil G', 'Dr. Anitha R'],
  Dermatology: ['Dr. Kavya M'],
  GeneralMedicine: ['Dr. Ramesh K'],
};

type DepartmentKey = keyof typeof departments;

const healthPackages = [
  'Basic Health Checkup',
  'Cardio Diabetic Evaluation',
  'Comprehensive Health Checkup',
];

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
];

/* ================= COMPONENT ================= */

const CreateAppointmentModal = ({ visible, onClose }: Props) => {
  const [healthPkg, setHealthPkg] = useState(false);
  const [vip, setVip] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [department, setDepartment] = useState<DepartmentKey | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const confirmClose = () => {
    Alert.alert(
      'Discard changes?',
      'Are you sure you want to cancel creating this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: onClose },
      ],
    );
  };

  const onDateChange = (e: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (e.type === 'set' && date) {
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  return (

    <BaseModal
      title="Create New Appointment"
      visible={visible}
      onClose={confirmClose}
    >
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name (Optional)"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={colors.textSecondary}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email (Optional)"
        placeholderTextColor={colors.textSecondary}
      />

      {/* CHECKBOXES */}
      <Checkbox
        label="Health Package Appointment"
        value={healthPkg}
        onChange={() => {
          setHealthPkg(!healthPkg);
          setSelectedPackage(null);
        }}
      />

      {healthPkg && (
        <SearchablePicker
          label="Health Package"
          value={selectedPackage}
          placeholder="Select Health Package"
          options={healthPackages}
          onSelect={setSelectedPackage}
        />
      )}

      <Checkbox
        label="VIP / Priority Patient"
        value={vip}
        onChange={() => setVip(!vip)}
      />

      {/* DEPARTMENT */}
      <SearchablePicker
        label="Department"
        value={department}
        placeholder="Select Department"
        options={Object.keys(departments)}
        onSelect={(value) => {
          setDepartment(value as DepartmentKey);
          setDoctor(null);
        }}
      />

      {/* DOCTOR */}
      {department && (
        <SearchablePicker
          label="Doctor"
          value={doctor}
          placeholder="Select Doctor"
          options={departments[department]}
          onSelect={setDoctor}
        />
      )}

      {/* DATE */}
      {doctor && (
        <>
          <Text style={styles.label}>Preferred Date</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedDate ? selectedDate.toDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      {/* SLOT */}
      {selectedDate && (
        <>
          <Text style={styles.label}>Time Slot</Text>
          <View style={styles.slotGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slot,
                  selectedSlot === slot && styles.slotActive,
                ]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedSlot === slot && styles.slotTextActive,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TextInput
        style={styles.textarea}
        placeholder="Message (Optional)"
        placeholderTextColor={colors.textSecondary}
        multiline
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={confirmClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createText}>Create Appointment</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

export default CreateAppointmentModal;

/* ================= CHECKBOX ================= */

const Checkbox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: () => void;
}) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onChange}>
    <View style={[styles.checkboxBox, value && styles.checkboxChecked]}>
      {value && (
        <Ionicons name="checkmark" size={14} color={colors.textPrimary} />
      )}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '94%',
    maxHeight: '94%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  content: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: colors.card,
    color: colors.textPrimary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    color: colors.textPrimary,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: colors.card,
  },
  dropdownText: {
    color: colors.textPrimary,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    marginBottom: 10,
  },
  slotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  slotText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  slotTextActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    height: 80,
    marginTop: 12,
    backgroundColor: colors.card,
    color: colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  cancelText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  createBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  createText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});