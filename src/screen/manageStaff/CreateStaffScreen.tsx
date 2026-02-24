import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { InputField, AppButton, SearchablePicker } from '../../components';
import { colors } from '../../theme';
import ManualRightsSection from './components/ManualRightsSection';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'GROUP' | 'MANUAL';

interface PermissionState {
  manageDoctorSlot: boolean;
  manageStaff: boolean;
  manageGroup: boolean;
  manageHealthPackage: boolean;
}

interface PermissionItem {
  key: keyof PermissionState;
  title: string;
  subtitle: string;
}

const dummyGroups: string[] = Array.from(
  { length: 40 },
  (_, i) => `Group ${i + 1}`,
);

const dummyDepartments: string[] = Array.from(
  { length: 60 },
  (_, i) => `Department ${i + 1}`,
);

const permissionConfig: PermissionItem[] = [
  {
    key: 'manageDoctorSlot',
    title: 'Manage Doctor Slot',
    subtitle: 'Create, update and control doctor availability slots',
  },
  {
    key: 'manageStaff',
    title: 'Manage Staff',
    subtitle: 'Add, edit and manage hospital staff accounts',
  },
  {
    key: 'manageGroup',
    title: 'Manage Group',
    subtitle: 'Create and configure permission groups',
  },
  {
    key: 'manageHealthPackage',
    title: 'Manage Health Package',
    subtitle: 'Create and manage health checkup packages',
  },
];

const CreateStaffScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('GROUP');
  const [deptModalVisible, setDeptModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const [permissions, setPermissions] = useState<PermissionState>({
    manageDoctorSlot: false,
    manageStaff: false,
    manageGroup: false,
    manageHealthPackage: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Minimum 3 characters required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }

    if (activeTab === 'GROUP' && !selectedGroup) {
      newErrors.permission = 'Please select a group';
    }

    if (activeTab === 'MANUAL') {
      if (selectedDepartments.length === 0) {
        newErrors.department = 'Select at least one department';
      }

      const anyPermission = Object.values(permissions).some(Boolean);
      if (!anyPermission) {
        newErrors.permission = 'Select at least one access permission';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectGroup = (value: string) => {
    setSelectedGroup(value);
    setSelectedDepartments([]);
    setPermissions({
      manageDoctorSlot: false,
      manageStaff: false,
      manageGroup: false,
      manageHealthPackage: false,
    });
  };

  const handleManualChange = () => {
    setSelectedGroup(null);
  };

  const togglePermission = (key: keyof PermissionState) => {
    handleManualChange();
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // const payload =
    //   activeTab === 'GROUP'
    //     ? {
    //         username,
    //         password,
    //         group: selectedGroup,
    //         departments: null,
    //         permissions: null,
    //       }
    //     : {
    //         username,
    //         password,
    //         group: null,
    //         departments: selectedDepartments,
    //         permissions,
    //       };

    // console.log('Payload:', payload);
    Alert.alert('Success', 'Staff created successfully');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Staff</Text>

        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          error={errors.username}
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          error={errors.password}
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'GROUP' && styles.activeTab]}
            onPress={() => setActiveTab('GROUP')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'GROUP' && styles.activeTabText,
              ]}
            >
              Select Group
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'MANUAL' && styles.activeTab]}
            onPress={() => setActiveTab('MANUAL')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'MANUAL' && styles.activeTabText,
              ]}
            >
              Manual Rights
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'GROUP' && (
          <View style={styles.groupContainer}>
            <SearchablePicker
              label="Select Group"
              value={selectedGroup}
              options={dummyGroups}
              onSelect={handleSelectGroup}
              placeholder="Search group"
            />
            {errors.permission && (
              <Text style={styles.error}>{errors.permission}</Text>
            )}
          </View>
        )}

        {activeTab === 'MANUAL' && (
          <ManualRightsSection
            departments={dummyDepartments}
            selectedDepartments={selectedDepartments}
            deptModalVisible={deptModalVisible}
            onOpenDepartmentModal={() => setDeptModalVisible(true)}
            onCloseDepartmentModal={() => setDeptModalVisible(false)}
            onDepartmentSubmit={(updated) => {
              handleManualChange();
              setSelectedDepartments(updated);
            }}
            permissions={permissions}
            permissionConfig={permissionConfig}
            onTogglePermission={togglePermission}
            departmentError={errors.department}
            permissionError={errors.permission}
          />
        )}

        <AppButton
          text="Create Staff"
          onPress={handleSubmit}
          backgroundColor={colors.primary}
          containerStyle={styles.createBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateStaffScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    marginTop: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  tabText: {
    color: colors.textSecondary,
  },
  activeTabText: {
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  groupContainer: { marginTop: 20 },
  createBtn: { marginTop: 30, marginBottom: 40 },
});
