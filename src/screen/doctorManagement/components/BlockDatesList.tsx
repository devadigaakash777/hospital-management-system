import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { ListItem, AppButton } from '../../../components';
import { colors } from '../../../theme';

interface Props {
  doctorID: string;
}

const BlockedDates: string[] = [
  '11/29/2025',
  '12/23/2025',
  '12/03/2025',
  '11/23/2025',
  '11/24/2025',
  '12/25/2025',
  '12/06/2025',
  '11/30/2025',
];

const BlockDatesList: React.FC<Props> = ({ doctorID }) => {
  const renderItem = ({ item }: { item: string }) => (
    <ListItem
      title={item}
      backgroundColor={colors.card}
      containerStyle={{ marginBottom: 10 }}
    >
      <AppButton
        containerStyle={{ paddingHorizontal: 0 }}
        color={colors.error}
        iconName="delete-outline"
        onPress={() => console.log('Delete:', item)}
      />
    </ListItem>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Blocked Dates of {doctorID}
      </Text>

        <FlatList
          data={BlockedDates}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

export default BlockDatesList;

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
 
});
