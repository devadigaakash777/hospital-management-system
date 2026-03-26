import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../../theme';

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
  iconSize = 20,
  disabled = false,
  color = colors.textPrimary,
  backgroundColor,
  borderColor,
  containerStyle,
}) => {
  // ✅ Only called when iconName exists — never returns null
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
      icon={iconName ? getIcon() : undefined} // ✅ undefined not null
      buttonColor={backgroundColor ?? colors.primary}
      textColor={color}
      style={[
        styles.button,
        borderColor && { borderWidth: 1, borderColor },
        containerStyle,
      ]}
      labelStyle={styles.label}
      contentStyle={styles.content}
    >
      {text ?? ''}
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});