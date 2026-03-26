import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const AppBar: React.FC = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
  };

  return (
    <Appbar.Header style={styles.appBar} elevated>

      {/* Title Section */}
      <Appbar.Content
        title="Admin Dashboard"
        subtitle="Adarsha Hospital Management"
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />

      {/* Logout Button */}
      <Appbar.Action
        icon="logout"
        onPress={handleLogout}
      />

    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
  },
});

export default AppBar;