import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';
import { AppButton } from '../../components';

interface SearchablePickerProps {
  label?: string;
  labelColor?: string;
  value: string | null;
  placeholder?: string;
  options: string[];
  containerStyle?: StyleProp<ViewStyle>;
  onSelect: (value: string) => void;
}

const SearchablePicker: React.FC<SearchablePickerProps> = ({
  label,
  labelColor = colors.textSecondary,
  value,
  placeholder = 'Select',
  options,
  containerStyle,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  return (
    <>
      {label && (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      )}

      {/* Picker Input */}
      <TouchableOpacity
        style={[styles.input, containerStyle]}
        onPress={() => {
          setSearch('');
          setVisible(true);
        }}
      >
        <Text style={[styles.value, !value && { color: colors.textSecondary }]}>
          {value || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>

            {/* Search */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
              autoFocus
            />

            {/* Options */}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.empty}>No results found</Text>
              }
            />

            <AppButton
              text="Cancel"
              onPress={() => setVisible(false)}
              backgroundColor={colors.primary}
              color={colors.textPrimary}
              containerStyle={styles.cancelBtn}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchablePicker;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  value: {
    color: colors.textPrimary,
  },
  arrow: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    maxHeight: '70%',
    padding: 12,
    paddingVertical: 30,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: colors.card,
    color: colors.textPrimary,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  empty: {
    textAlign: 'center',
    padding: 20,
    color: colors.textSecondary,
  },
  cancelBtn: {
    marginTop: 20,
    alignSelf: 'flex-end',
    width: '40%',
    paddingVertical: 8,
    borderRadius: 8,
  },
});