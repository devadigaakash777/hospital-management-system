import React from 'react';
import { Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { wp } from '../../utils/responsive';

const AppBar: React.FC = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
  };

  return (
    <Appbar.Header elevated style={{ elevation: 4 }}>
      <Appbar.Content
        title="Admin Dashboard"
        subtitle="Adarsha Hospital Management"
        titleStyle={{ fontWeight: 'bold' }}
        subtitleStyle={{ fontSize: wp(3) }}
      />
      <Appbar.Action
        icon="logout"
        onPress={handleLogout}
      />
    </Appbar.Header>
  );
};

export default AppBar;