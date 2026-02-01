import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
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
import {
  Button,
  GradientBackground,
  ScreenHeader,
  SettingsLink,
} from "../../components";
import { EXTERNAL_URLS, RADIUS, SPACING } from "../../constants";
import { useTheme } from "../../hooks";
import { useNotesStore, useSettingsStore } from "../../store";
import { Language, ThemeMode } from "../../types";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { theme, language, setTheme, setLanguage } = useSettingsStore();
  const { deleteAllNotes, getActiveNotes } = useNotesStore();

  const handleDeleteAllNotes = () => {
    const activeNotes = getActiveNotes();
    if (activeNotes.length === 0) {
      Alert.alert(t("common.noNotes"));
      return;
    }

    Alert.alert(t("common.confirm"), t("settings.deleteAllConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          deleteAllNotes();
          Alert.alert(t("settings.allNotesDeleted"));
        },
      },
    ]);
  };

  const openURL = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: "light", label: t("settings.themeLight") },
    { value: "dark", label: t("settings.themeDark") },
    { value: "auto", label: t("settings.themeAuto") },
  ];

  const languageOptions: { value: Language; label: string }[] = [
    { value: "en", label: t("languages.en") },
    { value: "vi", label: t("languages.vi") },
  ];

  const ThemeSelector = () => (
    <View style={styles.selectorContainer}>
      {themeOptions.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.selectorOption,
            {
              backgroundColor:
                theme === option.value ? colors.accent : colors.cardBackground,
            },
          ]}
          onPress={() => setTheme(option.value)}
        >
          <Text
            style={[
              styles.selectorText,
              { color: theme === option.value ? "#ffffff" : colors.text },
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const LanguageSelector = () => (
    <View style={styles.selectorContainer}>
      {languageOptions.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.selectorOption,
            {
              backgroundColor:
                language === option.value
                  ? colors.accent
                  : colors.cardBackground,
            },
          ]}
          onPress={() => setLanguage(option.value)}
        >
          <Text
            style={[
              styles.selectorText,
              { color: language === option.value ? "#ffffff" : colors.text },
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <GradientBackground>
      <ScreenHeader title={t("settings.title")} showBack />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textSecondary, marginTop: 0 },
          ]}
        >
          {t("settings.theme")}
        </Text>
        <ThemeSelector />

        {/* Language Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t("settings.language")}
        </Text>
        <LanguageSelector />

        {/* Links Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Links
        </Text>
        <SettingsLink
          icon="chatbubble-outline"
          label={t("settings.onlineCustomer")}
          onPress={() => openURL(EXTERNAL_URLS.onlineCustomer)}
        />
        <SettingsLink
          icon="document-text-outline"
          label={t("settings.userAgreement")}
          onPress={() => openURL(EXTERNAL_URLS.userAgreement)}
        />
        <SettingsLink
          icon="shield-checkmark-outline"
          label={t("settings.privacyPolicy")}
          onPress={() => openURL(EXTERNAL_URLS.privacyPolicy)}
        />
        <SettingsLink
          icon="information-circle-outline"
          label={t("settings.aboutUs")}
          onPress={() => openURL(EXTERNAL_URLS.aboutUs)}
        />

        {/* Trash */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Data
        </Text>
        <SettingsLink
          icon="trash-outline"
          label={t("settings.trash")}
          onPress={() => router.push("/settings/trash")}
        />
      </ScrollView>
      {/* Delete All Notes Button */}
      <View
        style={[styles.actionContainer, { backgroundColor: colors.header }]}
      >
        <Button
          title={t("settings.deleteAllNotes")}
          onPress={handleDeleteAllNotes}
        />
      </View>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: SPACING.xxl,
    marginBottom: SPACING.md,
    textTransform: "uppercase",
  },
  selectorContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  selectorOption: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: "center",
  },
  selectorText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
});
