import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Checkbox, TouchableRipple, Text } from 'react-native-paper';
import { colors } from '../../theme';

interface AppCheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  containerStyle,
  labelStyle,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    // ✅ TouchableRipple replaces TouchableOpacity
    <TouchableRipple
      onPress={handlePress}
      disabled={disabled}
      rippleColor={colors.primary + '22'}
      style={[styles.container, containerStyle]}
    >
      <>
        {/* ✅ Paper Checkbox replaces custom View + Ionicons checkmark */}
        <Checkbox
          status={value ? 'checked' : 'unchecked'}
          disabled={disabled}
          color={colors.primary}
          uncheckedColor={colors.primary}
          onPress={handlePress}
        />

        {/* ✅ Paper Text replaces RN Text */}
        {label && (
          <Text
            style={[
              styles.label,
              disabled && styles.disabledLabel,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  disabledLabel: {
    color: colors.textSecondary,
  },
});

export default AppCheckbox;