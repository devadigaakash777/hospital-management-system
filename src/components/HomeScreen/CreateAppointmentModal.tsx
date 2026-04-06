import React, { useState } from 'react';
import { View, Alert } from 'react-native';
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
import { SearchablePicker, BaseModal, ConfirmModal } from '..';
import { wp, hp } from '../../utils/responsive';

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

  const inputStyle = {
    marginBottom: hp(1.5),
    backgroundColor: colors.card,
  };

  const labelStyle = {
    fontWeight: '600' as const,
    marginTop: hp(1.5),
    marginBottom: hp(0.8),
    color: colors.textPrimary,
  };

  return (
    <>
      <BaseModal
        title="Create New Appointment"
        visible={visible}
        onClose={handleCancelPress}
      >
        {/* Name Fields */}
        <TextInput
          label="First Name"
          placeholder="e.g. John"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={inputStyle}
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
          style={inputStyle}
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
          style={inputStyle}
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
          style={inputStyle}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* Health Package Checkbox */}
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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: hp(0.8),
            paddingVertical: hp(0.5),
          }}
        >
          <>
            <Checkbox
              status={healthPkg ? 'checked' : 'unchecked'}
              color={colors.primary}
              uncheckedColor={colors.border}
            />
            <Text style={{ color: colors.textPrimary, marginLeft: wp(1) }}>
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

        {/* VIP Checkbox */}
        <TouchableRipple
          onPress={() => setVip(!vip)}
          rippleColor={colors.primary + '22'}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: hp(0.8),
            paddingVertical: hp(0.5),
          }}
        >
          <>
            <Checkbox
              status={vip ? 'checked' : 'unchecked'}
              color={colors.primary}
              uncheckedColor={colors.border}
            />
            <Text style={{ color: colors.textPrimary, marginLeft: wp(1) }}>
              VIP / Priority Patient
            </Text>
          </>
        </TouchableRipple>

        {/* Department */}
        <View style={healthPkg ? { opacity: 0.4, pointerEvents: 'none' } : undefined}>
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

        {/* Doctor */}
        {department && !healthPkg && (
          <SearchablePicker
            label="Doctor"
            value={doctor}
            placeholder="Select Doctor"
            options={departments[department]}
            onSelect={setDoctor}
          />
        )}

        {/* Date */}
        {doctor && !healthPkg && (
          <>
            <Text style={labelStyle}>Preferred Date</Text>
            <TouchableRipple
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: wp(2.5),
                padding: wp(3),
                backgroundColor: colors.card,
                marginBottom: hp(1.2),
              }}
              onPress={() => setShowDatePicker(true)}
              rippleColor={colors.primary + '22'}
            >
              <Text style={{ color: colors.textPrimary }}>
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

        {/* Time Slots */}
        {selectedDate && !healthPkg && (
          <>
            <Text style={labelStyle}>Time Slot</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: hp(1.2),
                gap: wp(2),
              }}
            >
              {timeSlots.map(slot => (
                <Chip
                  key={slot}
                  selected={selectedSlot === slot}
                  onPress={() => setSelectedSlot(slot)}
                  style={{
                    borderRadius: wp(5),
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: selectedSlot === slot ? colors.primary : undefined,
                  }}
                  selectedColor="#fff"
                  textStyle={{
                    fontSize: wp(3),
                    color: selectedSlot === slot ? '#fff' : colors.textSecondary,
                  }}
                >
                  {slot}
                </Chip>
              ))}
            </View>
          </>
        )}

        {/* Message */}
        <TextInput
          label="Message (Optional)"
          placeholder="e.g. Please note any special requirements"
          value={message}
          onChangeText={setMessage}
          mode="outlined"
          style={inputStyle}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(2.5),
            marginBottom: hp(1.2),
            gap: wp(2.5),
          }}
        >
          <Button
            mode="contained"
            onPress={handleCancelPress}
            buttonColor={colors.border}
            textColor={colors.textPrimary}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleCreatePress}
            buttonColor={colors.primary}
            style={{ flex: 1 }}
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