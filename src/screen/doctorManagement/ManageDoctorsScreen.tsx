import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme';
import SearchablePicker from '../../components/layout/SearchablePicker';
import { AppButton } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDoctorModal from './components/AddDoctorModal';

const departmentsData = ['Cardiology', 'Dermatology', 'GeneralMedicine'];
const doctorData = [
  'Dr. Sunil G',
  'Dr. Anitha R',
  'Dr. Kavya M',
  'Dr. Ramesh K',
];

const DoctorSelectionSection = () => {
  const [department, setDepartment] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchablePicker
          label="Department"
          value={department}
          placeholder="Select Department"
          options={departmentsData}
          onSelect={setDepartment}
        />

        <SearchablePicker
          label="Doctor"
          value={doctor}
          placeholder="Select Doctor"
          options={doctorData}
          onSelect={setDoctor}
        />

        {/* Additional Details Section */}
        <View style={styles.detailsContainer}>
          {/* Future Doctor Details Here */}
        </View>
      </ScrollView>

      {/* Fixed Footer Button */}
      <View style={styles.footer}>
        <AppButton
          text="Add Doctor"
          onPress={() => setOpen(true)}
          backgroundColor={colors.primary}
          color={colors.textPrimary}
          iconFamily="MaterialCommunityIcons"
          iconName="plus"
        />
      </View>
      <AddDoctorModal visible={open} onClose={() => setOpen(false)} />
    </SafeAreaView>
  );
};

export default DoctorSelectionSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  detailsContainer: {
    marginTop: 20,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 120,
  },
  footer: {
    padding: 16,
  },
});
