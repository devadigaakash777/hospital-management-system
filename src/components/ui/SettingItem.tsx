import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';

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
  // ✅ Returns a function — required by List.Item left/right props
  const renderIcon = () => {
    if (!iconName) return undefined;

    const props = { name: iconName, size: 22, color: iconColor };

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
    // ✅ TouchableRipple replaces TouchableOpacity
    <TouchableRipple
      onPress={onPress}
      rippleColor={colors.primary + '22'}
      style={[styles.container, { backgroundColor }, containerStyle]}
    >
      {/* ✅ List.Item replaces custom View + Text layout */}
      <List.Item
        title={title}
        description={subtitle}
        left={iconName ? renderIcon() : undefined}
        right={
          showArrow
            ? () => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={arrowColor}
                  style={styles.arrow}
                />
              )
            : undefined
        }
        titleStyle={[styles.title, { color: titleColor }]}
        descriptionStyle={[styles.subtitle, { color: subtitleColor }]}
        style={styles.listItem}
      />
    </TouchableRipple>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    color: colors.textSecondary,
  },
  arrow: {
    alignSelf: 'center',
  },
});