import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ value, onChangeText }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={theme.colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search tasks..."
        placeholderTextColor={theme.colors.placeholder}
        style={styles.input}
      />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 14,
      backgroundColor: theme.colors.inputBackground,
      paddingHorizontal: 12,
      marginBottom: 12,
      height: 46,
      gap: 8,
    },
    input: {
      flex: 1,
      color: theme.colors.textPrimary,
      fontSize: 15,
    },
  });
