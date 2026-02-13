import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../theme';

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
  const renderIcon = () => {
    if (!iconName) return null;

    const props = {
      name: iconName,
      size: 22,
      color: iconColor,
    };

    switch (iconFamily) {
      case 'Ionicons':
        return <Ionicons {...props} />;
      case 'Feather':
        return <Feather {...props} />;
      case 'AntDesign':
        return <AntDesign {...props} />;
      case 'FontAwesome6':
        return <FontAwesome {...props} />;
      default:
        return <MaterialCommunityIcons {...props} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor },
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        {iconName && <View style={styles.iconWrapper}>{renderIcon()}</View>}

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: titleColor }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={arrowColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});
