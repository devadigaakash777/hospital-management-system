import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  HelperText,
  Chip,
  TouchableRipple,
} from 'react-native-paper';
import {
  SearchablePicker,
  ConfirmModal,
  ChangePasswordModal,
} from '../../components';
import { colors } from '../../theme';
import ManualRightsSection from '../../components/ManageStaff/ManualRightsSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StaffStackParamList } from '../../navigation/StaffManagementStack';
import { useStaff } from '../../context/StaffContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type TabType = 'GROUP' | 'MANUAL';

interface PermissionState {
  canManageDoctorSlots: boolean;
  canManageStaff: boolean;
  canManageGroups: boolean;
  canManageHealthPackages: boolean;
  canExportReports: boolean;
}

interface PermissionItem {
  key: keyof PermissionState;
  title: string;
  subtitle: string;
}

const roleOptions = ['STAFF', 'ADMIN', 'DOCTOR'];

const dummyGroups: string[] = Array.from(
  { length: 40 }, (_, i) => `Group ${i + 1}`,
);

const dummyDepartments: string[] = Array.from(
  { length: 60 }, (_, i) => `Department ${i + 1}`,
);

const permissionConfig: PermissionItem[] = [
  { key: 'canManageDoctorSlots',    title: 'Manage Doctor Slots',    subtitle: 'Create, update and control doctor availability slots' },
  { key: 'canManageStaff',          title: 'Manage Staff',           subtitle: 'Add, edit and manage hospital staff accounts' },
  { key: 'canManageGroups',         title: 'Manage Groups',          subtitle: 'Create and configure permission groups' },
  { key: 'canManageHealthPackages', title: 'Manage Health Packages', subtitle: 'Create and manage health checkup packages' },
  { key: 'canExportReports',        title: 'Export Reports',         subtitle: 'Export and download system reports' },
];

type StackNav = NativeStackNavigationProp<StaffStackParamList, 'CreateStaff'>;
type RouteParams = RouteProp<StaffStackParamList, 'CreateStaff'>;

