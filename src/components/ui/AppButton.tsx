import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type IconFamily =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Feather'
  | 'AntDesign'
  | 'FontAwesome';

interface IconButtonProps {
  text: string;
  onPress: () => void;
  iconName: string;
  iconFamily?: IconFamily;
  iconSize?: number;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string; // 👈 NEW
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  onPress,
  iconName,
  iconFamily = 'MaterialCommunityIcons',
  iconSize = 20,
  disabled = false,
  color = '#fff',
  backgroundColor,
  borderColor,
}) => {
  const renderIcon = () => {
    const props = {
      name: iconName,
      size: iconSize,
      color,
    };

    switch (iconFamily) {
      case 'Ionicons':
        return <Ionicons {...props} />;
      case 'Feather':
        return <Feather {...props} />;
      case 'AntDesign':
        return <AntDesign {...props} />;
      case 'FontAwesome':
        return <FontAwesome {...props} />;
      default:
        return <MaterialCommunityIcons {...props} />;
    }
  };

  const buttonStyle: ViewStyle = {
    ...(backgroundColor && { backgroundColor }),
    ...(borderColor && {
      borderWidth: 1,
      borderColor,
    }),
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        {renderIcon()}
        <Text style={[styles.text, { color }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
