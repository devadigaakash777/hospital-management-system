import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { AppHeader, SectionHeader } from '../components';
import { colors } from '../theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Please enter email and password');
      return;
    }
    try {
      if (username === 'admin@hospital.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: username,
          role: 'ADMIN' as const,
        };
        login(userData);
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Login failed', error.message);
      } else {
        Alert.alert('Login failed', 'An error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
        {/* ✅ AppHeader + SectionHeader unchanged — your own components */}
        <AppHeader
          logo={require('../assets/admin-logo.jpg')}
          title="Admin Portal"
          subtitle="Adarsha Hospital Management"
        />

        <View style={[styles.card, shadowStyle]}>
          <SectionHeader
            title="Admin Login"
            subtitle="Access the appointment management dashboard"
            align="center"
          />

          {/* ✅ Paper TextInput replaces InputField */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
          />

          {/* ✅ Paper TextInput with eye toggle replaces InputField isPassword */}
          <TextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowPassword(prev => !prev)}
                color={colors.textSecondary}
              />
            }
          />

          {/* ✅ Paper Button replaces AppButton */}
          <Button
            mode="contained"
            icon="login"
            onPress={handleLogin}
            buttonColor={colors.primary}
            style={styles.loginBtn}
            labelStyle={styles.loginBtnLabel}
          >
            Login
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginTop: 10,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 10,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 12,
  },
  loginBtn: {
    marginTop: 8,
    borderRadius: 8,
  },
  loginBtnLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 4,
};