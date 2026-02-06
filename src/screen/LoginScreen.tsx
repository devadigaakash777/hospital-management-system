import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { InputField } from '../components';
import { colors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../components';
import { SectionHeader } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      console.log('Login attempt:', { username, password });
      // Add your login logic here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        logo={require('../assets/admin-logo.jpg')}
        title="Admin Portal"
        subtitle="Adarsha Hospital Management"
      />
      <View style={[styles.inputContainer, shadowStyle]}>
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
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Icon name="log-in-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  inputContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    paddingVertical: 24,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const shadowStyle = {
  shadowColor: '#000', // iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 4, // Android
};
