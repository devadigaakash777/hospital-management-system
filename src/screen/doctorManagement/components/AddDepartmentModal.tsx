import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from '../../../theme';
import { AppButton, BaseModal, InputField } from '../../../components';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddDepartmentModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Department name is required');
      return;
    }

    onAdd(name.trim());
    setName('');
    onClose();
  };

  return (
    <BaseModal visible={visible} title="Add Department" onClose={onClose}>
      <InputField
        label="Department Name"
        placeholder="Enter department name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.buttonRow}>
        <AppButton
          text="Clear"
          onPress={() => setName('')}
          backgroundColor={colors.border}
          color={colors.textPrimary}
        />

        <AppButton
          text="Add"
          onPress={handleAdd}
          backgroundColor={colors.primary}
          color={colors.textPrimary}
        />
      </View>
    </BaseModal>
  );
};

export default AddDepartmentModal;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
});
