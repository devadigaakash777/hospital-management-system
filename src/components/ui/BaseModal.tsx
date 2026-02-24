import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<Props> = ({ visible, title, onClose, children }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.overlay}>
        <ScrollView style={styles.modal} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default BaseModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    paddingBottom: 40,
    flexGrow: 0,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    // Android Shadow
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
