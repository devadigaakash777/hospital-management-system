import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, List } from 'react-native-paper';

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
  // ✅ Icon renderer — returns a function for Paper's List.Item icon prop
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
    // ✅ Paper List.Item replaces custom View + Text layout
    <List.Item
      title={title}
      description={subtitle}
      left={iconName ? renderIcon() : undefined}
      right={children ? () => <View style={styles.rightSection}>{children}</View> : undefined}
      titleStyle={[styles.title, { color: titleColor }]}
      descriptionStyle={[styles.subtitle, { color: subtitleColor }]}
      style={[styles.container, { backgroundColor }, containerStyle]}
    />
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 2,
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
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});