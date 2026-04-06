import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../theme';
import { AppCheckbox } from '..';
import { wp } from '../../utils/responsive';

const weeks = ['1st Week', '2nd Week', '3rd Week', '4th Week', 'Last Week'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type SelectionState = {
  [week: string]: string[];
};

interface Props {
  selected: SelectionState;
  onToggle: (week: string, day: string) => void;
}

const SpecificWeekSection: React.FC<Props> = ({ selected, onToggle }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: wp(22) }} />
          {days.map(day => (
            <Text
              key={day}
              style={{
                width: wp(13),
                textAlign: 'center',
                color: colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Rows */}
        {weeks.map(week => (
          <View key={week} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                width: wp(22),
                color: colors.textPrimary,
                fontWeight: '600',
              }}
            >
              {week}
            </Text>
            {days.map(day => (
              <View
                key={day}
                style={{
                  width: wp(13),
                  alignItems: 'center',
                }}
              >
                <AppCheckbox
                  value={selected[week]?.includes(day) || false}
                  onChange={() => onToggle(week, day)}
                />
              </View>
            ))}
          </View>
        ))}

      </View>
    </ScrollView>
  );
};

export default SpecificWeekSection;