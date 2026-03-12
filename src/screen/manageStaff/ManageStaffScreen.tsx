import React, { useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StaffStackParamList } from '../../navigation/StaffManagementStack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigation/DrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

type StackNav = NativeStackNavigationProp<
  StaffStackParamList,
  'ManageStaffHome'
>;

export default function ManageStaffScreen() {
  const navigation = useNavigation<StackNav>();
  type DrawerNav = DrawerNavigationProp<DrawerParamList>;

  const staffList = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Receptionist',
      phone: '9876543210',
    },
    {
      id: 2,
      name: 'David Lee',
      role: 'Lab Technician',
      phone: '9123456780',
    },
  ];

  const renderHeaderLeft = useCallback(() => {
    const parent = navigation.getParent<DrawerNav>();

    return (
      <Ionicons
        name="menu"
        size={24}
        color={colors.textPrimary}
        onPress={() => parent?.openDrawer()}
        style={styles.menuIcon}
      />
    );
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    });
  }, [navigation, renderHeaderLeft]);

  return (
    <ScrollView style={styles.container}>
      {/* Create Staff Button */}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateStaff')}
      >
        <Ionicons name="add-circle" size={20} color="white" />
        <Text style={styles.createButtonText}>Create New Staff</Text>
      </TouchableOpacity>

      {/* Staff List */}

      {staffList.map((staff) => (
        <View key={staff.id} style={styles.card}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{staff.name}</Text>
            <Text style={styles.detail}>Role: {staff.role}</Text>
            <Text style={styles.detail}>Phone: {staff.phone}</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('CreateStaff')}
          >
            <Ionicons name="create-outline" size={18} color="white" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  createButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },

  createButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  infoContainer: {
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  detail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  editButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 6,
  },

  editText: {
    color: 'white',
    fontWeight: '600',
  },
});
