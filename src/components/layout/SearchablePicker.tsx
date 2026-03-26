import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import {
  Portal,
  Dialog,
  Text,
  Button,
  TouchableRipple,
  Searchbar,
} from 'react-native-paper';
import { colors } from '../../theme';

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
    return options.filter(opt =>
      opt.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  return (
    <>
      {/* ✅ Label */}
      {label && (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      )}

      {/* ✅ TouchableRipple replaces TouchableOpacity picker trigger */}
      <TouchableRipple
        style={[styles.input, containerStyle]}
        onPress={() => {
          setSearch('');
          setVisible(true);
        }}
        rippleColor={colors.primary + '22'}
      >
        <View style={styles.inputInner}>
          <Text style={[styles.value, !value && { color: colors.textSecondary }]}>
            {value || placeholder}
          </Text>
          <Text style={styles.arrow}>▼</Text>
        </View>
      </TouchableRipple>

      {/* ✅ Portal + Dialog replaces Modal + View overlay */}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Content style={styles.dialogContent}>

            {/* ✅ Paper Searchbar replaces custom TextInput search */}
            <Searchbar
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchbar}
              inputStyle={styles.searchInput}
              iconColor={colors.textSecondary}
              autoFocus
              elevation={0}
              theme={{
                colors: { onSurfaceVariant: colors.textSecondary },
              }}
            />

            {/* ✅ FlatList stays — no Paper equivalent needed */}
            <FlatList
              data={filteredOptions}
              keyExtractor={item => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                // ✅ TouchableRipple replaces TouchableOpacity for options
                <TouchableRipple
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  rippleColor={colors.primary + '22'}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableRipple>
              )}
              ListEmptyComponent={
                <Text style={styles.empty}>No results found</Text>
              }
            />

          </Dialog.Content>

          {/* ✅ Dialog.Actions + Paper Button replaces AppButton */}
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={() => setVisible(false)}
              buttonColor={colors.primary}
              textColor={colors.textPrimary}
              style={styles.cancelBtn}
            >
              Cancel
            </Button>
          </Dialog.Actions>

        </Dialog>
      </Portal>
    </>
  );
};

export default SearchablePicker;

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
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  value: {
    color: colors.textPrimary,
  },
  arrow: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dialog: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    maxHeight: '70%',
  },
  dialogContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  searchbar: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 0,
  },
  searchInput: {
    color: colors.textPrimary,
    fontSize: 14,
    minHeight: 0,
    alignSelf: 'center',
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
    minWidth: '40%',
  },
});