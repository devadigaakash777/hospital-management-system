import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { colors } from '../../theme';
import { ListItem, ConfirmModal } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDepartmentModal from '../../components/ManageDepartment/AddDepartmentModal';
import { wp, hp } from '../../utils/responsive';

type Department = {
  id: string;
  name: string;
};

const Separator = () => <View style={{ height: hp(1) }} />;

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
      <IconButton
        icon="close"
        iconColor={colors.error}
        size={wp(5)}
        onPress={() => handleDelete(item)}
      />
    </ListItem>
  );

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        data={departments}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp(4),
          paddingBottom: hp(2.5),
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View style={{ marginBottom: hp(1) }}>
            {/* Title */}
            <Text
              style={{
                fontSize: wp(6),
                fontWeight: '700',
                color: colors.textPrimary,
                marginTop: hp(2),
                marginBottom: hp(0.5),
              }}
            >
              Manage Departments
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontSize: wp(3.5),
                color: colors.textSecondary,
                marginBottom: hp(2),
              }}
            >
              Add and manage hospital departments
            </Text>

            {/* Add Button */}
            <Button
              mode="contained"
              icon="plus"
              onPress={() => setOpen(true)}
              buttonColor={colors.primary}
              textColor="#fff"
              style={{
                marginBottom: hp(2.5),
                borderRadius: wp(2),
              }}
            >
              Add Department
            </Button>

            {/* Section Label */}
            <Text
              style={{
                fontSize: wp(3.8),
                fontWeight: '600',
                color: colors.textSecondary,
                marginBottom: hp(1),
              }}
            >
              Current Departments
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              color: colors.textSecondary,
              marginTop: hp(5),
              fontSize: wp(3.8),
            }}
          >
            No departments found.
          </Text>
        }
      />

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