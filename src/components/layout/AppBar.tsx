import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from '../headers/AppHeader';
import { AppButton } from '..';
import { colors } from '../../theme';

const AppBar: React.FC = () => {
    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logout pressed');
    };

    return (
        <View style={styles.appBar}>
            {/* Left Section */}
            <View style={styles.leftSection}>
                <AppHeader
                logo={require('../../assets/admin-logo.jpg')}
                title="Admin Dashboard"
                subtitle="Adarsha Hospital Management"
                />
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
                <AppButton
                    text="Logout"
                    onPress={handleLogout}
                    iconName="logout"
                    iconFamily="MaterialCommunityIcons"
                    iconSize={18}
                    borderColor='white'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.surface,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
});

export default AppBar;