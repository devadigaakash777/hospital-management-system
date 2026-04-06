import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, HelperText } from 'react-native-paper';
import { SectionHeader, AppCheckbox } from '..';
import { colors } from '../../theme';
import DepartmentSelectorModal from './DepartmentSelectorModal';
import { wp, hp } from '../../utils/responsive';

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
    <View style={{ marginTop: hp(2.5) }}>

      <SectionHeader
        title="Select Departments"
        subtitle="Choose departments this staff member can access"
      />

      {departmentError && (
        <HelperText type="error" visible={!!departmentError}>
          {departmentError}
        </HelperText>
      )}

      <TouchableRipple
        style={{
          backgroundColor: colors.card,
          borderRadius: wp(2.5),
          paddingVertical: hp(1.8),
          paddingHorizontal: wp(3),
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: hp(2.5),
        }}
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

      {permissionError && (
        <HelperText type="error" visible={!!permissionError}>
          {permissionError}
        </HelperText>
      )}

      {permissionConfig.map(item => (
        <View
          key={item.key}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: hp(1.8),
          }}
        >
          <AppCheckbox
            value={permissions[item.key]}
            onChange={() => onTogglePermission(item.key)}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: wp(3.8),
                fontWeight: '600',
                color: colors.textPrimary,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: wp(3.3),
                color: colors.textSecondary,
                marginTop: hp(0.3),
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        </View>
      ))}

    </View>
  );
}

export default ManualRightsSection;