const CreateStaffScreen = () => {
  const navigation = useNavigation<StackNav>();
  const route = useRoute<RouteParams>();
  const editStaff = route.params?.editStaff;
  const isEdit = !!editStaff;

  const { addStaff, updateStaff } = useStaff();

  const [activeTab, setActiveTab] = useState<TabType>('GROUP');
  const [deptModalVisible, setDeptModalVisible] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>('STAFF');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<PermissionState>({
    canManageDoctorSlots: false,
    canManageStaff: false,
    canManageGroups: false,
    canManageHealthPackages: false,
    canExportReports: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasData = !!(
    firstName || lastName || email ||
    (!isEdit && (password || confirmPassword)) ||
    selectedGroup || selectedDepartments.length > 0
  );

  const handleCancelPress = () => {
    if (hasData) setShowCancelConfirm(true);
    else navigation.navigate('ManageStaffHome');
  };

  useEffect(() => {
    if (isEdit && editStaff) {
      setFirstName(editStaff.firstName ?? '');
      setLastName(editStaff.lastName ?? '');
      setEmail(editStaff.email ?? '');
      setRole(editStaff.role ?? 'STAFF');
      setPassword(editStaff.password);
      setSelectedDepartments(editStaff.departmentIds ?? []);
      setPermissions({
        canManageDoctorSlots: editStaff.canManageDoctorSlots,
        canManageStaff: editStaff.canManageStaff,
        canManageGroups: editStaff.canManageGroups,
        canManageHealthPackages: editStaff.canManageHealthPackages,
        canExportReports: editStaff.canExportReports,
      });
      if (editStaff.groupId) {
        setSelectedGroup(editStaff.groupId);
        setActiveTab('GROUP');
      } else {
        setActiveTab('MANUAL');
      }
    }
  }, []);

  /* ── Custom back arrow — TouchableOpacity kept for header ── */
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleCancelPress}
          style={{ paddingHorizontal: 12 }}
        >
          <FontAwesome6 name="arrow-left" size={18} color={colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, hasData]);

  /* ── Hardware back ── */
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => { handleCancelPress(); return true; },
      );
      return () => subscription.remove();
    }, [hasData]),
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!role) newErrors.role = 'Please select a role';
    if (!isEdit) {
      if (!password.trim() || password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    if (activeTab === 'GROUP' && !selectedGroup) {
      newErrors.permission = 'Please select a group';
    }
    if (activeTab === 'MANUAL') {
      if (selectedDepartments.length === 0) {
        newErrors.department = 'Select at least one department';
      }
      if (!Object.values(permissions).some(Boolean)) {
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
      canManageDoctorSlots: false,
      canManageStaff: false,
      canManageGroups: false,
      canManageHealthPackages: false,
      canExportReports: false,
    });
  };

  const handleManualChange = () => setSelectedGroup(null);

  const togglePermission = (key: keyof PermissionState) => {
    handleManualChange();
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitPress = () => {
    if (!validate()) return;
    setShowSubmitConfirm(true);
  };

  const handleSubmit = () => {
    const staffData = {
      id: editStaff?.id ?? Date.now().toString(),
      firstName, lastName, email, password, role,
      groupId: selectedGroup ?? undefined,
      departmentIds: selectedDepartments,
      canManageDoctorSlots: permissions.canManageDoctorSlots,
      canManageStaff: permissions.canManageStaff,
      canManageGroups: permissions.canManageGroups,
      canManageHealthPackages: permissions.canManageHealthPackages,
      canExportReports: permissions.canExportReports,
      name: `${firstName} ${lastName}`,
      department: selectedDepartments.length > 0
        ? selectedDepartments.join(', ')
        : selectedGroup ?? 'General',
    };
    if (isEdit) {
      updateStaff(staffData);
      Alert.alert('Success', 'Staff updated successfully', [
        { text: 'OK', onPress: () => navigation.navigate('ManageStaffHome') },
      ]);
    } else {
      addStaff(staffData);
      Alert.alert('Success', 'Staff created successfully', [
        { text: 'OK', onPress: () => navigation.navigate('ManageStaffHome') },
      ]);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ✅ Paper TextInput replaces InputField */}
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="e.g. John"
          mode="outlined"
          style={styles.input}
          outlineColor={errors.firstName ? colors.error : colors.border}
          activeOutlineColor={errors.firstName ? colors.error : colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        {errors.firstName && <HelperText type="error">{errors.firstName}</HelperText>}

        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="e.g. Smith"
          mode="outlined"
          style={styles.input}
          outlineColor={errors.lastName ? colors.error : colors.border}
          activeOutlineColor={errors.lastName ? colors.error : colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        {errors.lastName && <HelperText type="error">{errors.lastName}</HelperText>}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. john@hospital.com"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          outlineColor={errors.email ? colors.error : colors.border}
          activeOutlineColor={errors.email ? colors.error : colors.primary}
          theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
        />
        {errors.email && <HelperText type="error">{errors.email}</HelperText>}

        {/* ✅ Paper Chip replaces roleChip TouchableOpacity */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Role</Text>
          <View style={styles.roleRow}>
            {roleOptions.map(option => (
              <Chip
                key={option}
                selected={role === option}
                onPress={() => setRole(option)}
                style={[
                  styles.roleChip,
                  role === option && { backgroundColor: colors.primary },
                ]}
                selectedColor="#fff"
                textStyle={{
                  color: role === option ? '#fff' : colors.textSecondary,
                  fontWeight: '600',
                }}
              >
                {option}
              </Chip>
            ))}
          </View>
          {errors.role && <HelperText type="error">{errors.role}</HelperText>}
        </View>

        {/* ✅ Password fields with eye toggle */}
        {!isEdit && (
          <>
            <TextInput
              label="Password"
              placeholder="Create a password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              outlineColor={errors.password ? colors.error : colors.border}
              activeOutlineColor={errors.password ? colors.error : colors.primary}
              theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setShowPassword(prev => !prev)}
                  color={colors.textSecondary}
                />
              }
            />
            {errors.password && <HelperText type="error">{errors.password}</HelperText>}

            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={styles.input}
              outlineColor={errors.confirmPassword ? colors.error : colors.border}
              activeOutlineColor={errors.confirmPassword ? colors.error : colors.primary}
              theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setShowConfirmPassword(prev => !prev)}
                  color={colors.textSecondary}
                />
              }
            />
            {errors.confirmPassword && <HelperText type="error">{errors.confirmPassword}</HelperText>}
          </>
        )}

        {/* ✅ Paper Button replaces AppButton for change password */}
        {isEdit && (
          <Button
            mode="outlined"
            icon="lock-reset"
            onPress={() => setShowChangePassword(true)}
            textColor={colors.primary}
            style={styles.changePassBtn}
          >
            Change Password
          </Button>
        )}

        {/* ✅ TouchableRipple replaces TouchableOpacity tabs */}
        <View style={styles.tabContainer}>
          {(['GROUP', 'MANUAL'] as TabType[]).map(tab => (
            <TouchableRipple
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
              rippleColor="#ffffff33"
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab === 'GROUP' ? 'Select Group' : 'Manual Rights'}
              </Text>
            </TouchableRipple>
          ))}
        </View>

        {/* ✅ SearchablePicker unchanged — already converted */}
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
              <HelperText type="error">{errors.permission}</HelperText>
            )}
          </View>
        )}

        {/* ✅ ManualRightsSection unchanged — already converted */}
        {activeTab === 'MANUAL' && (
          <ManualRightsSection
            departments={dummyDepartments}
            selectedDepartments={selectedDepartments}
            deptModalVisible={deptModalVisible}
            onOpenDepartmentModal={() => setDeptModalVisible(true)}
            onCloseDepartmentModal={() => setDeptModalVisible(false)}
            onDepartmentSubmit={updated => {
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
            {isEdit ? 'Save Changes' : 'Create Staff'}
          </Button>
        </View>

      </ScrollView>

      {/* ✅ All modals unchanged — already converted */}
      <ConfirmModal
        visible={showSubmitConfirm}
        type={isEdit ? 'edit' : 'add'}
        onConfirm={() => { setShowSubmitConfirm(false); handleSubmit(); }}
        onCancel={() => setShowSubmitConfirm(false)}
      />

      <ConfirmModal
        visible={showCancelConfirm}
        type="cancel"
        onConfirm={() => {
          setShowCancelConfirm(false);
          navigation.navigate('ManageStaffHome');
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />

      {isEdit && (
        <ChangePasswordModal
          visible={showChangePassword}
          onClose={() => setShowChangePassword(false)}
          currentPassword={password}
          onConfirm={(newPassword: string) => {
            setPassword(newPassword);
            setShowChangePassword(false);
            Alert.alert('Success', 'Password changed successfully');
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateStaffScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 16 },
  input: {
    backgroundColor: colors.card,
    marginBottom: 4,
  },
  changePassBtn: {
    marginBottom: 8,
    borderColor: colors.border,
  },
  roleContainer: { marginBottom: 8 },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  roleRow: { flexDirection: 'row', gap: 10 },
  roleChip: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    marginTop: 20,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { backgroundColor: colors.primary, borderRadius: 8 },
  tabText: { color: colors.textSecondary },
  activeTabText: { color: '#fff' },
  groupContainer: { marginTop: 20 },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
    marginBottom: 40,
  },
  halfBtn: { flex: 1 },
});