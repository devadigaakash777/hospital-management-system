import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, TextInput, TouchableRipple } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '../../theme';

interface Props {
  onBlock?: (data: {
    fromDate: Date | null;
    toDate: Date | null;
    reason: string;
  }) => void;
}

const BlockDatesCard: React.FC<Props> = ({ onBlock }) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [reason, setReason] = useState('');
  const [pickerType, setPickerType] = useState<'from' | 'to' | null>(null);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setPickerType(null);
    if (event.type === 'dismissed' || !date) return;

    if (pickerType === 'from') {
      setFromDate(date);
    }
    if (pickerType === 'to') {
      if (fromDate && date < fromDate) {
        Alert.alert('Invalid Date', 'To date must be after From date');
        return;
      }
      setToDate(date);
    }
  };

  const handleBlock = () => {
    if (!fromDate || !toDate) {
      Alert.alert('Please select both dates');
      return;
    }
    onBlock?.({ fromDate, toDate, reason });
    Alert.alert('Dates Blocked Successfully');
  };

  return (
    // ✅ Paper Card replaces custom View with shadow/border
    <Card style={styles.card} mode="outlined">
      <Card.Content>

        {/* ✅ Paper Text replaces RN Text */}
        <Text style={styles.title}>Block Dates</Text>

        {/* ✅ TouchableRipple replaces TouchableOpacity date boxes */}
        <View style={styles.dateRow}>
          <TouchableRipple
            style={styles.dateBox}
            onPress={() => setPickerType('from')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={styles.dateText}>
              {fromDate ? fromDate.toDateString() : 'From Date'}
            </Text>
          </TouchableRipple>

          <TouchableRipple
            style={styles.dateBox}
            onPress={() => setPickerType('to')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={styles.dateText}>
              {toDate ? toDate.toDateString() : 'To Date'}
            </Text>
          </TouchableRipple>
        </View>

        {/* ✅ Paper TextInput replaces InputField */}
        <TextInput
          label="Reason (Optional)"
          placeholder="Eg: Medical Camp"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{
            colors: { onSurfaceVariant: colors.textSecondary },
          }}
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
          Block Date(s)
        </Button>

        {/* DateTimePicker unchanged */}
        {pickerType && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={handleDateChange}
          />
        )}

      </Card.Content>
    </Card>
  );
};

export default BlockDatesCard;

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
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.card,
  },
  dateText: {
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 10,
  },
  blockBtn: {
    marginTop: 10,
    borderRadius: 8,
  },
});