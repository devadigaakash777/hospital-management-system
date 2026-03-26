import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { colors } from '../../theme';
import ManualRightsSection from '../../components/ManageStaff/ManualRightsSection';
import { useGroups, GroupData } from '../../context/GroupContext';
import { ConfirmModal } from '../../components';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [deptModalVisible, setDeptModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<PermissionState>({
    manageDoctorSlot: false,
    manageStaff: false,
    manageGroup: false,
    manageHealthPackage: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasData = !!(
    groupName ||
    selectedDepartments.length > 0 ||
    Object.values(permissions).some(Boolean)
  );

  const handleCancelPress = () => {
    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (isEdit && editGroup) {
      setGroupName(editGroup.name);
      setSelectedDepartments(editGroup.departments);
      setPermissions(arrayToPermissions(editGroup.permissions));
    }
  }, []);

  /* ── Custom back arrow — TouchableOpacity kept for header ── */
  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit Group' : 'Create Group',
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleCancelPress}
          style={{ paddingHorizontal: 12 }}
        >
          <FontAwesome6 name="arrow-left" size={18} color={colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEdit, hasData]);

  /* ── Hardware back ── */
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          handleCancelPress();
          return true;
        },
      );
      return () => subscription.remove();
    }, [hasData]),
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!groupName.trim()) {
      newErrors.groupName = 'Group name is required';
    }
    if (selectedDepartments.length === 0) {
      newErrors.department = 'Please select at least one department';
    }
    if (permissionsToArray(permissions).length === 0) {
      newErrors.permission = 'Please select at least one permission';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitPress = () => {
    if (!validate()) return;
    setShowSubmitConfirm(true);
  };

  const handleSubmit = () => {
    const result: GroupData = {
      id: editGroup?.id ?? Date.now().toString(),
      name: groupName.trim(),
      departments: selectedDepartments,
      permissions: permissionsToArray(permissions),
    };
    if (isEdit) {
      updateGroup(result);
    } else {
      addGroup(result);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ✅ Paper TextInput replaces InputField */}
        <TextInput
          label="Group Name"
          value={groupName}
          onChangeText={text => {
            setGroupName(text);
            if (text.trim()) setErrors(prev => ({ ...prev, groupName: '' }));
          }}
          placeholder="e.g. Admin Group"
          mode="outlined"
          style={styles.input}
          outlineColor={errors.groupName ? colors.error : colors.border}
          activeOutlineColor={errors.groupName ? colors.error : colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />

        {/* ✅ Paper HelperText for error */}
        {errors.groupName ? (
          <HelperText type="error" visible={!!errors.groupName}>
            {errors.groupName}
          </HelperText>
        ) : null}

        {/* ✅ ManualRightsSection unchanged — already converted */}
        <ManualRightsSection
          departments={DEPARTMENTS}
          selectedDepartments={selectedDepartments}
          deptModalVisible={deptModalVisible}
          onOpenDepartmentModal={() => setDeptModalVisible(true)}
          onCloseDepartmentModal={() => setDeptModalVisible(false)}
          onDepartmentSubmit={updated => {
            setSelectedDepartments(updated);
            if (updated.length > 0) {
              setErrors(prev => ({ ...prev, department: '' }));
            }
            setDeptModalVisible(false);
          }}
          permissions={permissions}
          permissionConfig={PERMISSION_CONFIG}
          onTogglePermission={key => {
            setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
            setErrors(prev => ({ ...prev, permission: '' }));
          }}
          departmentError={errors.department}
          permissionError={errors.permission}
        />

        {/* ✅ Paper Button replaces AppButton */}
        <View style={styles.btnRow}>
          <Button
            mode="contained"
            onPress={handleCancelPress}
            buttonColor={colors.border}
            textColor={colors.textPrimary}
            style={styles.halfBtn}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmitPress}
            buttonColor={colors.primary}
            style={styles.halfBtn}
          >
            {isEdit ? 'Save Changes' : 'Add Group'}
          </Button>
        </View>

      </ScrollView>

      {/* ✅ ConfirmModals unchanged — already converted */}
      <ConfirmModal
        visible={showSubmitConfirm}
        type={isEdit ? 'edit' : 'add'}
        onConfirm={() => {
          setShowSubmitConfirm(false);
          handleSubmit();
        }}
        onCancel={() => setShowSubmitConfirm(false)}
      />

      <ConfirmModal
        visible={showCancelConfirm}
        type="cancel"
        onConfirm={() => {
          setShowCancelConfirm(false);
          navigation.goBack();
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </SafeAreaView>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    marginBottom: 40,
  },
  halfBtn: {
    flex: 1,
  },
});