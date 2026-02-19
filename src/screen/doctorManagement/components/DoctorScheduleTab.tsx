import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import { AppButton, InfoRow } from '../../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  doctorName: string;
  department: string;
  roomNumber?: string;
  opdTiming: string;
  visitingDays: string; // "Full Time" OR "Mon - Sat"
  patientsPerHour: number;
  slotsPerHour: number;
  slotsPerDay: number;
  onDelete?: () => void;
}

const DoctorScheduleTab: React.FC<Props> = ({
  doctorName,
  department,
  roomNumber,
  opdTiming,
  visitingDays,
  patientsPerHour,
  slotsPerHour,
  slotsPerDay,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleSection}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.department}>{department}</Text>
        </View>

        <MaterialCommunityIcons
          name="doctor"
          size={40}
          color={colors.primary}
        />
      </View>

      {/* Info Section */}

      {roomNumber && <InfoRow icon="door" label="Room:" value={roomNumber} />}

      <InfoRow icon="clock-outline" label="OPD Timing:" value={opdTiming} />

      <InfoRow
        icon="calendar-month"
        label="Visiting Days:"
        value={visitingDays}
      />

      <InfoRow
        icon="account-group"
        label="Patients / Hour:"
        value={patientsPerHour.toString()}
      />

      <InfoRow
        icon="timer-outline"
        label="Slots / Hour:"
        value={slotsPerHour.toString()}
      />

      <InfoRow
        icon="calendar-check"
        label="Slots / Day:"
        value={slotsPerDay.toString()}
      />

      {/* Delete Button */}
      <AppButton
        text="Delete Configuration"
        onPress={() => onDelete?.()}
        iconName="delete"
        backgroundColor={colors.error}
        color="#fff"
        containerStyle={styles.deleteBtn}
      />
    </View>
  );
};

export default DoctorScheduleTab;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  titleSection: {
    flex: 1,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  department: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  label: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
    width: 130,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  deleteBtn: { marginTop: 14 },
});
