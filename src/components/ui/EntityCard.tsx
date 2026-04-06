import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
    <Card
      style={[
        {
          borderRadius: wp(4),
          marginVertical: hp(1),
          borderColor: colors.border,
          backgroundColor: colors.surface,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(0.6) },
          shadowOpacity: 0.08,
          shadowRadius: wp(2),
          elevation: 5,
        },
        containerStyle,
      ]}
      mode="outlined"
    >
      <Card.Content>

        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: hp(1.8),
          }}
        >
          {/* Title Section */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: wp(4.5),
                fontWeight: '700',
                color: colors.textPrimary,
              }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  fontSize: wp(3.5),
                  color: colors.textSecondary,
                  marginTop: hp(0.3),
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>

          {/* Header Icon */}
          {headerIcon && (
            <View style={{ marginLeft: wp(2) }}>
              {renderIcon(headerIcon, headerIconFamily, wp(10), colors.primary)}
            </View>
          )}

          {/* Action Buttons */}
          {actions.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                gap: wp(2),
                marginLeft: wp(2),
              }}
            >
              {actions.map((action, index) => (
                <TouchableRipple
                  key={index}
                  onPress={action.onPress}
                  rippleColor="#ffffff33"
                  borderless
                  style={{
                    width: wp(9),
                    height: wp(9),
                    borderRadius: wp(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: action.backgroundColor,
                  }}
                >
                  {renderIcon(
                    action.icon,
                    action.iconFamily ?? 'MaterialCommunityIcons',
                    wp(4),
                    '#fff',
                  )}
                </TouchableRipple>
              ))}
            </View>
          )}
        </View>

        {/* Info Rows */}
        {rows.map((row, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: hp(0.8),
            }}
          >
            {renderIcon(
              row.icon,
              row.iconFamily ?? 'MaterialCommunityIcons',
              wp(5),
              colors.primary,
            )}
            <Text
              style={{
                marginLeft: wp(2),
                fontSize: wp(3.3),
                color: colors.textSecondary,
                width: wp(33),
              }}
            >
              {row.label}
            </Text>
            <Text
              style={{
                fontSize: wp(3.5),
                fontWeight: '600',
                color: colors.textPrimary,
                flex: 1,
              }}
            >
              {row.value}
            </Text>
          </View>
        ))}

        {/* Footer */}
        {footer && (
          <View style={{ marginTop: hp(1.8) }}>
            {footer}
          </View>
        )}

      </Card.Content>
    </Card>
  );
};

export default EntityCard;