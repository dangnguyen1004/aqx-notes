import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Note } from "../types";
import { truncateText } from "../utils";

interface NoteItemProps {
  note: Note;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() => router.push(`/note/${note.id}`)}
    >
      <LinearGradient
        colors={["#5a3f8a", "#3d2a6b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.content} numberOfLines={2}>
          {truncateText(note.content, 80)}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#e94560" />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  content: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ffffff",
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
});
