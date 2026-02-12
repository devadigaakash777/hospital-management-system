import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import { AppButton } from '../../../components';

type Props = {
  onFilterChange?: (status: string) => void;
};

const StatusFilterBar: React.FC<Props> = ({ onFilterChange }) => {
  const [activeStatus, setActiveStatus] = useState('all');

  const buttons = [
    { key: 'all', label: 'All (150)', icon: 'view-grid' },
    { key: 'appointments', label: 'Total Appointments (120)', icon: 'calendar-multiple' },
    { key: 'admitted', label: 'Admitted (80)', icon: 'bed-outline' },
    { key: 'confirmed', label: 'Confirmed (10)', icon: 'check-circle-outline' },
    { key: 'completed', label: 'Completed (10)', icon: 'clipboard-check-outline' },
    { key: 'cancelled', label: 'Cancelled (20)', icon: 'close-circle-outline' },
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
      {buttons.map(btn => (
        <AppButton
          key={btn.key}
          iconFamily="MaterialCommunityIcons"
          iconName={btn.icon}
          text={btn.label}
          onPress={() => handlePress(btn.key)}
          color={activeStatus === btn.key ? colors.textPrimary : colors.textSecondary}
          backgroundColor={
            activeStatus === btn.key ? colors.primary : colors.surface
          }
          borderColor={activeStatus === btn.key ? colors.primary : colors.border}
        />
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
});

export default StatusFilterBar;
