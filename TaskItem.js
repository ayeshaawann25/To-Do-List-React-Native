import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { formatDateTime } from '../utils/date';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.checkButton}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={25}
          color={task.completed ? theme.colors.success : theme.colors.textSecondary}
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completedText]}>{task.title}</Text>
        <Text style={styles.meta}>Created: {formatDateTime(task.createdAt)}</Text>
        <Text style={[styles.status, task.completed ? styles.doneStatus : styles.pendingStatus]}>
          {task.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(task)} hitSlop={10}>
          <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
        </Pressable>
        <Pressable onPress={() => onDelete(task.id)} hitSlop={10}>
          <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 14,
      marginBottom: 10,
      shadowColor: theme.colors.shadow,
      shadowOpacity: theme.mode === 'dark' ? 0.2 : 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    checkButton: {
      marginRight: 10,
    },
    content: {
      flex: 1,
      gap: 4,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: theme.colors.textSecondary,
    },
    meta: {
      color: theme.colors.textSecondary,
      fontSize: 12,
    },
    status: {
      fontSize: 12,
      fontWeight: '700',
    },
    doneStatus: {
      color: theme.colors.success,
    },
    pendingStatus: {
      color: theme.colors.primary,
    },
    actions: {
      marginLeft: 10,
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
