import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GradientBackground, ScreenHeader } from "../../components";
import { NOTE_MAX_LENGTH, RADIUS, SPACING } from "../../constants";
import { useTheme } from "../../hooks";
import {
  useCategoriesStore,
  useNotesStore,
  useSettingsStore,
} from "../../store";
import { formatDate, getCatDisplayLabel } from "../../utils";

export default function NoteDetailScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language } = useSettingsStore();
  const { getNoteById, softDeleteNote, updateNote } = useNotesStore();
  const { getCategoryById } = useCategoriesStore();

  const note = getNoteById(id);
  const category = note ? getCategoryById(note.categoryId) : null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note?.content ?? "");

  const handleDelete = () => {
    Alert.alert(t("common.confirm"), t("noteDetail.deleteConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          softDeleteNote(id);
          router.back();
        },
      },
    ]);
  };

  const handleEdit = () => {
    setEditedContent(note?.content ?? "");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedContent.trim()) {
      updateNote(id, editedContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(note?.content ?? "");
    setIsEditing(false);
  };

  if (!note) {
    return (
      <GradientBackground>
        <ScreenHeader title={t("common.back")} showBack />
        <View style={styles.notFound}>
          <Ionicons
            name="document-outline"
            size={64}
            color={colors.textSecondary}
          />
          <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>
            Note not found
          </Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScreenHeader
        title={t("noteDetail.title")}
        showBack={!isEditing}
        leftAction={
          isEditing ? (
            <Pressable onPress={handleCancelEdit}>
              <Text
                style={[styles.actionText, { color: colors.textSecondary }]}
              >
                {t("common.cancel")}
              </Text>
            </Pressable>
          ) : undefined
        }
        rightAction={
          isEditing ? (
            <Pressable onPress={handleSave}>
              <Text
                style={[
                  styles.actionText,
                  styles.saveText,
                  { color: colors.accent },
                ]}
              >
                {t("common.save")}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.actionRow}>
              <Pressable onPress={handleEdit}>
                <Ionicons
                  name="pencil-outline"
                  size={24}
                  color={colors.accent}
                />
              </Pressable>
              <Pressable onPress={handleDelete}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color={colors.accent}
                />
              </Pressable>
            </View>
          )
        }
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Badge */}
        {category && (
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[styles.categoryText, { color: colors.text }]}>
              {getCatDisplayLabel(category, t)}
            </Text>
          </View>
        )}

        {/* Note Content */}
        <View
          style={[
            styles.contentCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          {isEditing ? (
            <>
              <TextInput
                style={[
                  styles.noteContent,
                  styles.noteInput,
                  { color: colors.text },
                ]}
                value={editedContent}
                onChangeText={setEditedContent}
                multiline
                maxLength={NOTE_MAX_LENGTH}
                autoFocus
                placeholder={t("newNote.placeholder")}
                placeholderTextColor={colors.textSecondary}
              />
              <Text style={[styles.charCount, { color: colors.textSecondary }]}>
                {t("newNote.characterCount", {
                  count: editedContent.length,
                  max: NOTE_MAX_LENGTH,
                })}
              </Text>
            </>
          ) : (
            <Text style={[styles.noteContent, { color: colors.text }]}>
              {note.content}
            </Text>
          )}
        </View>

        {/* Metadata */}
        <View style={styles.metadata}>
          <View style={styles.metaRow}>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {t("noteDetail.createdAt")}:{" "}
              {formatDate(note.createdAt, language)}
            </Text>
          </View>
        </View>
      </ScrollView>
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
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  contentCard: {
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  noteContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  noteInput: {
    minHeight: 200,
    textAlignVertical: "top",
  },
  metadata: {
    marginTop: SPACING.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
    marginTop: SPACING.lg,
  },
  charCount: {
    fontSize: 12,
    textAlign: "right",
    marginTop: SPACING.sm,
  },
  actionText: {
    fontSize: 16,
  },
  saveText: {
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    gap: SPACING.lg,
  },
});
