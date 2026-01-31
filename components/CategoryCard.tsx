import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';
import { useNotesStore } from '../store';
import { Category } from '../types';
import { NoteItem } from './NoteItem';
import { NOTES_PER_CATEGORY } from '../constants';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { getLatestNotesByCategory } = useNotesStore();

  const latestNotes = getLatestNotesByCategory(category.id, NOTES_PER_CATEGORY);

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Pressable
        style={styles.header}
        onPress={() => {
          // Could navigate to category detail in the future
        }}
      >
        <View style={styles.titleRow}>
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {t(category.labelKey)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </Pressable>

      <View style={styles.notesContainer}>
        {latestNotes.length > 0 ? (
          latestNotes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            {t('common.noNotes')}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
