import { View, StyleSheet, FlatList } from 'react-native';
import { SearchablePicker } from '../../components';
import BlockDatesCard from './components/BlockDatesCard';
import BlockDatesList from './components/BlockDatesList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useState } from 'react';

const departmentsData = ['Cardiology', 'Dermatology', 'GeneralMedicine'];
const doctorData = [
  'Dr. Sunil G',
  'Dr. Anitha R',
  'Dr. Kavya M',
  'Dr. Ramesh K',
];

export default function BlockAvailabilityScreen() {
  const [department, setDepartment] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={doctor ? ['content'] : []}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
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
          </View>
        }
        renderItem={() => (
          <View>
            <BlockDatesCard />
            <BlockDatesList doctorID={doctor!} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
});
