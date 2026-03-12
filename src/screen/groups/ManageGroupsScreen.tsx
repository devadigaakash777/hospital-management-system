import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useGroups, GroupData } from '../../context/GroupContext';
import Feather from 'react-native-vector-icons/Feather';

export type { GroupData };

const ManageGroupsScreen = () => {
  const navigation = useNavigation<any>();
  const { groups, deleteGroup } = useGroups();
  const [search, setSearch] = useState('');

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* ── DELETE ── */
  const handleDelete = (group: GroupData) => {
    Alert.alert(
      'Delete Group',
      `Are you sure you want to delete "${group.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteGroup(group.id),
        },
      ],
    );
  };

  /* ── CARD ── */
  const renderGroup = ({ item }: { item: GroupData }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.meta} numberOfLines={2}>
          {item.departments.join(', ')}
        </Text>
        {item.permissions.map((p, i) => (
          <Text key={i} style={styles.permission}>• {p}</Text>
        ))}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('CreateGroupScreen', { editGroup: item })
          }
        >
          <Feather name="edit-2" size={15} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item)}
        >
          <Feather name="trash-2" size={15} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderGroup}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Manage Groups</Text>
            <Text style={styles.subtitle}>
              Create and manage permission groups
            </Text>

            <View style={styles.searchBox}>
              <Feather name="search" size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search groups by name..."
                placeholderTextColor={colors.textSecondary}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('CreateGroupScreen', {})}
            >
              <Text style={styles.addText}>+ Create New Group</Text>
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>Available Groups</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No groups found.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ManageGroupsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginBottom: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  addBtn: {
    backgroundColor: colors.primary,
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardContent: { flex: 1 },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  permission: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  cardActions: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
  },
});