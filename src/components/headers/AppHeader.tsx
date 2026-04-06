import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

interface AppHeaderProps {
  logo: ImageSourcePropType;
  title: string;
  subtitle?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ logo, title, subtitle }) => {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ padding: wp(1) }}>
        <Image
          source={logo}
          style={{ width: wp(8), height: wp(8) }}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginLeft: wp(0.5), flexDirection: 'column' }}>
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
              fontSize: wp(2.5),
              color: colors.textSecondary,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default AppHeader;