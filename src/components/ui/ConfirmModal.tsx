import React from 'react';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={{
          backgroundColor: colors.surface,
          borderRadius: wp(3),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.25,
          shadowRadius: wp(3),
          elevation: 10,
        }}
      >
        <Dialog.Title
          style={{
            fontSize: wp(4.3),
            fontWeight: '700',
            color: colors.textPrimary,
          }}
        >
          {title ?? defaultTitle}
        </Dialog.Title>

        <Dialog.Content>
          <Text
            style={{
              fontSize: wp(3.5),
              color: colors.textSecondary,
              lineHeight: hp(3),
            }}
          >
            {message ?? defaultMessage}
          </Text>
        </Dialog.Content>

        <Dialog.Actions
          style={{
            gap: wp(2),
            paddingHorizontal: wp(3),
            paddingBottom: hp(1.5),
          }}
        >
          <Button
            mode="outlined"
            onPress={onCancel}
            textColor={colors.textSecondary}
            style={{ borderColor: colors.border }}
          >
            {cancelText ?? defaultCancelText}
          </Button>
          <Button
            mode="contained"
            onPress={onConfirm}
            buttonColor={getConfirmColor(type)}
            style={{ minWidth: wp(20) }}
          >
            {confirmText ?? defaultConfirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmModal;