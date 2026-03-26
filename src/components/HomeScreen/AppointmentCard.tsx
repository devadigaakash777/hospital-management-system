import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../theme';

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
    case 'appointments': return '#FFA726';
    case 'admitted':     return '#42A5F5';
    case 'confirmed':    return '#26A69A';
    case 'completed':    return '#66BB6A';
    case 'cancelled':    return '#EF5350';
    default:             return colors.primary;
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
    // ✅ Paper Card replaces custom View with shadow/border
    <Card style={styles.card} mode="elevated">
      <Card.Content>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.statusContainer}>
            {/* ✅ Paper Chip replaces custom statusBadge View */}
            <Chip
              style={[styles.statusBadge, { backgroundColor: statusColor }]}
              textStyle={styles.statusText}
            >
              {status.toUpperCase()}
            </Chip>
            <Text style={styles.bookedByText}>booked by {bookedBy}</Text>
          </View>
        </View>

        {/* ── Details ── */}
        <View style={[styles.detailsContainer, { borderColor: statusColor }]}>
          <View style={styles.detailsRowContainer}>
            <Text style={styles.detail}>
              <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
              {' '}{phoneNumber}
            </Text>
            <Text style={styles.detail}>
              <MaterialDesignIcons name="hospital-building" size={14} color={colors.textSecondary} />
              {' '}{department}
            </Text>
          </View>

          <View style={styles.detailsRowContainer}>
            <Text style={styles.detail}>
              <FontAwesome6 name="user-doctor" size={14} color={colors.textSecondary} />
              {' '}{doctorName}
            </Text>
            <Text style={styles.detail}>
              <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
              {' '}{date}
            </Text>
          </View>

          <View style={styles.detailsRowContainer}>
            <Text style={styles.detail}>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              {' '}{timeFrom} - {timeTo}
            </Text>
            <Text style={styles.detail}>
              <Ionicons name="ticket-outline" size={14} color={colors.textSecondary} />
              {' '}{token}
            </Text>
          </View>
        </View>

        {/* ── Patient Message ── */}
        {patientMessage ? (
          <Text style={styles.message}>
            {'Patient Message: '}{patientMessage}
          </Text>
        ) : null}

      </Card.Content>

      {/* ✅ Card.Actions replaces custom buttonRow View */}
      <Card.Actions style={styles.buttonRow}>
        <Button
          mode="contained"
          onPress={onCallPress}
          buttonColor={colors.success}
          textColor="#fff"
          icon={() => <Ionicons name="call-outline" size={16} color="#fff" />}
          style={styles.actionBtn}
        >
          Call
        </Button>
        <Button
          mode="contained"
          onPress={onDeletePress}
          buttonColor={colors.error}
          textColor="#fff"
          icon={() => <Ionicons name="trash-outline" size={16} color="#fff" />}
          style={styles.actionBtn}
        >
          Delete
        </Button>
      </Card.Actions>

    </Card>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
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
    alignItems: 'flex-end',
  },
  statusBadge: {
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bookedByText: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 4,
  },
  detailsContainer: {
    padding: 8,
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
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
  },
});