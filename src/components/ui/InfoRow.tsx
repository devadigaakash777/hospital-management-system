import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

interface Props {
  icon: string;
  label: string;
  value: string | number;
}

const InfoRow: React.FC<Props> = ({ icon, label, value }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(0.8),
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={wp(5)}
        color={colors.primary}
      />

      <Text
        style={{
          marginLeft: wp(2),
          fontSize: wp(3.3),
          color: colors.textSecondary,
          width: wp(33),
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          fontSize: wp(3.5),
          fontWeight: '600',
          color: colors.textPrimary,
          flex: 1,
        }}
      >
        {String(value)}
      </Text>
    </View>
  );
};

export default InfoRow;