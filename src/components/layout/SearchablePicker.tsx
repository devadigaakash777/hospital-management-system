import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import {
  Portal,
  Dialog,
  Text,
  Button,
  TouchableRipple,
  Searchbar,
} from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
      {/* Label */}
      {label && (
        <Text
          style={{
            color: labelColor,
            fontWeight: '600',
            marginBottom: hp(0.8),
            marginTop: hp(1.5),
          }}
        >
          {label}
        </Text>
      )}

      {/* Picker Trigger */}
      <TouchableRipple
        style={[
          {
            backgroundColor: colors.card,
            borderRadius: wp(2.5),
            borderWidth: 1,
            borderColor: colors.border,
          },
          containerStyle,
        ]}
        onPress={() => {
          setSearch('');
          setVisible(true);
        }}
        rippleColor={colors.primary + '22'}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: hp(1.8),
            paddingHorizontal: wp(3),
          }}
        >
          <Text
            style={{
              color: value ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {value || placeholder}
          </Text>
          <Text
            style={{
              fontSize: wp(3),
              color: colors.textSecondary,
            }}
          >
            ▼
          </Text>
        </View>
      </TouchableRipple>

      {/* Dialog */}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{
            backgroundColor: colors.background,
            borderWidth: 2,
            borderColor: colors.border,
            borderRadius: wp(3.5),
            maxHeight: '70%',
          }}
        >
          <Dialog.Content
            style={{
              paddingHorizontal: wp(3),
              paddingTop: hp(2),
            }}
          >
            {/* Searchbar */}
            <Searchbar
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: wp(2.5),
                marginBottom: hp(1.2),
                elevation: 0,
              }}
              inputStyle={{
                color: colors.textPrimary,
                fontSize: wp(3.5),
                minHeight: 0,
                alignSelf: 'center',
              }}
              iconColor={colors.textSecondary}
              autoFocus
              elevation={0}
              theme={{
                colors: { onSurfaceVariant: colors.textSecondary },
              }}
            />

            {/* Options List */}
            <FlatList
              data={filteredOptions}
              keyExtractor={item => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableRipple
                  style={{
                    paddingVertical: hp(1.8),
                    paddingHorizontal: wp(2.5),
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  rippleColor={colors.primary + '22'}
                >
                  <Text
                    style={{
                      fontSize: wp(3.8),
                      color: colors.textPrimary,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableRipple>
              )}
              ListEmptyComponent={
                <Text
                  style={{
                    textAlign: 'center',
                    padding: wp(5),
                    color: colors.textSecondary,
                  }}
                >
                  No results found
                </Text>
              }
            />
          </Dialog.Content>

          {/* Cancel Button */}
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={() => setVisible(false)}
              buttonColor={colors.primary}
              textColor={colors.textPrimary}
              style={{ minWidth: '40%' }}
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