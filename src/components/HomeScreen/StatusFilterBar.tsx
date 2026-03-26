import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { colors } from '../../theme';

type Props = {
  onFilterChange?: (status: string) => void;
};

const StatusFilterBar: React.FC<Props> = ({ onFilterChange }) => {
  const [activeStatus, setActiveStatus] = useState('all');

  const buttons = [
    { key: 'all',          label: 'All (150)',                   icon: 'view-grid' },
    { key: 'appointments', label: 'Total Appointments (120)',    icon: 'calendar-multiple' },
    { key: 'admitted',     label: 'Admitted (80)',               icon: 'bed-outline' },
    { key: 'confirmed',    label: 'Confirmed (10)',              icon: 'check-circle-outline' },
    { key: 'completed',    label: 'Completed (10)',              icon: 'clipboard-check-outline' },
    { key: 'cancelled',    label: 'Cancelled (20)',              icon: 'close-circle-outline' },
  ];

  const handlePress = (key: string) => {
    setActiveStatus(key);
    onFilterChange?.(key);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* ✅ Paper Chip replaces AppButton for filter tabs */}
      {buttons.map(btn => (
        <Chip
          key={btn.key}
          icon={btn.icon}
          selected={activeStatus === btn.key}
          onPress={() => handlePress(btn.key)}
          style={[
            styles.chip,
            activeStatus === btn.key
              ? { backgroundColor: colors.primary, borderColor: colors.primary }
              : { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          selectedColor={colors.textPrimary}
          textStyle={{
            color: activeStatus === btn.key
              ? colors.textPrimary
              : colors.textSecondary,
            fontWeight: activeStatus === btn.key ? '600' : '400',
          }}
        >
          {btn.label}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default StatusFilterBar;