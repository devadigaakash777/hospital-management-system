import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../../theme';
import { AppCheckbox } from '../../../components';

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
        <View style={styles.row}>
          <View style={styles.weekHeader} />
          {days.map((day) => (
            <Text key={day} style={styles.dayHeader}>
              {day}
            </Text>
          ))}
        </View>

        {/* Rows */}
        {weeks.map((week) => (
          <View key={week} style={styles.row}>
            <Text style={styles.weekLabel}>{week}</Text>

            {days.map((day) => (
              <View key={day} style={styles.cell}>
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekHeader: {
    width: 90,
  },
  dayHeader: {
    width: 55,
    textAlign: 'center',
    color: colors.textSecondary,
    fontWeight: '600',
  },
  weekLabel: {
    width: 90,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  cell: {
    width: 55,
    alignItems: 'center',
  },
});
