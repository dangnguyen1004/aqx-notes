import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Button,
  GradientBackground,
  ScreenHeader,
  TrashNoteItem,
} from "../../components";
import { SPACING } from "../../constants";
import { useTheme } from "../../hooks";
import { useNotesStore } from "../../store";

export default function TrashScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { getDeletedNotes, emptyTrash } = useNotesStore();

  const deletedNotes = getDeletedNotes();

  const handleEmptyTrash = () => {
    if (deletedNotes.length === 0) return;

    Alert.alert(t("common.confirm"), t("trash.emptyTrashConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: emptyTrash,
      },
    ]);
  };

  return (
    <GradientBackground>
      <ScreenHeader title={t("trash.title")} showBack />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {deletedNotes.length > 0 ? (
          <>
            {deletedNotes.map((note) => (
              <TrashNoteItem key={note.id} note={note} />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="trash-outline"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {t("trash.empty")}
            </Text>
          </View>
        )}
      </ScrollView>
      {deletedNotes.length > 0 && (
        <View
          style={[
            styles.actionContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Button title={t("common.emptyTrash")} onPress={handleEmptyTrash} />
        </View>
      )}
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  actionContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  emptyText: {
    fontSize: 16,
    marginTop: SPACING.lg,
  },
});
