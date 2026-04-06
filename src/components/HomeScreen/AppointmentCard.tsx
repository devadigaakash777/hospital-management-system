import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
    <Card
      style={{
        backgroundColor: colors.card,
        borderRadius: wp(3),
        marginBottom: hp(2),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(0.25) },
        shadowOpacity: 0.1,
        shadowRadius: wp(1),
      }}
      mode="elevated"
    >
      <Card.Content>

        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: wp(4.5),
              fontWeight: 'bold',
              color: colors.textPrimary,
            }}
          >
            {name}
          </Text>

          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            <Chip
              style={{
                backgroundColor: statusColor,
                borderRadius: wp(5),
              }}
              textStyle={{
                color: '#fff',
                fontSize: wp(3),
                fontWeight: '600',
              }}
            >
              {status.toUpperCase()}
            </Chip>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: wp(2.5),
                marginTop: hp(0.5),
              }}
            >
              booked by {bookedBy}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View
          style={{
            padding: wp(2),
            borderWidth: 1,
            borderRadius: wp(2.5),
            marginTop: hp(1.5),
            borderStartWidth: 4,
            borderEndWidth: 4,
            borderColor: statusColor,
          }}
        >
          <View
            style={{
              marginVertical: hp(1),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ marginTop: hp(0.8), color: colors.textSecondary, fontSize: wp(3.5) }}>
              <Ionicons name="call-outline" size={wp(3.5)} color={colors.textSecondary} />
              {' '}{phoneNumber}
            </Text>
            <Text style={{ marginTop: hp(0.8), color: colors.textSecondary, fontSize: wp(3.5) }}>
              <MaterialDesignIcons name="hospital-building" size={wp(3.5)} color={colors.textSecondary} />
              {' '}{department}
            </Text>
          </View>

          <View
            style={{
              marginVertical: hp(1),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ marginTop: hp(0.8), color: colors.textSecondary, fontSize: wp(3.5) }}>
              <FontAwesome6 name="user-doctor" size={wp(3.5)} color={colors.textSecondary} />
              {' '}{doctorName}
            </Text>
            <Text style={{ marginTop: hp(0.8), color: colors.textSecondary, fontSize: wp(3.5) }}>
              <Ionicons name="calendar-outline" size={wp(3.5)} color={colors.textSecondary} />
              {' '}{date}
            </Text>
          </View>

          <View
            style={{
              marginVertical: hp(1),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ marginTop: hp(0.8), color: colors.textSecondary, fontSize: wp(3.5) }}>
              <Ionicons name="time-outline" size={wp(3.5)} color={colors.textSecondary} />
              {' '}{timeFrom} - {timeTo}
            </Text>
            <Text style={{ marginTop: hp(0.8), color: colors.textSecondary, fontSize: wp(3.5) }}>
              <Ionicons name="ticket-outline" size={wp(3.5)} color={colors.textSecondary} />
              {' '}{token}
            </Text>
          </View>
        </View>

        {/* Patient Message */}
        {patientMessage ? (
          <Text
            style={{
              marginTop: hp(1),
              fontStyle: 'italic',
              color: colors.textPrimary,
              fontSize: wp(3.5),
            }}
          >
            {'Patient Message: '}{patientMessage}
          </Text>
        ) : null}

      </Card.Content>

      {/* Actions */}
      <Card.Actions
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: wp(4),
          paddingBottom: hp(1.5),
        }}
      >
        <Button
          mode="contained"
          onPress={onCallPress}
          buttonColor={colors.success}
          textColor="#fff"
          icon={() => <Ionicons name="call-outline" size={wp(4)} color="#fff" />}
          style={{ flex: 1, marginHorizontal: wp(1) }}
        >
          Call
        </Button>
        <Button
          mode="contained"
          onPress={onDeletePress}
          buttonColor={colors.error}
          textColor="#fff"
          icon={() => <Ionicons name="trash-outline" size={wp(4)} color="#fff" />}
          style={{ flex: 1, marginHorizontal: wp(1) }}
        >
          Delete
        </Button>
      </Card.Actions>

    </Card>
  );
};

export default AppointmentCard;