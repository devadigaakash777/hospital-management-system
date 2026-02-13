import React, { useState } from 'react';
import {

View,
Text,
StyleSheet,
TouchableOpacity,
FlatList,
} from 'react-native';

interface Doctor {
id: string;
name: string;
specialty: string;
}

export default function DoctorManagementScreen() {
const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Johnson', specialty: 'Neurology' },
]);

const renderDoctor = ({ item }: { item: Doctor }) => (
    <View style={styles.doctorCard}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
    </View>
);

return (
    <View style={styles.container}>
        <Text style={styles.title}>Doctor Management</Text>
        <FlatList
            data={doctors}
            renderItem={renderDoctor}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Doctor</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
},
doctorCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
},
doctorName: {
    fontSize: 16,
    fontWeight: '600',
},
specialty: {
    fontSize: 14,
    color: '#666',
},
button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
},
});