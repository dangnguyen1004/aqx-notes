import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
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
        <Button
          title={t("common.restore")}
          icon="refresh"
          size="sm"
          onPress={handleRestore}
          fullWidth={false}
        />
        <Button
          title={t("common.delete")}
          icon="trash"
          size="sm"
          variant="danger"
          onPress={handleDelete}
          fullWidth={false}
        />
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
});
