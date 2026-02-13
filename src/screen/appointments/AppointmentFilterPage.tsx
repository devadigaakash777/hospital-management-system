import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppointmentFilterModal from './AppointmentFilterSheet';

const AppointmentFilterPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text>Filter</Text>
      </TouchableOpacity>

      <AppointmentFilterModal
        visible={open}
        onClose={() => setOpen(false)}
      />
    </View>
  );
};

export default AppointmentFilterPage;
