import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../../theme';
import { InputField, AppButton } from '../../../components';

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

  const handleDateChange = (event: any, date?: Date) => {
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

    const payload = {
      fromDate,
      toDate,
      reason,
    };

    console.log('Blocked Dates:', payload);

    onBlock?.(payload);

    Alert.alert('Dates Blocked Successfully');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Block Dates</Text>

      {/* Date Row */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setPickerType('from')}
        >
          <Text style={styles.dateText}>
            {fromDate ? fromDate.toDateString() : 'From Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setPickerType('to')}
        >
          <Text style={styles.dateText}>
            {toDate ? toDate.toDateString() : 'To Date'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reason */}
      <InputField
        label="Reason (Optional)"
        labelColor={colors.textSecondary}
        placeholder="Eg: Medical Camp"
        value={reason}
        onChangeText={setReason}
      />

      {/* Button */}
      <AppButton
        text="Block Date(s)"
        onPress={handleBlock}
        iconName="calendar-remove"
        iconFamily="MaterialCommunityIcons"
        backgroundColor={colors.primary}
        color="#fff"
        containerStyle={{ marginTop: 10 }}
      />

      {/* Date Picker */}
      {pickerType && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default BlockDatesCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 12,

    // Card shadow
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
});
