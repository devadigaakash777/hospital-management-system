import React from 'react';
import { View, ViewStyle } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

type IconFamily =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Feather'
  | 'AntDesign'
  | 'FontAwesome6';

interface SettingItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  iconName?: string;
  iconFamily?: IconFamily;
  showArrow?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  iconColor?: string;
  arrowColor?: string;
  containerStyle?: ViewStyle;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  onPress,
  iconName,
  iconFamily = 'MaterialCommunityIcons',
  showArrow = true,
  backgroundColor = colors.card,
  titleColor = colors.textPrimary,
  subtitleColor = colors.textSecondary,
  iconColor = colors.textPrimary,
  arrowColor = colors.textPrimary,
  containerStyle,
}) => {
  const iconProps = { name: iconName!, size: wp(5.5), color: iconColor };

  const renderIcon = () => {
    if (!iconName) return undefined;

    switch (iconFamily) {
      case 'Ionicons':
        return () => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons {...iconProps} />
          </View>
        );
      case 'Feather':
        return () => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Feather {...iconProps} />
          </View>
        );
      case 'AntDesign':
        return () => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign {...iconProps} />
          </View>
        );
      case 'FontAwesome6':
        return () => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome {...iconProps} />
          </View>
        );
      default:
        return () => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons {...iconProps} />
          </View>
        );
    }
  };

  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor={colors.primary + '22'}
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor,
        },
        containerStyle,
      ]}
    >
      <List.Item
        title={title}
        description={subtitle}
        left={iconName ? renderIcon() : undefined}
        right={
          showArrow
            ? () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons
                    name="chevron-forward"
                    size={wp(5)}
                    color={arrowColor}
                  />
                </View>
              )
            : undefined
        }
        titleStyle={{
          fontSize: wp(4),
          fontWeight: '600',
          color: titleColor,
        }}
        descriptionStyle={{
          fontSize: wp(3.5),
          marginTop: hp(0.3),
          color: subtitleColor,
        }}
        style={{
          paddingVertical: hp(0.8),
          paddingHorizontal: wp(4),
        }}
      />
    </TouchableRipple>
  );
};

export default SettingItem;