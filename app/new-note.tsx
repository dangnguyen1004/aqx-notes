import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NOTE_MAX_LENGTH } from "../constants";
import { useTheme } from "../hooks";
import { useCategoriesStore, useNotesStore } from "../store";

export default function NewNoteScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { categories } = useCategoriesStore();
  const { addNote } = useNotesStore();

  const [content, setContent] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories[0]?.id || null
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
            {t("newNote.title")}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {/* Category Picker */}
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {t("newNote.chooseCategory")}
        </Text>
        <Pressable
          style={[styles.categorySelector, { backgroundColor: colors.card }]}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
        >
          <View style={styles.categoryDisplay}>
            {selectedCategory && (
              <>
                <Text style={styles.categoryIcon}>{selectedCategory.icon}</Text>
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {t(selectedCategory.labelKey)}
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
          <View style={[styles.categoryList, { backgroundColor: colors.card }]}>
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
                  {t(category.labelKey)}
                </Text>
                {selectedCategoryId === category.id && (
                  <Ionicons name="checkmark" size={20} color={colors.accent} />
                )}
              </Pressable>
            ))}
          </View>
        )}

        {/* Note Content Input */}
        <Text
          style={[styles.label, { color: colors.textSecondary, marginTop: 20 }]}
        >
          {t("newNote.placeholder")}
        </Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
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

        {/* Save Button */}
        <Pressable
          style={[
            styles.saveButton,
            { backgroundColor: canSave ? colors.accent : colors.textSecondary },
          ]}
          onPress={handleSave}
          disabled={!canSave}
        >
          <Text style={styles.saveButtonText}>{t("common.save")}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
  },
  categoryDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
  },
  categoryList: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  inputContainer: {
    borderRadius: 12,
    padding: 16,
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
    marginTop: 8,
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
