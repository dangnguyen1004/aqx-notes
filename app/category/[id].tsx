import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Button,
  EditCategoryModal,
  GradientBackground,
  ScreenHeader,
  SwipeableNoteItem,
} from "../../components";
import { RADIUS, SPACING } from "../../constants";
import { useTheme } from "../../hooks";
import { useCategoriesStore, useNotesStore } from "../../store";
import { Note } from "../../types";
import { getCatDisplayLabel } from "../../utils";

export default function CategoryDetailScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getCategoryById, updateCategory } = useCategoriesStore();
  const {
    getNotesByCategory,
    getNotesCountByCategory,
    softDeleteNote,
    softDeleteNotesByCategory,
  } = useNotesStore();

  const [editModalVisible, setEditModalVisible] = useState(false);

  const category = getCategoryById(id);
  const notes = getNotesByCategory(id);
  const noteCount = getNotesCountByCategory(id);

  if (!category) {
    return (
      <GradientBackground>
        <ScreenHeader title={t("common.back")} showBack />
        <View style={styles.notFound}>
          <Ionicons
            name="folder-outline"
            size={64}
            color={colors.textSecondary}
          />
          <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>
            Category not found
          </Text>
        </View>
      </GradientBackground>
    );
  }

  const categoryLabel = getCatDisplayLabel(category, t);
  const headerTitle = `${category.icon} ${categoryLabel}`;

  const handleAddNote = () => {
    router.push(`/new-note?categoryId=${category.id}`);
  };

  const handleDeleteNote = (noteId: string) => {
    softDeleteNote(noteId);
  };

  const handleSaveCategory = (customLabel: string, icon: string) => {
    updateCategory(category.id, {
      customLabel: customLabel || undefined,
      icon,
    });
  };

  const handleDeleteAllNotes = () => {
    if (noteCount === 0) return;

    Alert.alert(
      t("categoryDetail.deleteAllTitle"),
      t("categoryDetail.deleteAllMessage", { count: noteCount }),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => softDeleteNotesByCategory(category.id),
        },
      ],
    );
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <SwipeableNoteItem note={item} onDelete={handleDeleteNote} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="document-text-outline"
        size={64}
        color={colors.textSecondary}
      />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        {t("categoryDetail.emptyNotes")}
      </Text>
    </View>
  );

  return (
    <GradientBackground>
      <ScreenHeader
        title={headerTitle}
        showBack
        rightAction={
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable onPress={() => setEditModalVisible(true)}>
              <Ionicons name="pencil-outline" size={24} color={colors.accent} />
            </Pressable>
            <Pressable
              onPress={handleDeleteAllNotes}
              disabled={noteCount === 0}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={noteCount === 0 ? colors.textSecondary : "#FF4444"}
              />
            </Pressable>
          </View>
        }
      />

      {/* Note count badge */}
      <View style={styles.countContainer}>
        <View
          style={[
            styles.countBadge,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <Text style={[styles.countText, { color: colors.textSecondary }]}>
            {t("categoryDetail.noteCount", { count: noteCount })}
          </Text>
        </View>
      </View>

      {/* Notes list */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />

      {/* Add note footer button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button
          title={t("categoryDetail.addNote")}
          icon="add"
          onPress={handleAddNote}
        />
      </View>

      {/* Edit category modal */}
      <EditCategoryModal
        visible={editModalVisible}
        category={category}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveCategory}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
    marginTop: SPACING.lg,
  },
  countContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  countBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.xl,
  },
  countText: {
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SPACING.xxl * 2,
  },
  emptyText: {
    fontSize: 16,
    marginTop: SPACING.lg,
    fontStyle: "italic",
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
});
