import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";
import { Note } from "../types";
import { truncateText } from "../utils";

interface NoteItemProps {
  note: Note;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
        },
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() => router.push(`/note/${note.id}`)}
    >
      <Text style={[styles.content, { color: colors.text }]} numberOfLines={2}>
        {truncateText(note.content)}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#e94560" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
  },
  content: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
    marginRight: SPACING.md,
    lineHeight: 22,
  },
});
