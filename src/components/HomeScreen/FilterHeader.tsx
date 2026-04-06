import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Chip, Button } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(3),
      }}
    >
      {/* Day Chips */}
      <View style={{ flexDirection: 'row', gap: wp(2) }}>
        {days.map(day => (
          <Chip
            key={day}
            selected={activeDay === day}
            onPress={() => handleDayPress(day)}
            style={{
              borderRadius: wp(5),
              backgroundColor: activeDay === day ? colors.primary : colors.surface,
            }}
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

      {/* Filter Button */}
      <Button
        mode="outlined"
        icon="filter-outline"
        onPress={
          onAdvancedFilterPress ||
          (() => Alert.alert('Advanced Filter', 'Advanced filter functionality coming soon!'))
        }
        textColor={colors.textPrimary}
        style={{
          borderColor: colors.border,
          backgroundColor: colors.surface,
          borderRadius: wp(2),
        }}
        labelStyle={{ fontWeight: '500' }}
      >
        Filter
      </Button>
    </View>
  );
};

export default FilterHeader;