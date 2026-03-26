import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useGroups, GroupData } from '../../context/GroupContext';
import {
  ConfirmModal,
  EntityCard,
  EntityCardRow,
  SearchInput,
} from '../../components';

export type { GroupData };

const ManageGroupsScreen = () => {
  const navigation = useNavigation<any>();
  const { groups, deleteGroup } = useGroups();
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<GroupData | null>(null);

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderGroup = ({ item }: { item: GroupData }) => {
    const rows: EntityCardRow[] = [
      ...(item.departments.length > 0
        ? [{ icon: 'map-marker-outline', label: 'Departments:', value: item.departments.join(', ') }]
        : []),
      ...(item.permissions.length > 0
        ? [{ icon: 'shield-key-outline', label: 'Permissions:', value: item.permissions.join(', ') }]
        : []),
    ];

    return (
      <EntityCard
        title={item.name}
        rows={rows}
        footer={
          // ✅ Paper Button replaces AppButton
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateGroupScreen', { editGroup: item })}
              icon="pencil"
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.actionBtn}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              onPress={() => setDeleteConfirm(item)}
              icon="delete"
              buttonColor={colors.error}
              textColor="#fff"
              style={styles.actionBtn}
            >
              Delete
            </Button>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderGroup}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>Manage Groups</Text>
            <Text style={styles.subtitle}>
              Create and manage permission groups
            </Text>

            {/* ✅ SearchInput unchanged — already converted */}
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search groups by name..."
            />

            {/* ✅ Paper Button replaces TouchableOpacity + Text */}
            <Button
              mode="contained"
              icon="plus"
              onPress={() => navigation.navigate('CreateGroupScreen', {})}
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.addBtn}
              labelStyle={styles.addBtnLabel}
            >
              Create New Group
            </Button>

            <Text style={styles.sectionLabel}>Available Groups</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No groups found.</Text>
        }
      />

      {/* ✅ ConfirmModal unchanged — already converted */}
      <ConfirmModal
        visible={!!deleteConfirm}
        type="delete"
        message={
          deleteConfirm
            ? `Are you sure you want to delete "${deleteConfirm.name}"?`
            : undefined
        }
        onConfirm={() => {
          if (deleteConfirm) deleteGroup(deleteConfirm.id);
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </SafeAreaView>
  );
};

export default ManageGroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
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
  addBtn: {
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  addBtnLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
  },
});