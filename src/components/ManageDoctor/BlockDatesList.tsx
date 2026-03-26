import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { ListItem, ConfirmModal } from '..';
import { colors } from '../../theme';

interface Props {
  doctorID: string;
}

const INITIAL_DATES: string[] = [
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
  const [dates, setDates] = useState<string[]>(INITIAL_DATES);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const renderItem = ({ item }: { item: string }) => (
    <ListItem
      title={item}
      backgroundColor={colors.card}
      containerStyle={styles.listItem}
    >
      {/* ✅ Paper IconButton replaces AppButton icon-only button */}
      <IconButton
        icon="delete"
        iconColor={colors.error}
        size={22}
        onPress={() => setDeleteConfirm(item)}
      />
    </ListItem>
  );

  return (
    // ✅ Paper Card replaces custom View with shadow/border
    <Card style={styles.card} mode="outlined">
      <Card.Content>

        <Text style={styles.title}>Blocked Dates of {doctorID}</Text>

        <FlatList
          data={dates}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No blocked dates.</Text>
          }
        />

      </Card.Content>

      {/* ✅ ConfirmModal unchanged */}
      <ConfirmModal
        visible={!!deleteConfirm}
        type="delete"
        message={
          deleteConfirm
            ? `Are you sure you want to remove "${deleteConfirm}" from blocked dates?`
            : undefined
        }
        onConfirm={() => {
          setDates(prev => prev.filter(d => d !== deleteConfirm));
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </Card>
  );
};

export default BlockDatesList;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderColor: colors.border,
    backgroundColor: colors.surface,
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
  listItem: {
    marginBottom: 10,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 10,
  },
});