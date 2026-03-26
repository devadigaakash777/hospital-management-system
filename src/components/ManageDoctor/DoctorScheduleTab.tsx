import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { EntityCard, EntityCardRow } from '..';
import { colors } from '../../theme';

interface Props {
  doctorName: string;
  department: string;
  roomNumber?: string;
  opdTiming: string;
  visitingDays: string;
  totalSlots: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

const DoctorScheduleTab: React.FC<Props> = ({
  doctorName,
  department,
  roomNumber,
  opdTiming,
  visitingDays,
  totalSlots,
  onDelete,
  onEdit,
}) => {
  const rows: EntityCardRow[] = [
    ...(roomNumber
      ? [{ icon: 'door', label: 'Room:', value: roomNumber }]
      : []),
    { icon: 'clock-outline',   label: 'OPD Timing:',    value: opdTiming },
    { icon: 'calendar-month',  label: 'Visiting Days:',  value: visitingDays },
    { icon: 'account-group',   label: 'Total Slots:',    value: totalSlots },
  ];

  // ✅ Paper Button replaces AppButton in footer
  const footer = (
    <View style={styles.buttonRow}>
      <Button
        mode="contained"
        onPress={() => onEdit?.()}
        icon="pencil"
        buttonColor={colors.primary}
        textColor="#fff"
        style={styles.actionBtn}
      >
        Edit
      </Button>
      <Button
        mode="contained"
        onPress={() => onDelete?.()}
        icon="delete"
        buttonColor={colors.error}
        textColor="#fff"
        style={styles.actionBtn}
      >
        Delete
      </Button>
    </View>
  );

  return (
    <EntityCard
      title={doctorName}
      subtitle={department}
      headerIcon="doctor"
      rows={rows}
      footer={footer}
    />
  );
};

export default DoctorScheduleTab;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
});