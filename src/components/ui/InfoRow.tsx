import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';

interface Props {
  icon: string;
  label: string;
  value: string | number;
}

const InfoRow: React.FC<Props> = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      {/* ✅ Icon unchanged — vector icons don't need Paper */}
      <MaterialCommunityIcons name={icon} size={20} color={colors.primary} />

      {/* ✅ Paper Text replaces RN Text */}
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
};

export default InfoRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
    width: 130,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
});