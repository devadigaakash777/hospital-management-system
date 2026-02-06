import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components';
import { colors } from '../theme';

const DashboardScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Hospital Dashboard</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    header: {
        marginBottom: 24,
        paddingTop: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
    },
});

export default DashboardScreen;