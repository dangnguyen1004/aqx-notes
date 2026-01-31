import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";
import { useNotesStore } from "../store";
import { Note } from "../types";
import { truncateText } from "../utils";

interface TrashNoteItemProps {
  note: Note;
}

export const TrashNoteItem: React.FC<TrashNoteItemProps> = ({ note }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { restoreNote, permanentlyDeleteNote } = useNotesStore();

  const handleRestore = () => {
    restoreNote(note.id);
  };

  const handleDelete = () => {
    Alert.alert(t("common.confirm"), t("trash.deleteConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => permanentlyDeleteNote(note.id),
      },
    ]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      <Text style={[styles.content, { color: colors.text }]} numberOfLines={2}>
        {truncateText(note.content, 50)}
      </Text>
      <View style={styles.actions}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          onPress={handleRestore}
        >
          <Ionicons name="refresh" size={16} color="#ffffff" />
          <Text style={styles.actionText}>{t("common.restore")}</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={16} color="#ffffff" />
          <Text style={styles.actionText}>{t("common.delete")}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  content: {
    fontSize: 14,
    marginBottom: SPACING.md,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    gap: SPACING.xs,
  },
  deleteButton: {
    backgroundColor: "#666666",
  },
  actionText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
