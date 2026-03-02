import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';

interface InputFieldProps extends TextInputProps {
  label?: string;
  labelColor?: string;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  labelColor = colors.textPrimary,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  isPassword = false,
  value,
  containerStyle,
  onChangeText,
  ...rest
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? hidePassword : secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <Icon
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 44,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: colors.card,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
});
