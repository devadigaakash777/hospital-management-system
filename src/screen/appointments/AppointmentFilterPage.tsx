import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppointmentFilterModal from './AppointmentFilterSheet';

const AppointmentFilterPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppointmentFilterPage;
