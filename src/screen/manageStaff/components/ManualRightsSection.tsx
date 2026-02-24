import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SectionHeader, AppCheckbox } from '../../../components';
import { colors } from '../../../theme';
import DepartmentSelectorModal from './DepartmentSelectorModal';

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

interface ManualRightsSectionProps {
  departments: string[];
  selectedDepartments: string[];
  deptModalVisible: boolean;
  onOpenDepartmentModal: () => void;
  onCloseDepartmentModal: () => void;
  onDepartmentSubmit: (updated: string[]) => void;

  permissions: PermissionState;
  permissionConfig: PermissionItem[];
  onTogglePermission: (key: keyof PermissionState) => void;

  departmentError?: string;
  permissionError?: string;
}

const ManualRightsSection: React.FC<ManualRightsSectionProps> = ({
  departments,
  selectedDepartments,
  deptModalVisible,
  onOpenDepartmentModal,
  onCloseDepartmentModal,
  onDepartmentSubmit,
  permissions,
  permissionConfig,
  onTogglePermission,
  departmentError,
  permissionError,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="Select Departments"
        subtitle="Choose departments this staff member can access"
      />

      {departmentError && <Text style={styles.error}>{departmentError}</Text>}

      <TouchableOpacity style={styles.input} onPress={onOpenDepartmentModal}>
        <Text
          style={{
            color:
              selectedDepartments.length > 0
                ? colors.textPrimary
                : colors.textSecondary,
          }}
        >
          {selectedDepartments.length > 0
            ? `${selectedDepartments.length} Departments Selected`
            : 'Select Departments'}
        </Text>
      </TouchableOpacity>
      {deptModalVisible && (
        <DepartmentSelectorModal
          visible={deptModalVisible}
          departments={departments}
          selectedDepartments={selectedDepartments}
          onClose={onCloseDepartmentModal}
          onSubmit={onDepartmentSubmit}
        />
      )}

      <SectionHeader
        title="Access Permissions"
        subtitle="Define system-level access rights"
      />

      {permissionError && <Text style={styles.error}>{permissionError}</Text>}

      {permissionConfig.map((item) => (
        <View key={item.key} style={styles.permissionRow}>
          <AppCheckbox
            value={permissions[item.key]}
            onChange={() => onTogglePermission(item.key)}
          />

          <View style={styles.permissionTextContainer}>
            <Text style={styles.permissionTitle}>{item.title}</Text>
            <Text style={styles.permissionSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ManualRightsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  permissionTextContainer: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  permissionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
});
