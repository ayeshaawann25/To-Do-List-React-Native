import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { loadThemePreference, saveThemePreference } from '../storage/storage';

const PRIMARY_COLORS = {
  Purple: '#9168d9',
  Blue: '#618ae4',
  Green: '#6ad18f',
  Yellow: '#efe44e',
  Pink: '#c442a4',
};

const ThemeContext = createContext(null);

const createPalette = (mode, primaryColor) => {
  const isDark = mode === 'dark';

  return {
    mode,
    primaryColor,
    colors: {
      background: isDark ? '#26314a' : '#f5dcfa',
      card: isDark ? '#1E293B' : '#FFFFFF',
      cardSecondary: isDark ? '#334155' : '#EEF2FF',
      textPrimary: isDark ? '#E2E8F0' : '#0F172A',
      textSecondary: isDark ? '#94A3B8' : '#64748B',
      border: isDark ? '#161b23' : '#E2E8F0',
      success: '#22C55E',
      danger: '#EF4444',
      shadow: '#000000',
      primary: primaryColor,
      placeholder: isDark ? '#969ea9' : '#94A3B8',
      inputBackground: isDark ? '#1E293B' : '#ffffff',
    },
  };
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
  const [primaryColorName, setPrimaryColorName] = useState('blue');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrateTheme = async () => {
      const savedTheme = await loadThemePreference();
      if (savedTheme) {
        setMode(savedTheme.mode ?? 'light');
        setPrimaryColorName(savedTheme.primaryColorName ?? 'blue');
      }
      setIsHydrated(true);
    };

    hydrateTheme();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveThemePreference({ mode, primaryColorName });
  }, [mode, primaryColorName, isHydrated]);

  const theme = useMemo(() => createPalette(mode, PRIMARY_COLORS[primaryColorName]), [mode, primaryColorName]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      primaryColorName,
      availableColors: PRIMARY_COLORS,
      setMode,
      toggleMode: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
      setPrimaryColorName,
    }),
    [theme, mode, primaryColorName]
  );

  if (!isHydrated) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};