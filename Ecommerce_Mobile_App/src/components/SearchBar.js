import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function SearchBar({ value, onChangeText, onSubmit }) {
  return (
    <View style={styles.container}>
      <Search size={20} color={colors.textPlaceholder} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search for products, brands and more..."
        placeholderTextColor={colors.textPlaceholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.textPrimary,
  },
});
