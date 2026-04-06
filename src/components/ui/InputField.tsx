import React from 'react';
import { View, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

interface InputFieldProps extends Omit<TextInputProps, 'placeholderTextColor' | 'selectionColor'> {
  label?: string;
  labelColor?: string;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  keyboardType = 'default',
  isPassword = false,
  value,
  containerStyle,
  onChangeText,
  error,
  ...rest
}) => {
  const [hidePassword, setHidePassword] = React.useState(isPassword);

  return (
    <View style={[{ marginBottom: hp(2) }, containerStyle]}>
      <TextInput
        label={label}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={isPassword ? hidePassword : false}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        outlineColor={error ? colors.error : colors.border}
        activeOutlineColor={error ? colors.error : colors.primary}
        style={{
          backgroundColor: colors.card,
          fontSize: wp(4),
        }}
        textColor={colors.textPrimary}
        theme={{
          colors: {
            onSurfaceVariant: colors.textSecondary,
          },
        }}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={wp(5.5)}
              color={colors.textSecondary}
              onPress={() => setHidePassword(prev => !prev)}
            />
          ) : undefined
        }
      />

      {error ? (
        <HelperText
          type="error"
          visible={!!error}
          style={{
            fontSize: wp(3),
            color: colors.error,
          }}
        >
          {error}
        </HelperText>
      ) : null}
    </View>
  );
};

export default InputField;