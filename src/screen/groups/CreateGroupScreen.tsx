import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../theme';
import ManualRightsSection from '../manageStaff/components/ManualRightsSection';
import { useGroups, GroupData } from '../../context/GroupContext';

type PermissionState = {
  manageDoctorSlot: boolean;
  manageStaff: boolean;
  manageGroup: boolean;
  manageHealthPackage: boolean;
};

const PERMISSION_CONFIG = [
  {
    key: 'manageDoctorSlot' as const,
    title: 'Can Manage Doctor Slots',
    subtitle: 'Create and edit doctor availability slots',
  },
  {
    key: 'manageStaff' as const,
    title: 'Can Manage Staff',
    subtitle: 'Add, edit and remove staff accounts',
  },
  {
    key: 'manageGroup' as const,
    title: 'Can Manage Groups',
    subtitle: 'Create and manage permission groups',
  },
  {
    key: 'manageHealthPackage' as const,
    title: 'Can Manage Health Packages',
    subtitle: 'Create and manage health packages',
  },
];

const DEPARTMENTS = [
  'Cardiology', 'Dermatology', 'Neurology',
  'Nephrology', 'Endocrinology', 'Orthopedics',
  'Radiology', 'Oncology',
];

type RouteParams = {
  CreateGroupScreen: {
    editGroup?: GroupData;
  };
};

const permissionsToArray = (p: PermissionState): string[] =>
  PERMISSION_CONFIG.filter(c => p[c.key]).map(c => c.title);

const arrayToPermissions = (arr: string[]): PermissionState => ({
  manageDoctorSlot: arr.includes('Can Manage Doctor Slots'),
  manageStaff: arr.includes('Can Manage Staff'),
  manageGroup: arr.includes('Can Manage Groups'),
  manageHealthPackage: arr.includes('Can Manage Health Packages'),
});

const CreateGroupScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'CreateGroupScreen'>>();
  const editGroup = route.params?.editGroup;
  const isEdit = !!editGroup;

  const { addGroup, updateGroup } = useGroups();

  const [groupName, setGroupName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [deptModalVisible, setDeptModalVisible] = useState(false);
  const [permissions, setPermissions] = useState<PermissionState>({
    manageDoctorSlot: false,
    manageStaff: false,
    manageGroup: false,
    manageHealthPackage: false,
  });
  const [deptError, setDeptError] = useState('');
  const [permError, setPermError] = useState('');

  /* ── Pre-fill on edit ── */
  useEffect(() => {
    if (isEdit && editGroup) {
      setGroupName(editGroup.name);
      setSelectedDepartments(editGroup.departments);
      setPermissions(arrayToPermissions(editGroup.permissions));
    }
  }, []);

  /* ── SUBMIT ── */
  const handleSubmit = () => {
    let valid = true;

    if (!groupName.trim()) {
      setNameError('Group name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    if (selectedDepartments.length === 0) {
      setDeptError('Please select at least one department.');
      valid = false;
    } else {
      setDeptError('');
    }

    const permArr = permissionsToArray(permissions);
    if (permArr.length === 0) {
      setPermError('Please select at least one permission.');
      valid = false;
    } else {
      setPermError('');
    }

    if (!valid) return;

    const result: GroupData = {
      id: editGroup?.id ?? Date.now().toString(),
      name: groupName.trim(),
      departments: selectedDepartments,
      permissions: permArr,
    };

    if (isEdit) {
      updateGroup(result);
    } else {
      addGroup(result);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>

        <Text style={styles.label}>Group Name</Text>
        <TextInput
          style={[styles.input, !!nameError && styles.inputError]}
          placeholder="Enter group name"
          placeholderTextColor={colors.textSecondary}
          value={groupName}
          onChangeText={text => {
            setGroupName(text);
            if (text.trim()) setNameError('');
          }}
        />
        {!!nameError && <Text style={styles.error}>{nameError}</Text>}

        <ManualRightsSection
          departments={DEPARTMENTS}
          selectedDepartments={selectedDepartments}
          deptModalVisible={deptModalVisible}
          onOpenDepartmentModal={() => setDeptModalVisible(true)}
          onCloseDepartmentModal={() => setDeptModalVisible(false)}
          onDepartmentSubmit={updated => {
            setSelectedDepartments(updated);
            if (updated.length > 0) setDeptError('');
            setDeptModalVisible(false);
          }}
          permissions={permissions}
          permissionConfig={PERMISSION_CONFIG}
          onTogglePermission={key => {
            setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
            setPermError('');
          }}
          departmentError={deptError}
          permissionError={permError}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {isEdit ? 'Save Changes' : 'Add Group'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16, paddingBottom: 40 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  inputError: { borderColor: 'red' },
  error: { color: 'red', fontSize: 12, marginBottom: 8 },
  submitBtn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});