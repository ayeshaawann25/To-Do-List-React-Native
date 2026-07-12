import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function EmptyState({ hasTasks }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Ionicons name="file-tray-outline" size={48} color={theme.colors.textSecondary} />
      <Text style={styles.title}>{hasTasks ? 'No matching tasks found' : 'No tasks yet'}</Text>
      <Text style={styles.subtitle}>
        {hasTasks ? 'Try changing your search or filter.' : 'Create your first task to get started.'}
      </Text>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 40,
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    title: {
      marginTop: 10,
      fontSize: 18,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
    subtitle: {
      marginTop: 6,
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
