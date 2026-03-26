import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, IconButton } from 'react-native-paper';
import { colors } from '../../theme';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<Props> = ({ visible, title, onClose, children }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        {/* ✅ SafeAreaView removed — was causing extra top/bottom space */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <IconButton
              icon="close"
              size={22}
              iconColor={colors.primary}
              onPress={onClose}
            />
          </View>

          {/* Content */}
          <View>{children}</View>

        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default BaseModal;

const styles = StyleSheet.create({
  modal: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    paddingBottom: 40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});