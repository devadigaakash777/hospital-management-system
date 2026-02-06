import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';

interface InputFieldProps extends TextInputProps {
  label?: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  isPassword = false,
  value,
  onChangeText,
  ...rest
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#999'}
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
              color={'#666'}
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
    color: colors.textPrimary,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 44, 
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
});
