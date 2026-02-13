import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

/* =======================
   PROPS TYPE
======================= */
interface CreateAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
}

/* =======================
   DUMMY DATA
======================= */
const healthPackages = [
  'Basic Health Checkup',
  'Cardio Diabetic Evaluation',
  'Comprehensive Health Checkup',
];

const departments = {
  Cardiology: ['Dr. Sunil G', 'Dr. Anitha R'],
  Dermatology: ['Dr. Kavya M'],
  GeneralMedicine: ['Dr. Ramesh K'],
};

type DepartmentKey = keyof typeof departments;

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '04:00 PM - 04:30 PM',
];

/* =======================
   COMPONENT
======================= */
const CreateAppointmentModal = ({
  visible,
  onClose,
}: CreateAppointmentModalProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [healthPkg, setHealthPkg] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [vip, setVip] = useState(false);

  const [department, setDepartment] = useState<DepartmentKey | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [message, setMessage] = useState('');

    function onDateChange(event: DateTimePickerEvent, date?: Date | undefined): void {
        throw new Error('Function not implemented.');
    }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Create New Appointment</Text>
            <Text style={styles.subtitle}>
              Manually create an appointment for a patient
            </Text>

            {/* Patient Info */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name (Optional)"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Email (Optional)"
              value={email}
              onChangeText={setEmail}
            />

            {/* Health Package */}
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setHealthPkg(!healthPkg)}
            >
              <Text>{healthPkg ? '☑' : '☐'} Health Package Appointment</Text>
            </TouchableOpacity>

            {healthPkg &&
              healthPackages.map((pkg) => (
                <TouchableOpacity
                  key={pkg}
                  onPress={() => setSelectedPackage(pkg)}
                >
                  <Text
                    style={[
                      styles.option,
                      selectedPackage === pkg && styles.selected,
                    ]}
                  >
                    {pkg}
                  </Text>
                </TouchableOpacity>
              ))}

            {/* VIP */}
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setVip(!vip)}
            >
              <Text>{vip ? '☑' : '☐'} VIP / Priority Patient</Text>
            </TouchableOpacity>

            {/* Department */}
            <Text style={styles.section}>Department</Text>
            {(Object.keys(departments) as DepartmentKey[]).map((dep) => (
              <TouchableOpacity
                key={dep}
                onPress={() => {
                  setDepartment(dep);
                  setDoctor(null);
                }}
              >
                <Text
                  style={[
                    styles.option,
                    department === dep && styles.selected,
                  ]}
                >
                  {dep}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Doctor */}
            {department && (
              <>
                <Text style={styles.section}>Doctor</Text>
                {departments[department].map((doc) => (
                  <TouchableOpacity
                    key={doc}
                    onPress={() => setDoctor(doc)}
                  >
                    <Text
                      style={[
                        styles.option,
                        doctor === doc && styles.selected,
                      ]}
                    >
                      {doc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {/* Date */}
           {doctor && (
            <>
            <Text style={styles.section}>Preferred Date</Text>

            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
            >
                <Text>
                    {selectedDate
                    ? selectedDate.toDateString()
                    : 'Select date'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
            <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="calendar"
                onChange={onDateChange}
                minimumDate={new Date()}
            />
            )}
            </>
        )}

            {/* Time Slot */}
            {selectedDate && (
              <>
                <Text style={styles.section}>Time Slot</Text>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => setTime(slot)}
                  >
                    <Text
                      style={[
                        styles.option,
                        time === slot && styles.selected,
                      ]}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {/* Message */}
            <TextInput
              style={styles.textarea}
              placeholder="Message (Optional)"
              multiline
              value={message}
              onChangeText={setMessage}
            />

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.create}
                onPress={() => {
                  console.log({
                    firstName,
                    lastName,
                    phone,
                    email,
                    healthPkg,
                    selectedPackage,
                    vip,
                    department,
                    doctor,
                    selectedDate,
                    time,
                    message,
                  });
                  onClose();
                }}
              >
                <Text style={styles.createText}>Create Appointment</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CreateAppointmentModal;

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 80,
    padding: 10,
    marginTop: 10,
  },
  checkbox: {
    marginVertical: 8,
  },
  section: {
    marginTop: 12,
    fontWeight: '600',
  },
  option: {
    paddingVertical: 6,
    paddingLeft: 10,
  },
  selected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 15,
  },
  cancel: {
    color: '#444',
  },
  create: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  createText: {
    color: '#fff',
  },
});
