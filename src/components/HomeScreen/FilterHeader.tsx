import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Chip, Button } from 'react-native-paper';
import { colors } from '../../theme';

type DayType = 'yesterday' | 'today' | 'tomorrow';

interface Props {
  onDayChange?: (day: DayType) => void;
  onAdvancedFilterPress?: () => void;
}

const FilterHeader: React.FC<Props> = ({
  onDayChange,
  onAdvancedFilterPress,
}) => {
  const [activeDay, setActiveDay] = useState<DayType>('today');

  const handleDayPress = (day: DayType) => {
    setActiveDay(day);
    onDayChange?.(day);
  };

  const days: DayType[] = ['yesterday', 'today', 'tomorrow'];

  return (
    <View style={styles.container}>

      {/* ✅ Paper Chip replaces custom dayButton TouchableOpacity */}
      <View style={styles.leftContainer}>
        {days.map(day => (
          <Chip
            key={day}
            selected={activeDay === day}
            onPress={() => handleDayPress(day)}
            style={[
              styles.dayChip,
              activeDay === day && { backgroundColor: colors.primary },
            ]}
            selectedColor="#fff"
            textStyle={{
              color: activeDay === day ? colors.textPrimary : colors.textSecondary,
              fontWeight: activeDay === day ? '600' : '500',
            }}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Chip>
        ))}
      </View>

      {/* ✅ Paper Button replaces AppButton */}
      <Button
        mode="outlined"
        icon="filter-outline"
        onPress={
          onAdvancedFilterPress ||
          (() => Alert.alert('Advanced Filter', 'Advanced filter functionality coming soon!'))
        }
        textColor={colors.textPrimary}
        style={styles.filterBtn}
        labelStyle={styles.filterLabel}
      >
        Filter
      </Button>

    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dayChip: {
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  filterBtn: {
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  filterLabel: {
    fontWeight: '500',
  },
});