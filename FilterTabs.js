import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const FILTERS = ['all', 'completed', 'pending'];

export default function FilterTabs({ activeFilter, onFilterChange }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Pressable
            key={filter}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onFilterChange(filter)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
    },
    activeTab: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    tabText: {
      color: theme.colors.textSecondary,
      fontWeight: '600',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
  });
