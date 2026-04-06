import React from 'react';
import { View, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';

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

interface ListItemProps {
  title: string;
  subtitle?: string;
  iconName?: string;
  iconFamily?: IconFamily;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  iconColor?: string;
  containerStyle?: ViewStyle;
  children?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  iconName,
  iconFamily = 'MaterialCommunityIcons',
  backgroundColor = colors.card,
  titleColor = colors.textPrimary,
  subtitleColor = colors.textSecondary,
  iconColor = colors.textPrimary,
  containerStyle,
  children,
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
    <List.Item
      title={title}
      description={subtitle}
      left={iconName ? renderIcon() : undefined}
      right={
        children
          ? () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: wp(3),
                }}
              >
                {children}
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
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingVertical: 0,
          minHeight: hp(7),
          backgroundColor,
        },
        containerStyle,
      ]}
    />
  );
};

export default ListItem;