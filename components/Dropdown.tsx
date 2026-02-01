import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";

export interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.option,
        isSelected && { backgroundColor: colors.accent + "20" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionText,
          { color: isSelected ? colors.accent : colors.text },
        ]}
      >
        {label}
      </Text>
      {isSelected && (
        <Ionicons name="checkmark" size={20} color={colors.accent} />
      )}
    </Pressable>
  );
};

interface DropdownProps<T> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

export function Dropdown<T>({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: DropdownProps<T>) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: T) => {
    onChange(selectedValue);
    setVisible(false);
  };

  return (
    <>
      <Pressable
        style={[styles.trigger, { backgroundColor: colors.cardBackground }]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.triggerText, { color: colors.text }]}>
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name={visible ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setVisible(false)}
          />
          <View
            style={[
              styles.optionsContainer,
              { backgroundColor: colors.background },
            ]}
          >
            {options.map((option) => (
              <DropdownItem
                key={String(option.value)}
                label={option.label}
                isSelected={option.value === value}
                onPress={() => handleSelect(option.value)}
              />
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.sm,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    width: "80%",
    maxWidth: 320,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  optionText: {
    fontSize: 16,
  },
});
