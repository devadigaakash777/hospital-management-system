import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Portal,
  Dialog,
  Text,
  Button,
} from 'react-native-paper';
import { colors } from '../../theme';
import { AppCheckbox } from '..';

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
  const [localSelected, setLocalSelected] =
    useState<string[]>(selectedDepartments);

  const isAllSelected = useMemo(() => {
    return departments.length > 0 && localSelected.length === departments.length;
  }, [localSelected, departments]);

  const toggleDepartment = (dept: string) => {
    setLocalSelected(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept],
    );
  };

  const toggleSelectAll = () => {
    setLocalSelected(isAllSelected ? [] : departments);
  };

  const renderItem = ({ item }: { item: string }) => (
    // ✅ AppCheckbox already converted — no changes needed
    <AppCheckbox
      value={localSelected.includes(item)}
      onChange={() => toggleDepartment(item)}
      label={item}
      containerStyle={styles.departmentItem}
    />
  );

  return (
    // ✅ Portal + Dialog replaces Modal + View overlay
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={styles.dialog}
      >
        <Dialog.Title style={styles.title}>
          Select Departments
        </Dialog.Title>

        <Dialog.Content>
          {/* ✅ Select All — AppCheckbox unchanged */}
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
            style={styles.listContainer}
          />
        </Dialog.Content>

        {/* ✅ Dialog.Actions + Paper Button replaces AppButton */}
        <Dialog.Actions style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={onClose}
            buttonColor={colors.card}
            textColor={colors.textPrimary}
            style={styles.button}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              onSubmit(localSelected);
              onClose();
            }}
            buttonColor={colors.primary}
            style={styles.button}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DepartmentSelectorModal;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectAllContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    marginBottom: 10,
  },
  listContainer: {
    maxHeight: 350,
  },
  departmentItem: {
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  button: {
    width: '48%',
  },
});