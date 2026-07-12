import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  tasks: '@todo_tasks',
  theme: '@todo_theme',
  filter: '@todo_filter',
};

const readJson = async (key, fallbackValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch (error) {
    console.warn(`Failed to read key: ${key}`, error);
    return fallbackValue;
  }
};

const writeJson = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write key: ${key}`, error);
  }
};

export const loadTasks = () => readJson(STORAGE_KEYS.tasks, []);
export const saveTasks = (tasks) => writeJson(STORAGE_KEYS.tasks, tasks);

export const loadThemePreference = () =>
  readJson(STORAGE_KEYS.theme, {
    mode: 'light',
    primaryColorName: 'blue',
  });

export const saveThemePreference = (themePreference) => writeJson(STORAGE_KEYS.theme, themePreference);

export const loadFilter = () => readJson(STORAGE_KEYS.filter, 'all');
export const saveFilter = (filter) => writeJson(STORAGE_KEYS.filter, filter);
