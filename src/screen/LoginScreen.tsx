import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { InputField, AppHeader, SectionHeader, IconButton } from '../components';
import { colors } from '../theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log({ username, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
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

          <InputField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={username}
            onChangeText={setUsername}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <IconButton
            text="Login"
            iconName="login"
            iconFamily="MaterialCommunityIcons"
            onPress={handleLogin}
          />
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
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 10,
  },
});

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 4,
};
