import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useStaff, StaffData } from '../../context/StaffContext';

const ManageStaffScreen = () => {
  const navigation = useNavigation<any>();
  const { staffList, deleteStaff } = useStaff();

  /* ── DELETE ── */
  const handleDeletePress = (staff: StaffData) => {
    Alert.alert(
      'Delete Staff',
      `Are you sure you want to delete "${staff.username}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteStaff(staff.id),
        },
      ],
    );
  };

  /* ── CARD ── */
  const renderStaff = ({ item }: { item: StaffData }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>

        {/* Username */}
        <Text style={styles.name}>{item.username}</Text>

        {/* Group or Manual Rights */}
        <Text style={styles.metaLabel}>
          {item.group ? `Group: ${item.group}` : 'Manual Rights'}
        </Text>

        {/* Departments */}
        {item.departments.length > 0 && (
          <Text style={styles.meta}>
            📍 {item.departments.join(', ')}
          </Text>
        )}

        {/* Permissions — only shown for manual mode */}
        {!item.group && (
          <Text style={styles.meta}>
            🔑 {Object.entries(item.permissions)
              .filter(([_, val]) => val)
              .map(([key]) =>
                key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, s => s.toUpperCase()),
              )
              .join(', ') || 'No permissions selected'}
          </Text>
        )}

      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('CreateStaff', { editStaff: item })
          }
        >
          <Feather name="edit-2" size={15} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDeletePress(item)}
        >
          <Feather name="trash-2" size={15} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={staffList}
        keyExtractor={item => item.id}
        renderItem={renderStaff}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Manage Staff</Text>
            <Text style={styles.subtitle}>
              Create and manage staff accounts
            </Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('CreateStaff', {})}
            >
              <Text style={styles.addText}>+ Add Staff Member</Text>
            </TouchableOpacity>
            <Text style={styles.sectionLabel}>Current Staff Members</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No staff members found.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ManageStaffScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginBottom: 12 },
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
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardContent: { flex: 1 },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 3,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
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