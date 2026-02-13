import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import AppointmentFilterBottomSheet, {
  AppointmentFilterBottomSheetRef,
} from './AppointmentFilterBottomSheet';
import { colors } from '../../theme';

const AppointmentFilterPage = () => {
  const sheetRef = useRef<AppointmentFilterBottomSheetRef>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            console.log('FILTER CLICKED');
            sheetRef.current?.open();
          }}
        >
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* MUST be rendered once */}
      <AppointmentFilterBottomSheet ref={sheetRef} />
    </View>
  );
};

export default AppointmentFilterPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '700' },
  filterBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: { color: '#fff', fontWeight: '600' },
});
