import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { BaseModal } from '..';
import { colors } from '../../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  currentPassword: string;
  onConfirm: (newPassword: string) => void;
}

const ChangePasswordModal: React.FC<Props> = ({
  visible,
  onClose,
  currentPassword,
  onConfirm,
}) => {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!current.trim()) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }
    if (current !== currentPassword) {
      Alert.alert('Error', 'Current password is incorrect');
      return;
    }
    if (!newPass.trim() || newPass.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }
    if (newPass !== confirmPass) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    onConfirm(newPass);
    handleClose();
  };

  const handleClose = () => {
    setCurrent('');
    setNewPass('');
    setConfirmPass('');
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      title="Change Password"
      onClose={handleClose}
    >
      {/* ✅ Paper TextInput with secureTextEntry + eye toggle */}
      <TextInput
        label="Current Password"
        value={current}
        onChangeText={setCurrent}
        placeholder="Enter current password"
        secureTextEntry={!showCurrent}
        mode="outlined"
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        right={
          <TextInput.Icon
            icon={showCurrent ? 'eye-off' : 'eye'}
            onPress={() => setShowCurrent(prev => !prev)}
            color={colors.textSecondary}
          />
        }
      />

      <TextInput
        label="New Password"
        value={newPass}
        onChangeText={setNewPass}
        placeholder="Enter new password"
        secureTextEntry={!showNew}
        mode="outlined"
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        right={
          <TextInput.Icon
            icon={showNew ? 'eye-off' : 'eye'}
            onPress={() => setShowNew(prev => !prev)}
            color={colors.textSecondary}
          />
        }
      />

      <TextInput
        label="Confirm New Password"
        value={confirmPass}
        onChangeText={setConfirmPass}
        placeholder="Confirm new password"
        secureTextEntry={!showConfirm}
        mode="outlined"
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        right={
          <TextInput.Icon
            icon={showConfirm ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirm(prev => !prev)}
            color={colors.textSecondary}
          />
        }
      />

      {/* ✅ Paper Button replaces AppButton */}
      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          onPress={handleClose}
          buttonColor={colors.border}
          textColor={colors.textPrimary}
          style={styles.halfBtn}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          buttonColor={colors.primary}
          style={styles.halfBtn}
        >
          Change Password
        </Button>
      </View>
    </BaseModal>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  halfBtn: {
    flex: 1,
  },
});