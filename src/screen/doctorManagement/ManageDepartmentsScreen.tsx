import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { colors } from '../../theme';
import { AppButton, ListItem } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDepartmentModal from './components/AddDepartmentModal';

type Department = {
  id: string;
  name: string;
};

const Separator = () => <View style={styles.separator} />;

export default function ManageDepartmentsScreen() {
  const [open, setOpen] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Respiratory Department' },
    { id: '2', name: 'Cardiology Department' },
    { id: '3', name: 'Neurology Department' },
    { id: '4', name: 'Orthopedics Department' },
  ]);

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Department',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDepartments((prev) => prev.filter((dept) => dept.id !== id));
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Department }) => (
    <ListItem
      iconFamily="MaterialCommunityIcons"
      iconName="hospital-building"
      title={item.name}
    >
      <AppButton
        containerStyle={styles.xButton}
        color={colors.textPrimary}
        iconFamily="FontAwesome6"
        iconName="xmark"
        onPress={() => handleDelete(item.id, item.name)}
      />
    </ListItem>
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      <View style={styles.footer}>
        <AppButton
          text="Add Department"
          onPress={() => setOpen(true)}
          backgroundColor={colors.primary}
          color={colors.textPrimary}
          iconFamily="MaterialCommunityIcons"
          iconName="plus"
        />
      </View>
      <AddDepartmentModal
        visible={open}
        onClose={() => setOpen(false)}
        onAdd={() =>
          Alert.alert('new Department', 'functionality coming soon!')
        }
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
  separator: {
    height: 10,
  },
  footer: {
    paddingTop: 12,
  },
  xButton: { paddingHorizontal: 0 },
});
