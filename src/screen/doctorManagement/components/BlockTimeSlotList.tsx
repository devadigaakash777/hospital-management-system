import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem, AppButton } from '../../../components';
import { colors } from '../../../theme';

interface Props {
  doctorID: string;
}

const BlockedTime: string[] = [
  '11/29/2025 * 10:00:00 - 11:00:00',
  '12/23/2025 * 11:00:00 - 12:00:00',
  '12/03/2025 * 10:00:00 - 01:00:00',
  '11/23/2025 * 11:00:00 - 11:30:00',
  '11/24/2025 * 06:00:00 - 07:00:00',
  '12/25/2025 * 08:00:00 - 09:00:00',
  '12/06/2025 * 20:30:00 - 21:00:00',
  '11/30/2025 * 19:00:00 - 20:00:00',
];

const BlockTimeSlotList: React.FC<Props> = ({ doctorID }) => {
  const renderItem = ({ item }: { item: string }) => (
    <ListItem
      title={item}
      backgroundColor={colors.card}
      containerStyle={styles.listItem}
    >
      <AppButton
        containerStyle={styles.deleteBtn}
        color={colors.error}
        iconName="delete-outline"
        onPress={() => {}}
      />
    </ListItem>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Blocked Dates of {doctorID}</Text>

      <FlatList
        data={BlockedTime}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BlockTimeSlotList;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
    color: colors.textPrimary,
  },
  listItem: { marginBottom: 10 },
  deleteBtn: { paddingHorizontal: 0 },
});
