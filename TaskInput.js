import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function TaskInput({ value, onChangeText, onAdd }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Add a new task..."
        placeholderTextColor={theme.colors.placeholder}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />
      <Pressable style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14,
    },
    input: {
      flex: 1,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      color: theme.colors.textPrimary,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
    },
    addButton: {
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 18,
      paddingVertical: 12,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 15,
    },
  });
