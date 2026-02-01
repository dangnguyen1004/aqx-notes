import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, GradientBackground, ScreenHeader } from "../components";
import { NOTE_MAX_LENGTH, RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";
import { useCategoriesStore, useNotesStore } from "../store";
import { getCatDisplayLabel } from "../utils";

export default function NewNoteScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();
  const { categories } = useCategoriesStore();
  const { addNote } = useNotesStore();

  const [content, setContent] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categoryId || categories[0]?.id || null
  );
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const handleSave = () => {
    if (!content.trim() || !selectedCategoryId) {
      return;
    }
    addNote(content.trim(), selectedCategoryId);
    router.back();
  };

  const canSave = content.trim().length > 0 && selectedCategoryId;

  return (
    <GradientBackground edges={["top", "left", "right"]}>
      <ScreenHeader title={t("newNote.title")} showBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t("newNote.chooseCategory")}
          </Text>

          <Pressable
            style={[
              styles.categorySelector,
              { backgroundColor: colors.cardBackground },
            ]}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <View style={styles.categoryDisplay}>
              {selectedCategory && (
                <>
                  <Text style={styles.categoryIcon}>
                    {selectedCategory.icon}
                  </Text>
                  <Text style={[styles.categoryText, { color: colors.text }]}>
                    {getCatDisplayLabel(selectedCategory, t)}
                  </Text>
                </>
              )}
            </View>
            <Ionicons
              name={showCategoryPicker ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>

          {showCategoryPicker && (
            <View
              style={[
                styles.categoryList,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    selectedCategoryId === category.id && {
                      backgroundColor: colors.accent + "20",
                    },
                  ]}
                  onPress={() => {
                    setSelectedCategoryId(category.id);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[styles.categoryText, { color: colors.text }]}>
                    {getCatDisplayLabel(category, t)}
                  </Text>
                  {selectedCategoryId === category.id && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.accent}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          )}

          <Text
            style={[
              styles.label,
              { color: colors.textSecondary, marginTop: 20 },
            ]}
          >
            {t("newNote.placeholder")}
          </Text>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder={t("newNote.placeholder")}
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={NOTE_MAX_LENGTH}
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />
            <Text style={[styles.charCount, { color: colors.textSecondary }]}>
              {t("newNote.characterCount", {
                count: content.length,
                max: NOTE_MAX_LENGTH,
              })}
            </Text>
          </View>
        </ScrollView>
        <View style={[styles.footer, { backgroundColor: colors.background }]}>
          <Button
            title={t("common.save")}
            onPress={handleSave}
            disabled={!canSave}
          />
        </View>
      </KeyboardAvoidingView>
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
  label: {
    fontSize: 14,
    marginBottom: SPACING.sm,
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
  },
  categoryDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  categoryText: {
    fontSize: 16,
  },
  categoryList: {
    marginTop: SPACING.sm,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
  },
  inputContainer: {
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    minHeight: 200,
  },
  input: {
    fontSize: 16,
    flex: 1,
    minHeight: 150,
  },
  charCount: {
    fontSize: 12,
    textAlign: "right",
    marginTop: SPACING.sm,
  },

  footer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    paddingBottom: Platform.OS === "ios" ? SPACING.xxl : SPACING.lg,
  },
});
