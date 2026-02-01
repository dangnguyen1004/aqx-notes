import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";
import { Note } from "../types";
import { truncateText } from "../utils";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = -80;
const HARD_SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.4;

interface SwipeableNoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const SwipeableNoteItemComponent: React.FC<SwipeableNoteItemProps> = ({
  note,
  onDelete,
}) => {
  const router = useRouter();
  const { colors } = useTheme();
  const translateX = useSharedValue(0);
  const isDeleting = useSharedValue(false);
  const isGestureActive = useSharedValue(false);

  const handleDelete = useCallback(() => {
    onDelete(note.id);
  }, [note.id, onDelete]);

  const handlePress = useCallback(() => {
    router.push(`/note/${note.id}`);
  }, [router, note.id]);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      if (!isGestureActive.value && translateX.value === 0) {
        runOnJS(handlePress)();
      }
    });

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onStart(() => {
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      if (isDeleting.value) return;
      // Only allow left swipe
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (isDeleting.value) return;

      if (event.translationX < HARD_SWIPE_THRESHOLD) {
        // Hard swipe - immediate delete
        isDeleting.value = true;
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(handleDelete)();
        });
      } else if (event.translationX < SWIPE_THRESHOLD) {
        // Light swipe - reveal delete button
        translateX.value = withSpring(SWIPE_THRESHOLD, {
          damping: 30,
          stiffness: 300,
        });
      } else {
        // Release before threshold - spring back
        translateX.value = withSpring(0, {
          damping: 30,
          stiffness: 300,
        });
      }
    })
    .onFinalize(() => {
      isGestureActive.value = false;
    });

  // Race ensures only one gesture wins - pan takes precedence when swiping
  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -20 ? 1 : 0,
  }));

  return (
    <View style={styles.container}>
      {/* Delete button behind */}
      <Animated.View
        style={[
          styles.deleteButton,
          { backgroundColor: "#e94560" },
          deleteButtonStyle,
        ]}
      >
        <Pressable style={styles.deleteButtonContent} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="#ffffff" />
        </Pressable>
      </Animated.View>

      {/* Swipeable note content */}
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          style={[
            animatedStyle,
            styles.noteContainer,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <Text
            style={[styles.content, { color: colors.text }]}
            numberOfLines={2}
          >
            {truncateText(note.content)}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#e94560" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export const SwipeableNoteItem = React.memo(SwipeableNoteItemComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  noteContainer: {
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
