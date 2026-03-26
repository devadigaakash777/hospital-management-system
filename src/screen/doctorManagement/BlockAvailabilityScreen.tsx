import { View, StyleSheet, FlatList } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { SearchablePicker } from '../../components';
import BlockDatesCard from '../../components/ManageDoctor/BlockDatesCard';
import BlockDatesList from '../../components/ManageDoctor/BlockDatesList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useState } from 'react';
import BlockTimeSlotCard from '../../components/ManageDoctor/BlockTimeSlotCard';
import BlockTimeSlotList from '../../components/ManageDoctor/BlockTimeSlotList';

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
  const [activeTab, setActiveTab] = useState<'BlockDates' | 'BlockTimeSlots'>('BlockDates');

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={doctor ? ['content'] : []}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>Block Availability</Text>
            <Text style={styles.subtitle}>
              Block specific dates or time slots for a doctor
            </Text>

            {/* ✅ SearchablePicker unchanged — already converted */}
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
            {/* ✅ TouchableRipple replaces TouchableOpacity tabs */}
            <View style={styles.tabRow}>
              <TouchableRipple
                onPress={() => setActiveTab('BlockDates')}
                rippleColor={colors.primary + '22'}
                style={styles.tabItem}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'BlockDates' && styles.activeTab,
                  ]}
                >
                  Block Dates
                </Text>
              </TouchableRipple>

              <TouchableRipple
                onPress={() => setActiveTab('BlockTimeSlots')}
                rippleColor={colors.primary + '22'}
                style={styles.tabItem}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'BlockTimeSlots' && styles.activeTab,
                  ]}
                >
                  Block Time Slots
                </Text>
              </TouchableRipple>
            </View>

            {/* ✅ All cards/lists unchanged — already converted */}
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20,
    marginTop: 20,
  },
  tabItem: {
    paddingBottom: 4,
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
  tabContainer: {
    marginBottom: 20,
  },
});