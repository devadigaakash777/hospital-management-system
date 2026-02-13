import React from 'react';
import {
  View,
  Text,
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
  children?: React.ReactNode; // 👈 added
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
    <View
      style={[
        styles.container,
        { backgroundColor },
        containerStyle,
      ]}
    >
      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE (Custom Content) */}
      {children && <View style={styles.rightSection}>{children}</View>}
    </View>
  );
};

export default ListItem;

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  rightSection: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
