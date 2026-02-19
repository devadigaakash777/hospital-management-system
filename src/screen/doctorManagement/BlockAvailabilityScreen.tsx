import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SearchablePicker } from '../../components';
import BlockDatesCard from './components/BlockDatesCard';
import BlockDatesList from './components/BlockDatesList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useState } from 'react';
import BlockTimeSlotCard from './components/BlockTimeSlotCard';
import BlockTimeSlotList from './components/BlockTimeSlotList';

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
  const [activeTab, setActiveTab] = useState<'BlockDates' | 'BlockTimeSlots'>(
    'BlockDates',
  );

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
          <>
            <View style={styles.tabRow}>
              <TouchableOpacity onPress={() => setActiveTab('BlockDates')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'BlockDates' && styles.activeTab,
                  ]}
                >
                  Block Dates
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('BlockTimeSlots')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'BlockTimeSlots' && styles.activeTab,
                  ]}
                >
                  Block Time Slots
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
              {activeTab === 'BlockDates' && (
                <>
                  <BlockDatesCard />
                  <BlockDatesList doctorID={doctor!} />
                </>
              )}

              {activeTab === 'BlockTimeSlots' && (
                <>
                  <BlockTimeSlotCard />
                  <BlockTimeSlotList doctorID={doctor!} />
                </>
              )}
            </View>
          </>
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
  tabContainer: { marginBottom: 20 },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20,
    marginTop: 20,
  },
  tabText: {
    color: colors.textPrimary,
    paddingBottom: 4,
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
});
