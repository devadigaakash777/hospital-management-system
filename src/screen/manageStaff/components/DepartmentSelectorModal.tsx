import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import { colors } from '../../../theme';
import { AppButton, AppCheckbox } from '../../../components';

interface DepartmentSelectorModalProps {
  visible: boolean;
  departments: string[];
  selectedDepartments: string[];
  onClose: () => void;
  onSubmit: (selected: string[]) => void;
}

const DepartmentSelectorModal: React.FC<DepartmentSelectorModalProps> = ({
  visible,
  departments,
  selectedDepartments,
  onClose,
  onSubmit,
}) => {
  // Initialize directly from props (no effect needed)
  const [localSelected, setLocalSelected] =
    useState<string[]>(selectedDepartments);

  const isAllSelected = useMemo(() => {
    return (
      departments.length > 0 && localSelected.length === departments.length
    );
  }, [localSelected, departments]);

  const toggleDepartment = (dept: string) => {
    setLocalSelected((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept],
    );
  };

  const toggleSelectAll = () => {
    setLocalSelected(isAllSelected ? [] : departments);
  };

  const renderItem = ({ item }: { item: string }) => (
    <AppCheckbox
      value={localSelected.includes(item)}
      onChange={() => toggleDepartment(item)}
      label={item}
      containerStyle={styles.departmentList}
    />
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Departments</Text>

          {/* Select All Option */}
          <View style={styles.selectAllContainer}>
            <AppCheckbox
              value={isAllSelected}
              onChange={toggleSelectAll}
              label="Select All Departments"
            />
          </View>

          <FlatList
            data={departments}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            style={styles.departmentListContainer}
          />

          <View style={styles.buttonRow}>
            <AppButton
              text="Cancel"
              onPress={onClose}
              backgroundColor={colors.card}
              color={colors.textPrimary}
              containerStyle={styles.button}
            />

            <AppButton
              text="Done"
              onPress={() => {
                onSubmit(localSelected);
                onClose();
              }}
              backgroundColor={colors.primary}
              containerStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DepartmentSelectorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  selectAllContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
  departmentListContainer: { maxHeight: 350 },
  departmentList: { marginVertical: 15 },
});
