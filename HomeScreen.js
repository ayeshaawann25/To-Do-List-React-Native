import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskInput from '../components/TaskInput';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../context/ThemeContext';
import { loadFilter, loadTasks, saveFilter, saveTasks } from '../storage/storage';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isReady, setIsReady] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={22} color={theme.colors.textPrimary} />
        </Pressable>
      ),
    });
  }, [navigation, theme, styles.settingsButton]);

useEffect(() => {
  const hydrateData = async () => {
    const [savedTasks, savedFilter] = await Promise.all([
      loadTasks(),
      loadFilter(),
    ]);

    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      setTasks([
        {
          id: '1',
          title: '🛒 Groceries',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: '📚 Study',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: '💪 Exercise',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: '🛍 Shopping',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          title: '🤝 Meeting',
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setActiveFilter(savedFilter || 'all');
    setIsReady(true);
  };

  hydrateData();
}, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    saveTasks(tasks);
  }, [tasks, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    saveFilter(activeFilter);
  }, [activeFilter, isReady]);

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setTitle('');
    Keyboard.dismiss();
  };

  const toggleTask = (taskId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (taskId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditingTitle(task.title);
  };

  const saveTaskEdit = () => {
    const trimmedTitle = editingTitle.trim();
    if (!editingTask || !trimmedTitle) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === editingTask.id ? { ...task, title: trimmedTitle } : task))
    );
    setEditingTask(null);
    setEditingTitle('');
  };

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase().trim());
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' && task.completed) ||
        (activeFilter === 'pending' && !task.completed);
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchText, activeFilter]);

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <View style={styles.screen}>
      <Text style={styles.counter}>
        {tasks.length} tasks • {completedCount} completed
      </Text>

      <TaskInput value={title} onChangeText={setTitle} onAdd={addTask} />
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState hasTasks={tasks.length > 0} />}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditModal} />
        )}
      />

      <Modal transparent visible={Boolean(editingTask)} animationType="fade" onRequestClose={() => setEditingTask(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              value={editingTitle}
              onChangeText={setEditingTitle}
              placeholder="Task title"
              placeholderTextColor={theme.colors.placeholder}
              style={styles.modalInput}
              autoFocus
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.secondaryButton} onPress={() => setEditingTask(null)}>
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={saveTaskEdit}>
                <Text style={styles.primaryButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
      backgroundColor: theme.colors.background,
    },
    settingsButton: {
      padding: 6,
    },
    counter: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      marginBottom: 10,
      fontWeight: '600',
    },
    listContent: {
      paddingBottom: 24,
      flexGrow: 1,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: 20,
    },
    modalCard: {
      width: '100%',
      borderRadius: 16,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 16,
    },
    modalTitle: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      backgroundColor: theme.colors.inputBackground,
      color: theme.colors.textPrimary,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
    },
    modalActions: {
      marginTop: 14,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    secondaryButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    secondaryButtonText: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
    primaryButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
  });
