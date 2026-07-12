import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { mode, toggleMode, primaryColorName, setPrimaryColorName, availableColors, theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.screen}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggleMode}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#CBD5E1', true: theme.colors.primary }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Primary Color</Text>
        <View style={styles.colorGrid}>
          {Object.entries(availableColors).map(([name, color]) => {
            const isSelected = primaryColorName === name;
            return (
              <Pressable
                key={name}
                style={[styles.colorButton, { backgroundColor: color }, isSelected && styles.selectedColorButton]}
                onPress={() => setPrimaryColorName(name)}
              >
                <Text style={styles.colorName}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
      gap: 16,
    },
    section: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 16,
      shadowColor: theme.colors.shadow,
      shadowOpacity: theme.mode === 'dark' ? 0.15 : 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    sectionTitle: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 14,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    colorButton: {
      width: '31%',
      minHeight: 46,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedColorButton: {
      borderColor: theme.colors.textPrimary,
    },
    colorName: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 13,
    },
  });
