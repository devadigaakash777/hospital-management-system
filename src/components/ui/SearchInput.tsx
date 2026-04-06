import React from 'react';
import { Searchbar } from 'react-native-paper';
import { colors } from '../../theme';
import { wp, hp } from '../../utils/responsive';

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
    <Searchbar
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onClearIconPress={() => onChangeText('')}
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        borderRadius: wp(2.5),
        height: hp(5.5),
        marginBottom: hp(1.5),
        elevation: 0,
      }}
      inputStyle={{
        color: colors.textPrimary,
        fontSize: wp(3.5),
        minHeight: 0,
        alignSelf: 'center',
      }}
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