import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  View,
} from "react-native";
import { AddSubscriptionScreenProps } from "../../types";
import SubscriptionStore from "../../Store/SubscriptionStore";
import { useStyles } from "react-native-unistyles";
import { createStyleSheet } from "react-native-unistyles";
import PaymentCycleModal from "./ PaymentCycleModal";
import CurrencyModal from "./CurrencyModal";

const AddSubscriptionScreen: React.FC<AddSubscriptionScreenProps> = ({
  navigation,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [paymentCycle, setPaymentCycle] = useState<"month" | "year" | "day">(
    "month"
  );
  const [currency, setCurrency] = useState("UAH");

  const [isPaymentCycleModalVisible, setIsPaymentCycleModalVisible] =
    useState(false);
  const [isCurrencyModalVisible, setIsCurrencyModalVisible] = useState(false);

  const { styles } = useStyles(stylesheet);

  const handleAdd = () => {
    if (!title.trim() || !amount.trim() || !nextPaymentDate.trim()) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі обов’язкові поля.");
      return;
    }

    const newSubscription = {
      id: Date.now().toString(),
      title,
      name: title,
      amount: parseFloat(amount),
      category,
      nextPaymentDate,
      paymentCycle,
      currency,
    };

    SubscriptionStore.addSubscription(newSubscription);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Нова підписка</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Введіть назву підписки"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Вартість"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Категорія"
            value={category}
            onChangeText={setCategory}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Дата наступної оплати (YYYY-MM-DD)"
            value={nextPaymentDate}
            onChangeText={setNextPaymentDate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Цикл оплати</Text>
          <TouchableWithoutFeedback
            onPress={() => setIsPaymentCycleModalVisible(true)}
          >
            <Text style={styles.pickerText}>
              {paymentCycle === "month"
                ? "Місяць"
                : paymentCycle === "year"
                ? "Рік"
                : "Число"}
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Валюта</Text>
          <TouchableWithoutFeedback
            onPress={() => setIsCurrencyModalVisible(true)}
          >
            <Text style={styles.pickerText}>{currency}</Text>
          </TouchableWithoutFeedback>
        </View>

        <Button title="Додати" onPress={handleAdd} />

        <PaymentCycleModal
          visible={isPaymentCycleModalVisible}
          onClose={() => setIsPaymentCycleModalVisible(false)}
          onSelect={setPaymentCycle}
        />

        <CurrencyModal
          visible={isCurrencyModalVisible}
          onClose={() => setIsCurrencyModalVisible(false)}
          onSelect={setCurrency}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
}));

export default AddSubscriptionScreen;
