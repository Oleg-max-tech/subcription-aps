import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface PaymentCycleModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: "month" | "year" | "day") => void;
}

const PaymentCycleModal: React.FC<PaymentCycleModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Виберіть цикл оплати</Text>
          <TouchableOpacity
            onPress={() => {
              onSelect("month");
              onClose();
            }}
          >
            <Text style={styles.modalOption}>Місяць</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSelect("year");
              onClose();
            }}
          >
            <Text style={styles.modalOption}>Рік</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSelect("day");
              onClose();
            }}
          >
            <Text style={styles.modalOption}>Число</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalClose}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalClose: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 20,
  },
}));

export default PaymentCycleModal;
