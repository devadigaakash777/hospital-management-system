import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { colors } from '../../theme';
import { BaseModal, ConfirmModal } from '..';
import { wp, hp } from '../../utils/responsive';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddDepartmentModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [showAddConfirm, setShowAddConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const hasData = !!name.trim();

  const handleAddPress = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Department name is required');
      return;
    }
    setShowAddConfirm(true);
  };

  const handleAdd = () => {
    onAdd(name.trim());
    setName('');
    onClose();
  };

  const handleCancelPress = () => {
    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  return (
    <BaseModal
      visible={visible}
      title="Add Department"
      onClose={handleCancelPress}
    >
      <TextInput
        label="Department Name"
        placeholder="e.g. Cardiology"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={{
          marginBottom: hp(1.5),
          backgroundColor: colors.surface,
        }}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        theme={{
          colors: { onSurfaceVariant: colors.textSecondary },
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          marginTop: hp(2.5),
          gap: wp(2.5),
        }}
      >
        <Button
          mode="contained"
          onPress={handleCancelPress}
          buttonColor={colors.border}
          textColor={colors.textPrimary}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleAddPress}
          buttonColor={colors.primary}
          textColor={colors.textPrimary}
          style={{ flex: 1 }}
        >
          Add
        </Button>
      </View>

      <ConfirmModal
        visible={showAddConfirm}
        type="add"
        message={`Are you sure you want to add "${name}" as a department?`}
        onConfirm={() => {
          setShowAddConfirm(false);
          handleAdd();
        }}
        onCancel={() => setShowAddConfirm(false)}
      />

      <ConfirmModal
        visible={showCancelConfirm}
        type="cancel"
        onConfirm={() => {
          setShowCancelConfirm(false);
          setName('');
          onClose();
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </BaseModal>
  );
};

export default AddDepartmentModal;