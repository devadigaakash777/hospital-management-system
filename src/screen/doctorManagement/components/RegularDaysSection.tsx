import React from 'react';
import { View } from 'react-native';
import { AppCheckbox } from '../../../components';

interface Props {
  weekDays: string[];
  selectedDays: string[];
  toggleDay: (day: string) => void;
  toggleAllDays: (value: boolean) => void;
  allDays: boolean;
}

const RegularDaysSection: React.FC<Props> = ({
  weekDays,
  selectedDays,
  toggleDay,
  toggleAllDays,
  allDays,
}) => {
  return (
    <View>
      <AppCheckbox label="All Days" value={allDays} onChange={toggleAllDays} />

      {weekDays.map((day) => (
        <AppCheckbox
          key={day}
          label={day}
          value={selectedDays.includes(day)}
          onChange={() => toggleDay(day)}
        />
      ))}
    </View>
  );
};

export default RegularDaysSection;
