import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Checkbox,
  Chip,
  TouchableRipple,
} from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '../../theme';
import {
  SearchablePicker,
  BaseModal,
  ConfirmModal,
} from '..';

interface Props {
  visible: boolean;
  onClose: () => void;
}

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

const CreateAppointmentModal = ({ visible, onClose }: Props) => {
  const [healthPkg, setHealthPkg] = useState(false);
  const [vip, setVip] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [department, setDepartment] = useState<DepartmentKey | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const hasData = !!(
    firstName || lastName || phone || email || message ||
    selectedPackage || department || doctor || selectedDate || selectedSlot
  );

  const resetForm = () => {
    setHealthPkg(false);
    setVip(false);
    setSelectedPackage(null);
    setDepartment(null);
    setDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const handleCancelPress = () => {
    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  const handleCreatePress = () => {
    if (!firstName.trim()) {
      Alert.alert('Validation', 'First name is required');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Validation', 'Phone number is required');
      return;
    }
    if (healthPkg && !selectedPackage) {
      Alert.alert('Validation', 'Please select a health package');
      return;
    }
    if (!healthPkg) {
      if (!department) {
        Alert.alert('Validation', 'Please select a department');
        return;
      }
      if (!doctor) {
        Alert.alert('Validation', 'Please select a doctor');
        return;
      }
      if (!selectedDate) {
        Alert.alert('Validation', 'Please select a date');
        return;
      }
      if (!selectedSlot) {
        Alert.alert('Validation', 'Please select a time slot');
        return;
      }
    }
    setShowCreateConfirm(true);
  };

  const onDateChange = (e: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (e.type === 'set' && date) {
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  return (
    <>
      <BaseModal
        title="Create New Appointment"
        visible={visible}
        onClose={handleCancelPress}
      >
        {/* ✅ Paper TextInput replaces InputField */}
        <TextInput
          label="First Name"
          placeholder="e.g. John"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        <TextInput
          label="Last Name (Optional)"
          placeholder="e.g. Smith"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        <TextInput
          label="Phone Number"
          placeholder="e.g. 9876543210"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        <TextInput
          label="Email (Optional)"
          placeholder="e.g. john@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* ✅ Paper Checkbox replaces custom Checkbox component */}
        <TouchableRipple
          onPress={() => {
            const newVal = !healthPkg;
            setHealthPkg(newVal);
            setSelectedPackage(null);
            if (newVal) {
              setDepartment(null);
              setDoctor(null);
              setSelectedDate(null);
              setSelectedSlot(null);
            }
          }}
          rippleColor={colors.primary + '22'}
          style={styles.checkboxRow}
        >
          <>
            <Checkbox
              status={healthPkg ? 'checked' : 'unchecked'}
              color={colors.primary}
              uncheckedColor={colors.border}
            />
            <Text style={styles.checkboxLabel}>
              Health Package Appointment
            </Text>
          </>
        </TouchableRipple>

        {healthPkg && (
          <SearchablePicker
            label="Health Package"
            value={selectedPackage}
            placeholder="Select Health Package"
            options={healthPackages}
            onSelect={setSelectedPackage}
          />
        )}

        <TouchableRipple
          onPress={() => setVip(!vip)}
          rippleColor={colors.primary + '22'}
          style={styles.checkboxRow}
        >
          <>
            <Checkbox
              status={vip ? 'checked' : 'unchecked'}
              color={colors.primary}
              uncheckedColor={colors.border}
            />
            <Text style={styles.checkboxLabel}>VIP / Priority Patient</Text>
          </>
        </TouchableRipple>

        {/* ✅ Department — disabled when health package selected */}
        <View style={healthPkg ? styles.disabled : undefined}>
          <SearchablePicker
            label="Department"
            value={department}
            placeholder="Select Department"
            options={Object.keys(departments)}
            onSelect={value => {
              if (healthPkg) return;
              setDepartment(value as DepartmentKey);
              setDoctor(null);
            }}
          />
        </View>

        {/* ✅ Doctor */}
        {department && !healthPkg && (
          <SearchablePicker
            label="Doctor"
            value={doctor}
            placeholder="Select Doctor"
            options={departments[department]}
            onSelect={setDoctor}
          />
        )}

        {/* ✅ Date — TouchableRipple replaces TouchableOpacity */}
        {doctor && !healthPkg && (
          <>
            <Text style={styles.label}>Preferred Date</Text>
            <TouchableRipple
              style={styles.dropdown}
              onPress={() => setShowDatePicker(true)}
              rippleColor={colors.primary + '22'}
            >
              <Text style={styles.dropdownText}>
                {selectedDate ? selectedDate.toDateString() : 'Select Date'}
              </Text>
            </TouchableRipple>
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

        {/* ✅ Time Slots — Paper Chip replaces custom slot TouchableOpacity */}
        {selectedDate && !healthPkg && (
          <>
            <Text style={styles.label}>Time Slot</Text>
            <View style={styles.slotGrid}>
              {timeSlots.map(slot => (
                <Chip
                  key={slot}
                  selected={selectedSlot === slot}
                  onPress={() => setSelectedSlot(slot)}
                  style={[
                    styles.slot,
                    selectedSlot === slot && { backgroundColor: colors.primary },
                  ]}
                  selectedColor="#fff"
                  textStyle={{
                    fontSize: 12,
                    color: selectedSlot === slot ? '#fff' : colors.textSecondary,
                  }}
                >
                  {slot}
                </Chip>
              ))}
            </View>
          </>
        )}

        <TextInput
          label="Message (Optional)"
          placeholder="e.g. Please note any special requirements"
          value={message}
          onChangeText={setMessage}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
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
            onPress={handleCreatePress}
            buttonColor={colors.primary}
            style={styles.halfBtn}
          >
            Create Appointment
          </Button>
        </View>
      </BaseModal>

      <ConfirmModal
        visible={showCreateConfirm}
        type="add"
        message="Are you sure you want to create this appointment?"
        onConfirm={() => {
          setShowCreateConfirm(false);
          resetForm();
          onClose();
        }}
        onCancel={() => setShowCreateConfirm(false)}
      />

      <ConfirmModal
        visible={showCancelConfirm}
        type="cancel"
        onConfirm={() => {
          setShowCancelConfirm(false);
          resetForm();
          onClose();
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </>
  );
};

export default CreateAppointmentModal;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    backgroundColor: colors.card,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingVertical: 4,
  },
  checkboxLabel: {
    color: colors.textPrimary,
    marginLeft: 4,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: colors.card,
    marginBottom: 10,
  },
  dropdownText: {
    color: colors.textPrimary,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  slot: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  halfBtn: {
    flex: 1,
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
});