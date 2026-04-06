import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { ListItem, ConfirmModal } from '..';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

interface Props {
  doctorID: string;
}

const INITIAL_TIMES: string[] = [
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
  const [times, setTimes] = useState<string[]>(INITIAL_TIMES);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const renderItem = ({ item }: { item: string }) => (
    <ListItem
      title={item}
      backgroundColor={colors.card}
      containerStyle={{ marginBottom: hp(1.2) }}
    >
      <IconButton
        icon="delete"
        iconColor={colors.error}
        size={wp(5.5)}
        onPress={() => setDeleteConfirm(item)}
      />
    </ListItem>
  );

  return (
    <Card
      style={{
        borderRadius: wp(3.5),
        borderColor: colors.border,
        backgroundColor: colors.surface,
        marginVertical: hp(1.5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(0.5) },
        shadowOpacity: 0.08,
        shadowRadius: wp(1.5),
        elevation: 4,
      }}
      mode="outlined"
    >
      <Card.Content>
        <Text
          style={{
            fontSize: wp(4),
            fontWeight: '700',
            marginBottom: hp(1.8),
            color: colors.textPrimary,
          }}
        >
          Blocked Time Slots of {doctorID}
        </Text>

        <FlatList
          data={times}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                color: colors.textSecondary,
                marginTop: hp(1.2),
              }}
            >
              No blocked time slots.
            </Text>
          }
        />
      </Card.Content>

      <ConfirmModal
        visible={!!deleteConfirm}
        type="delete"
        message={
          deleteConfirm
            ? `Are you sure you want to remove "${deleteConfirm}" from blocked time slots?`
            : undefined
        }
        onConfirm={() => {
          setTimes(prev => prev.filter(t => t !== deleteConfirm));
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </Card>
  );
};

export default BlockTimeSlotList;