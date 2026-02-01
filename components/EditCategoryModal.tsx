import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "./Button";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";
import { Category } from "../types";

const EMOJI_OPTIONS = [
  "📚", "🏠", "💪", "💼", "🎯", "💡", "🎨", "🎵",
  "🍎", "🌟", "📝", "💰", "❤️", "🎮", "✈️", "📱",
  "🌿", "☀️", "🌙", "🔧", "📊", "🎁", "🏆", "🔔",
];

interface EditCategoryModalProps {
  visible: boolean;
  category: Category;
  onClose: () => void;
  onSave: (customLabel: string, icon: string) => void;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  visible,
  category,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [customLabel, setCustomLabel] = useState(
    category.customLabel || ""
  );
  const [selectedIcon, setSelectedIcon] = useState(category.icon);

  const handleSave = () => {
    onSave(customLabel.trim(), selectedIcon);
    onClose();
  };

  const handleClose = () => {
    setCustomLabel(category.customLabel || "");
    setSelectedIcon(category.icon);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View
          style={[styles.container, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {t("editCategory.title")}
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.cardBorder,
              },
            ]}
            placeholder={t("editCategory.labelPlaceholder")}
            placeholderTextColor={colors.textSecondary}
            value={customLabel}
            onChangeText={setCustomLabel}
          />

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            {t("editCategory.selectIcon")}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emojiGrid}
          >
            {EMOJI_OPTIONS.map((emoji) => (
              <Pressable
                key={emoji}
                style={[
                  styles.emojiButton,
                  {
                    backgroundColor:
                      selectedIcon === emoji
                        ? colors.accent + "30"
                        : colors.background,
                    borderColor:
                      selectedIcon === emoji ? colors.accent : colors.cardBorder,
                  },
                ]}
                onPress={() => setSelectedIcon(emoji)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.buttonRow}>
            <Button
              title={t("editCategory.cancel")}
              variant="secondary"
              onPress={handleClose}
              style={styles.button}
            />
            <Button
              title={t("editCategory.save")}
              onPress={handleSave}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "85%",
    maxWidth: 400,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  input: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    padding: SPACING.lg,
    fontSize: 16,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: SPACING.md,
  },
  emojiGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  emojiButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  emoji: {
    fontSize: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  button: {
    flex: 1,
  },
});
