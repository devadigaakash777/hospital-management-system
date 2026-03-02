import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          value && styles.checkedBox,
          disabled && styles.disabledBox,
        ]}
      >
        {value && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>

      {label && (
        <Text
          style={[styles.label, disabled && styles.disabledLabel, labelStyle]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  checkedBox: {
    backgroundColor: colors.primary,
  },

  disabledBox: {
    borderColor: colors.border,
    backgroundColor: colors.border,
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
