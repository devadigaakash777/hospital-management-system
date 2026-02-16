import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function HealthPackageScreen() {
  const healthPackages = [
    { id: 1, name: 'Basic Checkup', price: '$50' },
    { id: 2, name: 'Full Health Screening', price: '$150' },
    { id: 3, name: 'Premium Package', price: '$300' },
  ];

  const handleBookAppointment = (packageName: string) => {
    Alert.alert(`Booking ${packageName}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Packages</Text>
      <View style={styles.packagesContainer}>
        {healthPackages.map((pkg) => (
          <View key={pkg.id} style={styles.card}>
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.price}>{pkg.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleBookAppointment(pkg.name)}
            >
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  packagesContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
