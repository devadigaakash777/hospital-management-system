import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { colors } from '../../theme';

type ConfirmType = 'add' | 'edit' | 'delete' | 'cancel';

interface Props {
  visible: boolean;
  type: ConfirmType;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const config: Record<
  ConfirmType,
  {
    defaultTitle: string;
    defaultMessage: string;
    defaultConfirmText: string;
    defaultCancelText: string;
  }
> = {
  add: {
    defaultTitle: 'Add',
    defaultMessage: 'Are you sure you want to add this?',
    defaultConfirmText: 'Add',
    defaultCancelText: 'Cancel',
  },
  edit: {
    defaultTitle: 'Save Changes',
    defaultMessage: 'Are you sure you want to save these changes?',
    defaultConfirmText: 'Save',
    defaultCancelText: 'Cancel',
  },
  delete: {
    defaultTitle: 'Delete',
    defaultMessage: 'Are you sure you want to delete this?',
    defaultConfirmText: 'Delete',
    defaultCancelText: 'Cancel',
  },
  cancel: {
    defaultTitle: 'Discard Changes',
    defaultMessage: 'Are you sure you want to cancel? Unsaved changes will be lost.',
    defaultConfirmText: 'Yes',
    defaultCancelText: 'No',
  },
};

// ✅ Confirm button color based on type
const getConfirmColor = (type: ConfirmType) => {
  switch (type) {
    case 'delete': return colors.error;
    case 'cancel': return colors.textSecondary;
    default: return colors.primary;
  }
};

const ConfirmModal: React.FC<Props> = ({
  visible,
  type,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const {
    defaultTitle,
    defaultMessage,
    defaultConfirmText,
    defaultCancelText,
  } = config[type];

  return (
    // ✅ Portal + Dialog replaces Modal + SafeAreaView + Pressable
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialog}
      >
        {/* ✅ Dialog.Title replaces custom Text title */}
        <Dialog.Title style={styles.title}>
          {title ?? defaultTitle}
        </Dialog.Title>

        {/* ✅ Dialog.Content replaces custom message View */}
        <Dialog.Content>
          <Text style={styles.message}>
            {message ?? defaultMessage}
          </Text>
        </Dialog.Content>

        {/* ✅ Dialog.Actions replaces buttonRow View */}
        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onCancel}
            textColor={colors.textSecondary}
            style={styles.cancelBtn}
          >
            {cancelText ?? defaultCancelText}
          </Button>
          <Button
            mode="contained"
            onPress={onConfirm}
            buttonColor={getConfirmColor(type)}
            style={styles.confirmBtn}
          >
            {confirmText ?? defaultConfirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  actions: {
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  cancelBtn: {
    borderColor: colors.border,
  },
  confirmBtn: {
    minWidth: 80,
  },
});