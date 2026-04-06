import React, { useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  Portal,
  Dialog,
  Text,
  Button,
} from 'react-native-paper';
import { colors } from '../../theme';
import { AppCheckbox } from '..';
import { wp, hp } from '../../utils/responsive';

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
    <AppCheckbox
      value={localSelected.includes(item)}
      onChange={() => toggleDepartment(item)}
      label={item}
      containerStyle={{ marginVertical: hp(1.8) }}
    />
  );

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={{
          backgroundColor: colors.background,
          borderRadius: wp(3.5),
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Dialog.Title
          style={{
            fontSize: wp(4.5),
            fontWeight: '600',
            color: colors.textPrimary,
          }}
        >
          Select Departments
        </Dialog.Title>

        <Dialog.Content>
          {/* Select All */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              paddingBottom: hp(1.2),
              marginBottom: hp(1.2),
            }}
          >
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
            style={{ maxHeight: hp(43) }}
          />
        </Dialog.Content>

        {/* Actions */}
        <Dialog.Actions
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp(3),
            paddingBottom: hp(1.5),
          }}
        >
          <Button
            mode="contained"
            onPress={onClose}
            buttonColor={colors.card}
            textColor={colors.textPrimary}
            style={{ width: '48%' }}
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
            style={{ width: '48%' }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DepartmentSelectorModal;