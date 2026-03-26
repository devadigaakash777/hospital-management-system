import React, { useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Card, Text, Button, TextInput, TouchableRipple } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '../../theme';

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

  return (
    // ✅ Paper Card replaces custom View with shadow/border
    <Card style={styles.card} mode="outlined">
      <Card.Content>

        <Text style={styles.title}>Block Time Slot</Text>

        {/* ✅ TouchableRipple replaces TouchableOpacity date box */}
        <TouchableRipple
          style={styles.box}
          onPress={() => setPickerType('date')}
          rippleColor={colors.primary + '22'}
        >
          <Text style={styles.boxText}>
            {date ? date.toDateString() : 'Select Date'}
          </Text>
        </TouchableRipple>

        {/* ✅ TouchableRipple for start/end time boxes */}
        <View style={styles.row}>
          <TouchableRipple
            style={styles.box}
            onPress={() => setPickerType('start')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={styles.boxText}>
              {startTime
                ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Start Time'}
            </Text>
          </TouchableRipple>

          <TouchableRipple
            style={styles.box}
            onPress={() => setPickerType('end')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={styles.boxText}>
              {endTime
                ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'End Time'}
            </Text>
          </TouchableRipple>
        </View>

        {/* ✅ Paper TextInput replaces InputField */}
        <TextInput
          label="Number of Slots Reserved (Optional)"
          placeholder="Enter number"
          value={reservedSlots}
          keyboardType="numeric"
          onChangeText={setReservedSlots}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        <Text style={styles.subTitle}>
          Leave empty to fully block the time slot. Enter number to reserve
          that many slots for VIP / walk-in patients.
        </Text>

        <TextInput
          label="Reason (Optional)"
          placeholder="Eg: Emergency / Personal Work"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* ✅ Paper Button replaces AppButton */}
        <Button
          mode="contained"
          onPress={handleBlock}
          icon="calendar-remove"
          buttonColor={colors.primary}
          textColor="#fff"
          style={styles.blockBtn}
        >
          Block Time Slot
        </Button>

        {/* DateTimePicker unchanged */}
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

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.card,
    marginBottom: 10,
  },
  boxText: {
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: -6,
    marginBottom: 14,
  },
  blockBtn: {
    marginTop: 12,
    borderRadius: 8,
  },
});