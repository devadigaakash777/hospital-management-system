import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import IconButton from '../../../components/ui/AppButton';
import { colors } from '../../../theme';

/* ======================
   TYPES
   ====================== */
export interface CreateHealthPackageData {
  name: string;
  description: string;
  price: string;
  visitingDays: string[];
  opdFrom: string;
  opdTo: string;
  patientsPerHour: string;
  advanceBooking: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: CreateHealthPackageData) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CreateHealthPackageModal: React.FC<Props> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [visitingDays, setVisitingDays] = useState<string[]>([]);
  const [opdFrom, setOpdFrom] = useState('');
  const [opdTo, setOpdTo] = useState('');
  const [patientsPerHour, setPatientsPerHour] = useState('');
  const [advanceBooking, setAdvanceBooking] = useState('');

  /* ===== TIME PICKER STATES ===== */
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [opdFromDate, setOpdFromDate] = useState(new Date());
  const [opdToDate, setOpdToDate] = useState(new Date());

  /* ======================
     HELPERS
     ====================== */
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleDay = (day: string) => {
    setVisitingDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day],
    );
  };

  /* ===== TIME HANDLERS ===== */
  const onFromTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowFromPicker(false);
    if (selectedDate) {
      setOpdFromDate(selectedDate);
      setOpdFrom(formatTime(selectedDate));
    }
  };

  const onToTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowToPicker(false);
    if (selectedDate) {
      setOpdToDate(selectedDate);
      setOpdTo(formatTime(selectedDate));
    }
  };

  /* ======================
     RESET & CLOSE
     ====================== */
  const resetAndClose = () => {
    setName('');
    setDescription('');
    setPrice('');
    setVisitingDays([]);
    setOpdFrom('');
    setOpdTo('');
    setPatientsPerHour('');
    setAdvanceBooking('');
    onClose();
  };

  /* ======================
     CONFIRM CLOSE
     ====================== */
  const confirmClose = () => {
    if (
      name ||
      description ||
      price ||
      visitingDays.length ||
      opdFrom ||
      opdTo ||
      patientsPerHour ||
      advanceBooking
    ) {
      Alert.alert(
        'Discard changes?',
        'The entered information will not be saved.',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: resetAndClose,
          },
        ],
      );
    } else {
      resetAndClose();
    }
  };

  /* ======================
     CREATE HANDLER
     ====================== */
  const handleCreate = () => {
    onCreate({
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      visitingDays,
      opdFrom,
      opdTo,
      patientsPerHour: patientsPerHour.trim(),
      advanceBooking: advanceBooking.trim(),
    });

    resetAndClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={confirmClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Create New Health Package</Text>
            <TouchableOpacity onPress={confirmClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* NAME */}
          <Text style={styles.label}>Package Name *</Text>
          <TextInput
            placeholder="Executive Health Checkup"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* DESCRIPTION */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Brief description"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
          />

          {/* PRICE */}
          <Text style={styles.label}>Price (₹)</Text>
          <TextInput
            placeholder="5000"
            placeholderTextColor={colors.textSecondary}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* VISITING DAYS */}
          <Text style={styles.label}>Visiting Days</Text>
          <View style={styles.daysContainer}>
            {DAYS.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayChip,
                  visitingDays.includes(day) && styles.dayChipActive,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    visitingDays.includes(day) && styles.dayTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* OPD TIME RANGE */}
          <Text style={styles.label}>OPD Time Range</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.input, styles.halfInput]}
              onPress={() => setShowFromPicker(true)}
            >
              <Text style={styles.timeText}>
                {opdFrom || 'From Time'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.input, styles.halfInput]}
              onPress={() => setShowToPicker(true)}
            >
              <Text style={styles.timeText}>
                {opdTo || 'To Time'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* PATIENTS / HOUR */}
          <Text style={styles.label}>Patients / Hour</Text>
          <TextInput
            placeholder="3"
            placeholderTextColor={colors.textSecondary}
            value={patientsPerHour}
            onChangeText={setPatientsPerHour}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* ADVANCE BOOKING */}
          <Text style={styles.label}>Advance Booking (days)</Text>
          <TextInput
            placeholder="7"
            placeholderTextColor={colors.textSecondary}
            value={advanceBooking}
            onChangeText={setAdvanceBooking}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* ACTIONS */}
          <View style={styles.actions}>
            <IconButton
              text="Cancel"
              iconName=""
              onPress={confirmClose}
              backgroundColor="transparent"
              borderColor={colors.border}
              color={colors.textPrimary}
            />

            <IconButton
              text="Create Package"
              iconName=""
              backgroundColor={colors.primary}
              color={colors.textPrimary}
              onPress={handleCreate}
              disabled={!name.trim()}
            />
          </View>
        </View>
      </View>

      {/* TIME PICKERS */}
      {showFromPicker && (
        <DateTimePicker
          value={opdFromDate}
          mode="time"
          display="default"
          onChange={onFromTimeChange}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={opdToDate}
          mode="time"
          display="default"
          onChange={onToTimeChange}
        />
      )}
    </Modal>
  );
};

export default CreateHealthPackageModal;

/* ======================
   STYLES
   ====================== */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  close: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    color: colors.textSecondary,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    color: colors.textPrimary,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  dayChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.textSecondary,
  },
  dayTextActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  timeText: {
    color: colors.textPrimary,
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});