import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Button,
  Chip,
  TouchableRipple,
  TextInput,
} from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { BaseModal, ConfirmModal } from '..';
import { colors } from '../../theme';
import { HealthPackage } from '../../types/healthpackage.types';

export interface CreateHealthPackageData {
  name: string;
  description: string;
  price: string;
  visitingDays: string[];
  opdTimeRanges: { from: string; to: string }[];
  patientsPerHour: string;
  advanceBooking: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: CreateHealthPackageData) => void;
  editPackage?: HealthPackage | null;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CreateHealthPackageModal: React.FC<Props> = ({
  visible,
  onClose,
  onCreate,
  editPackage,
}) => {
  const isEdit = !!editPackage;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [visitingDays, setVisitingDays] = useState<string[]>([]);
  const [patientsPerHour, setPatientsPerHour] = useState('');
  const [advanceBooking, setAdvanceBooking] = useState('');
  const [opdTimeRanges, setOpdTimeRanges] = useState<{ from: string; to: string }[]>([]);
  const [currentFrom, setCurrentFrom] = useState('');
  const [currentTo, setCurrentTo] = useState('');
  const [activeRangeEnd, setActiveRangeEnd] = useState<'from' | 'to'>('from');
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (visible) {
      if (editPackage) {
        setName(editPackage.name);
        setDescription(editPackage.description);
        setPatientsPerHour(editPackage.patientsPerHour.toString());
        setAdvanceBooking(editPackage.advanceBooking);
        setPrice('');
        const days = editPackage.visitingDays === 'Not Set'
          ? []
          : editPackage.visitingDays.split(', ').map(d => d.trim().slice(0, 3));
        setVisitingDays(days);
        if (editPackage.opdTime && editPackage.opdTime !== 'Not Set') {
          const parts = editPackage.opdTime.split(' - ');
          if (parts.length === 2) {
            setOpdTimeRanges([{ from: parts[0], to: parts[1] }]);
          }
        } else {
          setOpdTimeRanges([]);
        }
        setCurrentFrom('');
        setCurrentTo('');
      } else {
        resetForm();
      }
    }
  }, [visible, editPackage]);

  const hasData = !!(
    name || description || price || visitingDays.length ||
    opdTimeRanges.length || currentFrom || currentTo ||
    patientsPerHour || advanceBooking
  );

  const toggleDay = (day: string) => {
    setVisitingDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  const openRangePicker = (end: 'from' | 'to') => {
    setActiveRangeEnd(end);
    setPickerDate(new Date());
    setShowRangePicker(true);
  };

  const onRangeTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowRangePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      if (activeRangeEnd === 'from') setCurrentFrom(formatted);
      else setCurrentTo(formatted);
    }
  };

  const addTimeRange = () => {
    if (!currentFrom || !currentTo) return;
    setOpdTimeRanges(prev => [...prev, { from: currentFrom, to: currentTo }]);
    setCurrentFrom('');
    setCurrentTo('');
  };

  const removeTimeRange = (index: number) =>
    setOpdTimeRanges(prev => prev.filter((_, i) => i !== index));

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setVisitingDays([]);
    setOpdTimeRanges([]);
    setCurrentFrom('');
    setCurrentTo('');
    setPatientsPerHour('');
    setAdvanceBooking('');
  };

  const handleCancelPress = () => {
    if (hasData) setShowCancelConfirm(true);
    else onClose();
  };

  const handleCreatePress = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Package name is required');
      return;
    }
    setShowCreateConfirm(true);
  };

  const handleCreate = () => {
    onCreate({
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      visitingDays,
      opdTimeRanges,
      patientsPerHour: patientsPerHour.trim(),
      advanceBooking: advanceBooking.trim(),
    });
    resetForm();
    onClose();
  };

  return (
    <>
      <BaseModal
        visible={visible}
        title={isEdit ? 'Edit Health Package' : 'Create Health Package'}
        onClose={handleCancelPress}
      >
        {/* ✅ Paper TextInput replaces InputField */}
        <TextInput
          label="Package Name *"
          placeholder="e.g. Executive Health Checkup"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        <TextInput
          label="Description"
          placeholder="e.g. Comprehensive full-body screening for adults"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        <TextInput
          label="Price (₹)"
          placeholder="e.g. 5000"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* ✅ Visiting Days — Paper Chip replaces dayChip TouchableOpacity */}
        <Text style={styles.label}>Visiting Days</Text>
        <View style={styles.daysContainer}>
          {DAYS.map(day => (
            <Chip
              key={day}
              selected={visitingDays.includes(day)}
              onPress={() => toggleDay(day)}
              style={[
                styles.dayChip,
                visitingDays.includes(day) && { backgroundColor: colors.primary },
              ]}
              selectedColor="#fff"
              textStyle={{
                color: visitingDays.includes(day) ? '#fff' : colors.textSecondary,
              }}
            >
              {day}
            </Chip>
          ))}
        </View>

        {/* ✅ OPD Time Range — TouchableRipple replaces TouchableOpacity */}
        <Text style={styles.label}>OPD Time Range</Text>
        <View style={styles.rangeRow}>
          <TouchableRipple
            style={styles.timeBox}
            onPress={() => openRangePicker('from')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={{ color: colors.textPrimary }}>
              {currentFrom || 'From Time'}
            </Text>
          </TouchableRipple>

          <TouchableRipple
            style={styles.timeBox}
            onPress={() => openRangePicker('to')}
            rippleColor={colors.primary + '22'}
          >
            <Text style={{ color: colors.textPrimary }}>
              {currentTo || 'To Time'}
            </Text>
          </TouchableRipple>

          <Button
            mode="contained"
            onPress={addTimeRange}
            disabled={!currentFrom || !currentTo}
            buttonColor={!currentFrom || !currentTo ? colors.border : colors.primary}
            style={styles.addIconBtn}
            labelStyle={styles.addIconText}
            compact
          >
            +
          </Button>
        </View>

        {/* ✅ Existing time ranges */}
        {opdTimeRanges.map((range, index) => (
          <View key={index} style={styles.rangeRow}>
            <View style={styles.timeBox}>
              <Text style={{ color: colors.textPrimary }}>{range.from}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={{ color: colors.textPrimary }}>{range.to}</Text>
            </View>
            <Button
              mode="contained"
              onPress={() => removeTimeRange(index)}
              buttonColor={colors.border}
              style={styles.removeBtn}
              labelStyle={{ color: colors.textSecondary, fontSize: 14 }}
              compact
            >
              ✕
            </Button>
          </View>
        ))}

        {showRangePicker && (
          <DateTimePicker
            value={pickerDate}
            mode="time"
            display="default"
            onChange={onRangeTimeChange}
          />
        )}

        <TextInput
          label="Patients / Hour"
          placeholder="e.g. 3"
          value={patientsPerHour}
          onChangeText={setPatientsPerHour}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        <TextInput
          label="Advance Booking (days)"
          placeholder="e.g. 7"
          value={advanceBooking}
          onChangeText={setAdvanceBooking}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* ✅ Paper Button replaces AppButton */}
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={handleCancelPress}
            buttonColor={colors.border}
            textColor={colors.textPrimary}
            style={styles.halfBtn}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleCreatePress}
            buttonColor={colors.primary}
            style={styles.halfBtn}
          >
            {isEdit ? 'Save Changes' : 'Create Package'}
          </Button>
        </View>
      </BaseModal>

      <ConfirmModal
        visible={showCreateConfirm}
        type={isEdit ? 'edit' : 'add'}
        message={
          isEdit
            ? `Are you sure you want to save changes to "${name}"?`
            : `Are you sure you want to create "${name}" health package?`
        }
        onConfirm={() => { setShowCreateConfirm(false); handleCreate(); }}
        onCancel={() => setShowCreateConfirm(false)}
      />

      <ConfirmModal
        visible={showCancelConfirm}
        type="cancel"
        onConfirm={() => { setShowCancelConfirm(false); resetForm(); onClose(); }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </>
  );
};

export default CreateHealthPackageModal;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    backgroundColor: colors.card,
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
  },
  dayChip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  timeBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.card,
  },
  addIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
  halfBtn: {
    flex: 1,
  },
});