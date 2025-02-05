import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { SortModalProps } from "../types";
import { SortModalScreenProps } from "../types";

const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onSortOption,
  onClose,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Сортувати за:
          </Text>

          <TouchableOpacity onPress={() => onSortOption("date")}>
            <Text style={{ paddingVertical: 10 }}>Дата додавання</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSortOption("alphabet")}>
            <Text style={{ paddingVertical: 10 }}>Алфавіт</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSortOption("amount")}>
            <Text style={{ paddingVertical: 10 }}>Сума платежу</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={{ marginTop: 20, alignItems: "center" }}
          >
            <Text style={{ color: "red" }}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;
