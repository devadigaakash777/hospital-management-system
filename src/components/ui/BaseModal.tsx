import React from 'react';
import { ScrollView, View } from 'react-native';
import { Modal, Portal, Text, IconButton } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
        contentContainerStyle={{
          width: '90%',
          maxHeight: '85%',
          backgroundColor: colors.surface,
          borderRadius: wp(4),
          padding: wp(5),
          paddingBottom: hp(5),
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.25,
          shadowRadius: wp(3),
          elevation: 10,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: hp(1),
              marginBottom: hp(1),
              borderBottomWidth: 2,
              borderBottomColor: colors.primary,
            }}
          >
            <Text
              style={{
                fontSize: wp(4.5),
                fontWeight: '700',
                color: colors.primary,
              }}
            >
              {title}
            </Text>
            <IconButton
              icon="close"
              size={wp(5.5)}
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