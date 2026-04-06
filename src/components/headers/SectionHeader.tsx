import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'left',
}) => {
  return (
    <View
      style={{
        marginBottom: hp(2),
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: wp(4.5),
          fontWeight: '600',
          color: colors.textPrimary,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            marginTop: hp(0.5),
            fontSize: wp(3.5),
            color: colors.textSecondary,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default SectionHeader;