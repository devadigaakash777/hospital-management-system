import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

type IconFamily =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Feather'
  | 'AntDesign'
  | 'FontAwesome6';

interface AppButtonProps {
  onPress: () => void;
  text?: string;
  iconName?: string;
  iconFamily?: IconFamily;
  iconSize?: number;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppButton: React.FC<AppButtonProps> = ({
  text,
  onPress,
  iconName,
  iconFamily = 'MaterialCommunityIcons',
  iconSize = wp(5),
  disabled = false,
  color = colors.textPrimary,
  backgroundColor,
  borderColor,
  containerStyle,
}) => {
  const getIcon = () => {
    const props = { name: iconName!, size: iconSize, color };

    switch (iconFamily) {
      case 'Ionicons':
        return () => <Ionicons {...props} />;
      case 'Feather':
        return () => <Feather {...props} />;
      case 'AntDesign':
        return () => <AntDesign {...props} />;
      case 'FontAwesome6':
        return () => <FontAwesome {...props} />;
      default:
        return () => <MaterialCommunityIcons {...props} />;
    }
  };

  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      icon={iconName ? getIcon() : undefined}
      buttonColor={backgroundColor ?? colors.primary}
      textColor={color}
      style={[
        {
          borderRadius: wp(2.5),
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor ?? 'transparent',
        },
        containerStyle,
      ]}
      labelStyle={{
        fontSize: wp(4),
        fontWeight: '600',
      }}
      contentStyle={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(0.3),
        paddingHorizontal: wp(1),
      }}
    >
      {text ?? ''}
    </Button>
  );
};

export default AppButton;