import { useState } from 'react';

export const useDoctorSchedule = () => {
  const [showTimePicker, setShowTimePicker] = useState<'from' | 'to' | null>(
    null,
  );

  return {
    showTimePicker,
    setShowTimePicker,
  };
};
