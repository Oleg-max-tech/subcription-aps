import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { AddSubscriptionScreenProps } from "../types";
import { SubscriptionProps } from "../types";
import SubscriptionStore from "../Store/SubscriptionStore";

const AddSubscriptionScreen: React.FC<AddSubscriptionScreenProps> = ({
  navigation,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [nextPaymentDate, setNextPaymentDate] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !amount.trim() || !nextPaymentDate.trim()) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі обов’язкові поля.");
      return;
    }

    const newSubscription: SubscriptionProps = {
      id: Date.now().toString(),
      title,
      name: title,
      amount: parseFloat(amount),
      category,
      nextPaymentDate,
    };

    SubscriptionStore.addSubscription(newSubscription);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Нова підписка</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть назву підписки"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Вартість"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Категорія"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Дата наступної оплати (YYYY-MM-DD)"
          value={nextPaymentDate}
          onChangeText={setNextPaymentDate}
        />
        <Button title="Додати" onPress={handleAdd} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
};

export default AddSubscriptionScreen;
