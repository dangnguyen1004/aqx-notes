import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NOTES_PER_CATEGORY } from "../constants";
import { useTheme } from "../hooks";
import { useNotesStore } from "../store";
import { Category } from "../types";
import { NoteItem } from "./NoteItem";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { getLatestNotesByCategory } = useNotesStore();

  const latestNotes = getLatestNotesByCategory(category.id, NOTES_PER_CATEGORY);

  const onPress = () => {
    // TODO: Navigate to category details screen
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={onPress}>
        <View style={styles.titleRow}>
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {t(category.labelKey)}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>
      <View style={styles.notesContainer}>
        {latestNotes.length > 0 ? (
          latestNotes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            {t("common.noNotes")}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginBottom: 12,
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  notesContainer: {
    gap: 0,
  },
  emptyText: {
    fontSize: 14,
    fontStyle: "italic",
    marginLeft: 4,
  },
});
