import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader, TrashNoteItem } from "../../components";
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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

            <Pressable
              style={[styles.emptyButton, { backgroundColor: colors.accent }]}
              onPress={handleEmptyTrash}
            >
              <Text style={styles.emptyButtonText}>
                {t("common.emptyTrash")}
              </Text>
            </Pressable>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  emptyButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
