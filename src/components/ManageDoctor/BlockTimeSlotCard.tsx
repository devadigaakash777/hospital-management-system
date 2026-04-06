import React, { useState } from 'react';
import { View, Alert, Platform } from 'react-native';
import { Card, Text, Button, TextInput, TouchableRipple } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

interface Props {
  onBlock?: (data: {
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    reservedSlots?: number;
    reason?: string;
  }) => void;
}

const BlockTimeSlotCard: React.FC<Props> = ({ onBlock }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [reservedSlots, setReservedSlots] = useState('');
  const [reason, setReason] = useState('');
  const [pickerType, setPickerType] = useState<'date' | 'start' | 'end' | null>(null);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentPicker = pickerType;

    if (Platform.OS === 'android') {
      setPickerType(null);
    }

    if (event.type === 'dismissed' || !selectedDate) return;

    if (currentPicker === 'date') {
      setDate(selectedDate);
    }
    if (currentPicker === 'start') {
      if (endTime && selectedDate >= endTime) {
        Alert.alert('Invalid Time', 'Start time must be before End time');
        return;
      }
      setStartTime(selectedDate);
    }
    if (currentPicker === 'end') {
      if (startTime && selectedDate <= startTime) {
        Alert.alert('Invalid Time', 'End time must be after Start time');
        return;
      }
      setEndTime(selectedDate);
    }
  };

  const handleBlock = () => {
    if (!date || !startTime || !endTime) {
      Alert.alert('Please select date, start time and end time');
      return;
    }
    if (startTime >= endTime) {
      Alert.alert('Invalid Time', 'Start time must be before End time');
      return;
    }
    onBlock?.({
      date,
      startTime,
      endTime,
      reservedSlots: reservedSlots ? Number(reservedSlots) : undefined,
      reason: reason || undefined,
    });
    Alert.alert('Time Slot Blocked Successfully');
  };

  const boxStyle = {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: wp(2),
    padding: wp(3),
    backgroundColor: colors.card,
    marginBottom: hp(1.2),
  };

  const inputStyle = {
    backgroundColor: colors.card,
    marginBottom: hp(1.2),
  };

  return (
    <Card
      style={{
        borderRadius: wp(3.5),
        borderColor: colors.border,
        backgroundColor: colors.surface,
        marginVertical: hp(1.5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(0.5) },
        shadowOpacity: 0.08,
        shadowRadius: wp(1.5),
        elevation: 4,
      }}
      mode="outlined"
    >
      <Card.Content>

        <Text
          style={{
            fontSize: wp(4),
            fontWeight: '700',
            marginBottom: hp(1.8),
            color: colors.textPrimary,
          }}
        >
          Block Time Slot
        </Text>

        {/* Date Box */}
        <TouchableRipple
          style={boxStyle}
          onPress={() => setPickerType('date')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={{ color: colors.textPrimary }}>
            {date ? date.toDateString() : 'Select Date'}
          </Text>
        </TouchableRipple>

        {/* Start / End Time Row */}
        <View
          style={{
            flexDirection: 'row',
            gap: wp(2.5),
            marginVertical: hp(1.5),
          }}
        >
          <TouchableRipple
            style={boxStyle}
            onPress={() => setPickerType('start')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={{ color: colors.textPrimary }}>
              {startTime
                ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Start Time'}
            </Text>
          </TouchableRipple>

          <TouchableRipple
            style={boxStyle}
            onPress={() => setPickerType('end')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={{ color: colors.textPrimary }}>
              {endTime
                ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'End Time'}
            </Text>
          </TouchableRipple>
        </View>

        {/* Reserved Slots Input */}
        <TextInput
          label="Number of Slots Reserved (Optional)"
          placeholder="Enter number"
          value={reservedSlots}
          keyboardType="numeric"
          onChangeText={setReservedSlots}
          mode="outlined"
          style={inputStyle}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        <Text
          style={{
            fontSize: wp(3),
            color: colors.textSecondary,
            marginTop: hp(-0.8),
            marginBottom: hp(1.8),
          }}
        >
          Leave empty to fully block the time slot. Enter number to reserve
          that many slots for VIP / walk-in patients.
        </Text>

        {/* Reason Input */}
        <TextInput
          label="Reason (Optional)"
          placeholder="Eg: Emergency / Personal Work"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          style={inputStyle}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* Block Button */}
        <Button
          mode="contained"
          onPress={handleBlock}
          icon="calendar-remove"
          buttonColor={colors.primary}
          textColor="#fff"
          style={{
            marginTop: hp(1.5),
            borderRadius: wp(2),
          }}
        >
          Block Time Slot
        </Button>

        {pickerType && (
          <DateTimePicker
            mode={pickerType === 'date' ? 'date' : 'time'}
            value={new Date()}
            onChange={handleChange}
            is24Hour={false}
          />
        )}

      </Card.Content>
    </Card>
  );
};

export default BlockTimeSlotCard;