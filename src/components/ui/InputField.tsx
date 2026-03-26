import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { colors } from '../../theme';

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
    <View style={[styles.container, containerStyle]}>

      {/* ✅ Paper TextInput — placeholder color via theme prop */}
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
        style={styles.input}
        textColor={colors.textPrimary}
        // ✅ Controls placeholder + label floating color
        theme={{
          colors: {
            onSurfaceVariant: colors.textSecondary,
          },
        }}
        // ✅ Eye toggle for password fields
        right={
          isPassword ? (
            <TextInput.Icon
              icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
              onPress={() => setHidePassword(prev => !prev)}
            />
          ) : undefined
        }
      />

      {/* ✅ Paper HelperText for error messages */}
      {error ? (
        <HelperText type="error" visible={!!error} style={styles.errorText}>
          {error}
        </HelperText>
      ) : null}

    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.card,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
  },
});