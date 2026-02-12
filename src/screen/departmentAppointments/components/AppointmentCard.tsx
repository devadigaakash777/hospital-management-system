import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../theme';
import { AppButton } from '../../../components';

type StatusType =
  | 'appointments'
  | 'admitted'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

interface AppointmentCardProps {
  name: string;
  bookedBy: string;
  phoneNumber: string;
  department: string;
  doctorName: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  token: string;
  patientMessage?: string;
  status: StatusType;
  onCallPress: () => void;
  onDeletePress: () => void;
}

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'appointments':
      return '#FFA726';
    case 'admitted':
      return '#42A5F5';
    case 'confirmed':
      return '#26A69A';
    case 'completed':
      return '#66BB6A';
    case 'cancelled':
      return '#EF5350';
    default:
      return colors.primary;
  }
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  name,
  bookedBy,
  phoneNumber,
  department,
  doctorName,
  date,
  timeFrom,
  timeTo,
  token,
  patientMessage,
  status,
  onCallPress,
  onDeletePress,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
          </View>
          <Text style={styles.bookedByText}>booked by {bookedBy}</Text>
        </View>
      </View>
      {/* Details */}
      <View style={[styles.detailsContainer, { borderColor: statusColor }]}>
        <View style={styles.detailsRowContainer}>
          <Text style={styles.detail}>
            <Ionicons
              name="call-outline"
              size={14}
              color={colors.textSecondary}
            />{' '}
            {phoneNumber}
          </Text>
          <Text style={styles.detail}>
            <MaterialDesignIcons
              name="hospital-building"
              size={14}
              color={colors.textSecondary}
            />{' '}
            {department}
          </Text>
        </View>
        <View style={styles.detailsRowContainer}>
          <Text style={styles.detail}>
            <FontAwesome6
              name="user-doctor"
              size={14}
              color={colors.textSecondary}
            />{' '}
            {doctorName}
          </Text>
          <Text style={styles.detail}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={colors.textSecondary}
            />{' '}
            {date}
          </Text>
        </View>
        <View style={styles.detailsRowContainer}>
          <Text style={styles.detail}>
            <Ionicons
              name="time-outline"
              size={14}
              color={colors.textSecondary}
            />{' '}
            {timeFrom} - {timeTo}
          </Text>
          <Text style={styles.detail}>
            <Ionicons
              name="ticket-outline"
              size={14}
              color={colors.textSecondary}
            />{' '}
            {token}
          </Text>
        </View>
      </View>

      {patientMessage ? (
        <Text style={styles.message}>
          {'Patient Message: '}
          {patientMessage}
        </Text>
      ) : null}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <AppButton
          text="Call"
          onPress={onCallPress}
          iconFamily="Ionicons"
          iconName="call-outline"
          backgroundColor={colors.success}
          color= "#fff"
        />
        <AppButton
          text="Delete"
          onPress={onDeletePress}
          iconFamily="Ionicons"
          iconName="trash-outline"
          backgroundColor={colors.error}
          color= "#fff"
        />
      </View>
    </View>
  );
};

export default AppointmentCard;

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statusContainer: {
    flexDirection: 'column',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bookedByText: {
    color: colors.textSecondary,
    fontSize: 10,
    marginLeft: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    padding: 8,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 12,
    borderStartWidth: 4,
    borderEndWidth: 4,
  },
  detailsRowContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 14,
  },
  message: {
    marginTop: 8,
    fontStyle: 'italic',
    color: colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
