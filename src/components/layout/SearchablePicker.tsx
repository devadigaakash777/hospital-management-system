import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

interface SearchablePickerProps {
  label?: string;
  value: string | null;
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
}

const SearchablePicker: React.FC<SearchablePickerProps> = ({
  label,
  value,
  placeholder = 'Select',
  options,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter(opt =>
      opt.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Picker Input */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setSearch('');
          setVisible(true);
        }}
      >
        <Text style={styles.value}>
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

            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
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
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    color: '#111827',
  },
  arrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    maxHeight: '70%',
    padding: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 15,
  },
  empty: {
    textAlign: 'center',
    padding: 20,
    color: '#6B7280',
  },
  cancelBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  cancelText: {
    color: '#10B981',
    fontWeight: '700',
  },
});
