import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SortModalProps } from "../types";
import { createStyleSheet } from "react-native-unistyles";
import { useStyles } from "react-native-unistyles";

const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onSortOption,
  onClose,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Сортувати за:</Text>

          <TouchableOpacity onPress={() => onSortOption("date")}>
            <Text style={styles.optionText}>Дата додавання</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSortOption("alphabet")}>
            <Text style={styles.optionText}>Алфавіт</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSortOption("amount")}>
            <Text style={styles.optionText}>Сума платежу</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      padding: 20,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    optionText: {
      paddingVertical: 10,
    },
    closeButton: {
      marginTop: 20,
      alignItems: "center",
    },
    closeButtonText: {
      color: "red",
    },
  };
});
export default SortModal;
