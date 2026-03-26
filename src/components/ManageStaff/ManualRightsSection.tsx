import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, HelperText } from 'react-native-paper';
import { SectionHeader, AppCheckbox } from '..';
import { colors } from '../../theme';
import DepartmentSelectorModal from './DepartmentSelectorModal';

interface PermissionItem<T extends string> {
  key: T;
  title: string;
  subtitle: string;
}

interface ManualRightsSectionProps<T extends string> {
  departments: string[];
  selectedDepartments: string[];
  deptModalVisible: boolean;
  onOpenDepartmentModal: () => void;
  onCloseDepartmentModal: () => void;
  onDepartmentSubmit: (updated: string[]) => void;
  permissions: Record<T, boolean>;
  permissionConfig: PermissionItem<T>[];
  onTogglePermission: (key: T) => void;
  departmentError?: string;
  permissionError?: string;
}

function ManualRightsSection<T extends string>({
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
}: ManualRightsSectionProps<T>) {
  return (
    <View style={styles.container}>

      {/* ✅ SectionHeader unchanged — your own component */}
      <SectionHeader
        title="Select Departments"
        subtitle="Choose departments this staff member can access"
      />

      {/* ✅ Paper HelperText replaces custom error Text */}
      {departmentError && (
        <HelperText type="error" visible={!!departmentError}>
          {departmentError}
        </HelperText>
      )}

      {/* ✅ TouchableRipple replaces TouchableOpacity */}
      <TouchableRipple
        style={styles.input}
        onPress={onOpenDepartmentModal}
        rippleColor={colors.primary + '22'}
      >
        <Text
          style={{
            color: selectedDepartments.length > 0
              ? colors.textPrimary
              : colors.textSecondary,
          }}
        >
          {selectedDepartments.length > 0
            ? `${selectedDepartments.length} Departments Selected`
            : 'Select Departments'}
        </Text>
      </TouchableRipple>

      {/* ✅ DepartmentSelectorModal unchanged */}
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

      {/* ✅ Paper HelperText replaces custom error Text */}
      {permissionError && (
        <HelperText type="error" visible={!!permissionError}>
          {permissionError}
        </HelperText>
      )}

      {/* ✅ AppCheckbox unchanged — already converted to Paper */}
      {permissionConfig.map(item => (
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
}

export default ManualRightsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
});