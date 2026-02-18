import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  BaseModal,
  InputField,
  AppButton,
  SearchablePicker,
} from '../../../components';
import { colors } from '../../../theme';

import RegularDaysSection from './RegularDaysSection';
import SpecificWeekSection from './SpecificWeekSection';
import { useDoctorSchedule } from './useDoctorSchedule';

const departments = ['Cardiology', 'Dermatology', 'General Medicine'];

type SelectionState = {
  [week: string]: string[];
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AddDoctorModal: React.FC<Props> = ({ visible, onClose }) => {
  const [doctorName, setDoctorName] = useState('');
  const [department, setDepartment] = useState<string | null>(null);
  const [patientsPerHour, setPatientsPerHour] = useState('');
  const [advanceBookingDays, setAdvanceBookingDays] = useState('');
  const [activeTab, setActiveTab] = useState<'regular' | 'specific'>('regular');

  // 🔥 Specific Week State (Moved to Parent)
  const [specificWeekSelection, setSpecificWeekSelection] =
    useState<SelectionState>({});

  const schedule = useDoctorSchedule();

  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Select Time';

  const toggleSpecificCell = (week: string, day: string) => {
    setSpecificWeekSelection(prev => {
      const weekDays = prev[week] || [];

      if (weekDays.includes(day)) {
        return {
          ...prev,
          [week]: weekDays.filter(d => d !== day),
        };
      }

      return {
        ...prev,
        [week]: [...weekDays, day],
      };
    });
  };

  const handleSubmit = () => {
    const payload = {
      doctorName,
      department,
      opdFrom: schedule.opdFrom,
      opdTo: schedule.opdTo,
      visitingType: activeTab,
      regularDays:
        activeTab === 'regular' ? schedule.selectedDays : null,
      specificWeeks:
        activeTab === 'specific'
          ? specificWeekSelection
          : null,
      patientsPerHour: Number(patientsPerHour),
      advanceBookingDays: Number(advanceBookingDays),
    };

    console.log('FINAL PAYLOAD:', payload);
    Alert.alert('Doctor Added (Check Console)');
  }

  return (
    <BaseModal visible={visible} title="Add Doctor" onClose={onClose}>
      <InputField
        label="Doctor Name"
        containerStyle={{marginBottom: 0}}
        value={doctorName}
        onChangeText={setDoctorName}
      />

      <SearchablePicker
        label="Department"
        labelColor={colors.textPrimary}
        value={department}
        options={departments}
        onSelect={setDepartment}
      />

      {/* OPD Timing */}
      <Text style={styles.sectionTitle}>OPD Timing</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => schedule.setShowTimePicker('from')}
        >
          <Text style={styles.text}>
            {formatTime(schedule.opdFrom)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => schedule.setShowTimePicker('to')}
        >
          <Text style={styles.text}>
            {formatTime(schedule.opdTo)}
          </Text>
        </TouchableOpacity>
      </View>

      {schedule.showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={(event, date) =>
            schedule.handleTimeChange(
              schedule.showTimePicker!,
              event,
              date,
            )
          }
        />
      )}

      {/* Visiting Days */}
      <Text style={styles.sectionTitle}>Visiting Days</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('regular')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'regular' && styles.activeTab,
            ]}
          >
            Regular Days
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('specific')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'specific' && styles.activeTab,
            ]}
          >
            Specific Week
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20 }}>
        {activeTab === 'regular' && (
          <RegularDaysSection {...schedule} />
        )}

        {activeTab === 'specific' && (
          <SpecificWeekSection
            selected={specificWeekSelection}
            onToggle={toggleSpecificCell}
          />
        )}
      </View>

      <InputField
        label="Patients Per Hour"
        keyboardType="numeric"
        value={patientsPerHour}
        onChangeText={setPatientsPerHour}
      />

      <InputField
        label="Advance Booking Days"
        keyboardType="numeric"
        value={advanceBookingDays}
        onChangeText={setAdvanceBookingDays}
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.card,
  },
  text: {
    color: colors.textPrimary,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  tabText: {
    color: colors.textSecondary,
    paddingBottom: 4,
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
});
