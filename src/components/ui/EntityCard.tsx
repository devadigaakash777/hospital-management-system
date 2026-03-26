import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../theme';

/* ─────────────────────────────────────────── */
/* Types                                        */
/* ─────────────────────────────────────────── */

type IconFamily =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Feather'
  | 'AntDesign'
  | 'FontAwesome6';

export interface EntityCardRow {
  icon: string;
  iconFamily?: IconFamily;
  label: string;
  value: string | number;
}

export interface EntityCardAction {
  icon: string;
  iconFamily?: IconFamily;
  backgroundColor: string;
  onPress: () => void;
}

interface Props {
  title: string;
  subtitle?: string;
  headerIcon?: string;
  headerIconFamily?: IconFamily;
  rows?: EntityCardRow[];
  actions?: EntityCardAction[];
  footer?: React.ReactNode;
  containerStyle?: ViewStyle;
}

/* ─────────────────────────────────────────── */
/* Icon Renderer                               */
/* ─────────────────────────────────────────── */

const renderIcon = (
  name: string,
  family: IconFamily = 'MaterialCommunityIcons',
  size: number,
  color: string,
) => {
  const props = { name, size, color };
  switch (family) {
    case 'Ionicons':
      return <Ionicons {...props} />;
    case 'Feather':
      return <Feather {...props} />;
    case 'AntDesign':
      return <AntDesign {...props} />;
    case 'FontAwesome6':
      return <FontAwesome6 {...props} />;
    default:
      return <MaterialCommunityIcons {...props} />;
  }
};

/* ─────────────────────────────────────────── */
/* EntityCard                                  */
/* ─────────────────────────────────────────── */

const EntityCard: React.FC<Props> = ({
  title,
  subtitle,
  headerIcon,
  headerIconFamily = 'MaterialCommunityIcons',
  rows = [],
  actions = [],
  footer,
  containerStyle,
}) => {
  return (
    // ✅ Paper Card replaces custom View with shadow/border styles
    <Card style={[styles.card, containerStyle]} mode="outlined">
      <Card.Content>

        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <View style={styles.titleSection}>
            {/* ✅ Paper Text replaces RN Text */}
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          {/* Header icon */}
          {headerIcon && (
            <View style={styles.headerIconWrapper}>
              {renderIcon(headerIcon, headerIconFamily, 40, colors.primary)}
            </View>
          )}

          {/* ✅ Action buttons using TouchableRipple */}
          {actions.length > 0 && (
            <View style={styles.actionsRow}>
              {actions.map((action, index) => (
                <TouchableRipple
                  key={index}
                  onPress={action.onPress}
                  rippleColor="#ffffff33"
                  borderless
                  style={[
                    styles.actionBtn,
                    { backgroundColor: action.backgroundColor },
                  ]}
                >
                  {renderIcon(
                    action.icon,
                    action.iconFamily ?? 'MaterialCommunityIcons',
                    16,
                    '#fff',
                  )}
                </TouchableRipple>
              ))}
            </View>
          )}
        </View>

        {/* ── Info Rows ── */}
        {rows.map((row, index) => (
          <View key={index} style={styles.infoRow}>
            {renderIcon(
              row.icon,
              row.iconFamily ?? 'MaterialCommunityIcons',
              20,
              colors.primary,
            )}
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}

        {/* ── Optional Footer ── */}
        {footer && <View style={styles.footer}>{footer}</View>}

      </Card.Content>
    </Card>
  );
};

export default EntityCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 8,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android Shadow
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerIconWrapper: {
    marginLeft: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  infoLabel: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
    width: 130,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  footer: {
    marginTop: 14,
  },
});