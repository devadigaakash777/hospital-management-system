import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../theme';
import { AppButton } from '../../../components';

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
      {/* Left: Day Filters */}
      <View style={styles.leftContainer}>
        {days.map(day => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              activeDay === day && styles.activeDayButton,
            ]}
            onPress={() => handleDayPress(day)}
          >
            <Text
              style={[
                styles.dayText,
                activeDay === day && styles.activeDayText,
              ]}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Right: Advanced Filter Button */}
      <AppButton
        iconFamily="Ionicons"
        iconName="filter-outline"
        text="Filter"
        onPress={onAdvancedFilterPress || (() => console.log('Advanced Filter Pressed'))}
        color={colors.textPrimary}
        backgroundColor={colors.surface}
        borderColor={colors.border}
      />
    </View>
  );
};

export default FilterHeader;

/* ------------------- Styles ------------------- */

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
    gap: 10,
  },
  dayButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  activeDayButton: {
    backgroundColor: colors.primary,
  },
  dayText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeDayText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  filterText: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
});
