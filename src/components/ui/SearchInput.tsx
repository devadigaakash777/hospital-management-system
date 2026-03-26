import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { colors } from '../../theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}) => {
  return (
    // ✅ Paper Searchbar replaces entire custom View + TextInput + icons
    <Searchbar
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onClearIconPress={() => onChangeText('')}
      style={styles.container}
      inputStyle={styles.input}
      iconColor={colors.textSecondary}
      placeholderTextColor={colors.textSecondary}
      theme={{
        colors: {
          onSurfaceVariant: colors.textSecondary,
        },
      }}
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 10,
    height: 45,
    marginBottom: 12,
    elevation: 0, // ✅ Remove Paper's default shadow
  },
  input: {
    color: colors.textPrimary,
    fontSize: 14,
    minHeight: 0,  // ✅ Fixes height on Android
    alignSelf: 'center',
  },
});