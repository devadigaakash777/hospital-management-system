import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { AppHeader, SectionHeader } from '../components';
import { colors } from '../theme';
import { wp, hp } from '../utils/responsive';

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: wp(5),
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={hp(2.5)}
      >
        <AppHeader
          logo={require('../assets/admin-logo.jpg')}
          title="Admin Portal"
          subtitle="Adarsha Hospital Management"
        />

        <View
          style={{
            marginTop: hp(1.2),
            backgroundColor: colors.surface,
            padding: wp(4),
            borderRadius: wp(2.5),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(0.25) },
            shadowOpacity: 0.12,
            shadowRadius: wp(1.5),
            elevation: 4,
          }}
        >
          <SectionHeader
            title="Admin Login"
            subtitle="Access the appointment management dashboard"
            align="center"
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={{
              backgroundColor: colors.card,
              marginBottom: hp(1.5),
            }}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            theme={{ colors: { onSurfaceVariant: colors.textSecondary } }}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={{
              backgroundColor: colors.card,
              marginBottom: hp(1.5),
            }}
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

          <Button
            mode="contained"
            icon="login"
            onPress={handleLogin}
            buttonColor={colors.primary}
            style={{
              marginTop: hp(1),
              borderRadius: wp(2),
            }}
            labelStyle={{
              fontSize: wp(4),
              fontWeight: '600',
            }}
          >
            Login
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}