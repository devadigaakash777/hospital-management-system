import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { colors } from '../../theme';
import { ListItem, ConfirmModal } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDepartmentModal from '../../components/ManageDepartment/AddDepartmentModal';

type Department = {
  id: string;
  name: string;
};

const Separator = () => <View style={styles.separator} />;

export default function ManageDepartmentsScreen() {
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Department | null>(null);

  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Respiratory Department' },
    { id: '2', name: 'Cardiology Department' },
    { id: '3', name: 'Neurology Department' },
    { id: '4', name: 'Orthopedics Department' },
  ]);

  const handleDelete = (item: Department) => {
    setDeleteConfirm(item);
  };

  const renderItem = ({ item }: { item: Department }) => (
    <ListItem
      iconFamily="MaterialCommunityIcons"
      iconName="hospital-building"
      title={item.name}
    >
      {/* ✅ Paper IconButton replaces AppButton icon-only */}
      <IconButton
        icon="close"
        iconColor={colors.textPrimary}
        size={20}
        onPress={() => handleDelete(item)}
      />
    </ListItem>
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={departments}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        ListHeaderComponent={
          <>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>Manage Departments</Text>
            <Text style={styles.subtitle}>
              Add and manage hospital departments
            </Text>

            {/* ✅ Paper Button replaces AppButton */}
            <Button
              mode="contained"
              icon="plus"
              onPress={() => setOpen(true)}
              buttonColor={colors.primary}
              textColor="#fff"
              style={styles.addBtn}
            >
              Add Department
            </Button>

            <Text style={styles.sectionLabel}>Current Departments</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No departments found.</Text>
        }
      />

      {/* ✅ AddDepartmentModal unchanged — already converted */}
      <AddDepartmentModal
        visible={open}
        onClose={() => setOpen(false)}
        onAdd={name => {
          setDepartments(prev => [
            ...prev,
            { id: Date.now().toString(), name },
          ]);
          setOpen(false);
        }}
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
          setDepartments(prev =>
            prev.filter(dept => dept.id !== deleteConfirm?.id),
          );
          setDeleteConfirm(null);
        }}
        onCancel={() => setDeleteConfirm(null)}
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
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
    marginBottom: 16,
    borderRadius: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  separator: {
    height: 10,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
  },
});