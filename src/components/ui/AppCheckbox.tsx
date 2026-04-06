import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { Checkbox, TouchableRipple, Text } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
    <TouchableRipple
      onPress={handlePress}
      disabled={disabled}
      rippleColor={colors.primary + '22'}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: hp(0.8),
        },
        containerStyle,
      ]}
    >
      <>
        <Checkbox
          status={value ? 'checked' : 'unchecked'}
          disabled={disabled}
          color={colors.primary}
          uncheckedColor={colors.primary}
          onPress={handlePress}
        />

        {label && (
          <Text
            style={[
              {
                fontSize: wp(3.8),
                color: disabled ? colors.textSecondary : colors.textPrimary,
              },
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

export default AppCheckbox;