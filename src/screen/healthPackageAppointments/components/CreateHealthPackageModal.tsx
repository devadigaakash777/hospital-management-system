import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import IconButton from '../../../components/ui/AppButton';
import { colors } from '../../../theme';

/* ======================
   TYPES
   ====================== */
export interface CreateHealthPackageData {
  name: string;
  description: string;
  price: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: CreateHealthPackageData) => void;
}

const CreateHealthPackageModal: React.FC<Props> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  /* ======================
     RESET & CLOSE
     ====================== */
  const resetAndClose = () => {
    setName('');
    setDescription('');
    setPrice('');
    onClose();
  };

  /* ======================
     CONFIRM CLOSE
     ====================== */
  const confirmClose = () => {
    if (name || description || price) {
      Alert.alert(
        'Discard changes?',
        'The entered information will not be saved.',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: resetAndClose,
          },
        ],
      );
    } else {
      resetAndClose();
    }
  };

  /* ======================
     CREATE HANDLER
     ====================== */
  const handleCreate = () => {
    onCreate({
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
    });
    resetAndClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none" // ✅ ANDROID SAFE
      onRequestClose={confirmClose}
    >
      {/* OVERLAY */}
      <View style={styles.overlay}>
        {/* CARD */}
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Create New Health Package</Text>
            <TouchableOpacity onPress={confirmClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* INPUTS */}
          <Text style={styles.label}>Package Name *</Text>
          <TextInput
            placeholder="e.g. Executive Health Checkup"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Brief description of the package"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
          />

          <Text style={styles.label}>Price (₹)</Text>
          <TextInput
            placeholder="e.g. 5000"
            placeholderTextColor={colors.textSecondary}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* ACTIONS */}
          <View style={styles.actions}>
            <IconButton
              text="Cancel"
              iconName=""
              onPress={confirmClose}
              backgroundColor="transparent"
              borderColor={colors.border}
              color={colors.textPrimary}
            />

            <IconButton
              text="Create Package"
              iconName=""
              backgroundColor={colors.primary}
              color={colors.textPrimary}
              onPress={handleCreate}
              disabled={!name.trim()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateHealthPackageModal;

/* ======================
   STYLES
   ====================== */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay, // rgba(0,0,0,0.75)
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  close: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
