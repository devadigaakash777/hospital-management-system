import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { colors } from '../../theme';
import { AppButton, ListItem } from '../../components';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';

type Department = {
  id: string;
  name: string;
};

const Separator = () => <View style={styles.separator} />;

export default function ManageDepartmentsScreen() {
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
            setDepartments(prev =>
              prev.filter(dept => dept.id !== id)
            );
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Department }) => (
    <ListItem title={item.name}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => handleDelete(item.id, item.name)}
      >
        <FontAwesome6
          name="xmark"
          size={20}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
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
          onPress={() => console.log('Add Department Pressed')}
          backgroundColor={colors.primary}
          color={colors.textPrimary}
          iconFamily="MaterialCommunityIcons"
          iconName="plus"
        />
      </View>
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
  iconBtn: {
    padding: 8,
  },
  separator: {
    height: 10,
  },
  footer: {
    paddingTop: 12,
  },
});
