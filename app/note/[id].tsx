import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks";
import {
  useCategoriesStore,
  useNotesStore,
  useSettingsStore,
} from "../../store";
import { formatDate } from "../../utils";

export default function NoteDetailScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language } = useSettingsStore();
  const { getNoteById, softDeleteNote } = useNotesStore();
  const { getCategoryById } = useCategoriesStore();

  const note = getNoteById(id);
  const category = note ? getCategoryById(note.categoryId) : null;

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

  if (!note) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
            <Text style={[styles.backText, { color: colors.text }]}>
              {t("common.back")}
            </Text>
          </Pressable>
        </View>
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>
            {t("noteDetail.title")}
          </Text>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons name="trash-outline" size={24} color={colors.accent} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Badge */}
        {category && (
          <View
            style={[styles.categoryBadge, { backgroundColor: colors.card }]}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[styles.categoryText, { color: colors.text }]}>
              {t(category.labelKey)}
            </Text>
          </View>
        )}

        {/* Note Content */}
        <View style={[styles.contentCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.noteContent, { color: colors.text }]}>
            {note.content}
          </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  noteContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  metadata: {
    marginTop: 8,
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
    marginTop: 16,
  },
});
