import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchablePicker from '../../../components/layout/SearchablePicker';

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

const EMERALD = '#10B981';

/* ================= COMPONENT ================= */

const CreateAppointmentModal = ({ visible, onClose }: Props) => {
  /* ---------- STATES ---------- */
  const [healthPkg, setHealthPkg] = useState(false);
  const [vip, setVip] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [department, setDepartment] = useState<DepartmentKey | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  /* ---------- CONFIRM CLOSE ---------- */
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

  /* ---------- DATE HANDLER ---------- */
  const onDateChange = (e: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (e.type === 'set' && date) {
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* ---------- HEADER ---------- */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Create New Appointment</Text>
              <Text style={styles.subtitle}>
                Manually create an appointment for a patient
              </Text>
            </View>

            <TouchableOpacity onPress={confirmClose}>
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* ---------- CONTENT ---------- */}
          <ScrollView contentContainerStyle={styles.content}>
            <TextInput style={styles.input} placeholder="First Name" />
            <TextInput style={styles.input} placeholder="Last Name (Optional)" />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TextInput style={styles.input} placeholder="Email (Optional)" />

            {/* ---------- CHECKBOXES ---------- */}
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

            {/* ---------- DEPARTMENT ---------- */}
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

            {/* ---------- DOCTOR ---------- */}
            {department && (
              <SearchablePicker
                label="Doctor"
                value={doctor}
                placeholder="Select Doctor"
                options={departments[department]}
                onSelect={setDoctor}
              />
            )}

            {/* ---------- DATE ---------- */}
            {doctor && (
              <>
                <Text style={styles.label}>Preferred Date</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>
                    {selectedDate
                      ? selectedDate.toDateString()
                      : 'Select Date'}
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

            {/* ---------- TIME SLOT ---------- */}
            {selectedDate && (
              <>
                <Text style={styles.label}>Time Slot</Text>
                <View style={styles.slotGrid}>
                  {timeSlots.map(slot => (
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
              multiline
            />
          </ScrollView>

          {/* ---------- STICKY FOOTER ---------- */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={confirmClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createBtn}>
              <Text style={styles.createText}>Create Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateAppointmentModal;

/* ================= SMALL COMPONENT ================= */

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
      {value && <Ionicons name="checkmark" size={14} color="#fff" />}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '94%',
    maxHeight: '94%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  content: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    gap: 10,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: EMERALD,
    borderColor: EMERALD,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  slotActive: {
    backgroundColor: EMERALD,
    borderColor: EMERALD,
  },
  slotText: {
    fontSize: 12,
  },
  slotTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    height: 80,
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
  },
  cancelText: {
    color: EMERALD,
    fontWeight: '700',
  },
  createBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: EMERALD,
  },
  createText: {
    color: '#fff',
    fontWeight: '700',
  },
});
