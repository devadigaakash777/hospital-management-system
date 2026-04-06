import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Card, Text, Button, TextInput, TouchableRipple } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
          Block Dates
        </Text>

        {/* Date Row */}
        <View
          style={{
            flexDirection: 'row',
            gap: wp(2.5),
            marginBottom: hp(2),
          }}
        >
          <TouchableRipple
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: wp(2),
              padding: wp(3),
              backgroundColor: colors.card,
            }}
            onPress={() => setPickerType('from')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={{ color: colors.textPrimary }}>
              {fromDate ? fromDate.toDateString() : 'From Date'}
            </Text>
          </TouchableRipple>

          <TouchableRipple
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: wp(2),
              padding: wp(3),
              backgroundColor: colors.card,
            }}
            onPress={() => setPickerType('to')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={{ color: colors.textPrimary }}>
              {toDate ? toDate.toDateString() : 'To Date'}
            </Text>
          </TouchableRipple>
        </View>

        {/* Reason Input */}
        <TextInput
          label="Reason (Optional)"
          placeholder="Eg: Medical Camp"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          style={{
            backgroundColor: colors.card,
            marginBottom: hp(1.2),
          }}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{
            colors: { onSurfaceVariant: colors.textSecondary },
          }}
        />

        {/* Block Button */}
        <Button
          mode="contained"
          onPress={handleBlock}
          icon="calendar-remove"
          buttonColor={colors.primary}
          textColor="#fff"
          style={{
            marginTop: hp(1.2),
            borderRadius: wp(2),
          }}
        >
          Block Date(s)
        </Button>

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