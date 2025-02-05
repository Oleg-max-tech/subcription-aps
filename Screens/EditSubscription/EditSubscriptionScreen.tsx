import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { EditSubscriptionScreenProps } from "../../types";
import SubscriptionStore from "../../Store/SubscriptionStore";
import { observer } from "mobx-react-lite";
import { useStyles } from "react-native-unistyles";
import { createStyleSheet } from "react-native-unistyles";
import PaymentCycleModal from "../AddSubscriptionScreen/ PaymentCycleModal"; // Імпортуємо модальне вікно циклу оплати
import CurrencyModal from "../AddSubscriptionScreen/CurrencyModal"; // Імпортуємо модальне вікно валюти

const EditSubscriptionScreen: React.FC<EditSubscriptionScreenProps> = observer(
  ({ route, navigation }) => {
    const { subscriptionId } = route.params;
    const subscription = SubscriptionStore.subscriptions.find(
      (sub) => sub.id === subscriptionId
    );

    const { styles, theme } = useStyles(stylesheet);
    const [title, setTitle] = useState(subscription?.title || "");
    const [amount, setAmount] = useState(subscription?.amount.toString() || "");
    const [category, setCategory] = useState(subscription?.category || "");
    const [nextPaymentDate, setNextPaymentDate] = useState(
      subscription?.nextPaymentDate || ""
    );
    const [paymentCycle, setPaymentCycle] = useState<"month" | "year" | "day">(
      subscription?.paymentCycle || "month"
    );
    const [currency, setCurrency] = useState(subscription?.currency || "UAH");

    const [isPaymentCycleModalVisible, setIsPaymentCycleModalVisible] =
      useState(false);
    const [isCurrencyModalVisible, setIsCurrencyModalVisible] = useState(false);

    useEffect(() => {
      if (subscription) {
        setTitle(subscription.title);
        setAmount(subscription.amount.toString());
        setCategory(subscription.category);
        setNextPaymentDate(subscription.nextPaymentDate);
        setPaymentCycle(subscription.paymentCycle);
        setCurrency(subscription.currency);
      }
    }, [subscription]);

    const handleEdit = () => {
      if (!title.trim() || !amount.trim() || !nextPaymentDate.trim()) {
        Alert.alert("Помилка", "Будь ласка, заповніть всі обов’язкові поля.");
        return;
      }

      const updatedSubscription = {
        id: subscriptionId,
        title,
        name: title, // Додано 'name' як у функції додавання
        amount: parseFloat(amount),
        category,
        nextPaymentDate,
        paymentCycle,
        currency,
      };

      SubscriptionStore.updateSubscription(updatedSubscription);
      navigation.goBack();
    };

    const handleDelete = () => {
      Alert.alert("Підтвердження", "Ви дійсно хочете видалити цю підписку?", [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          onPress: () => {
            SubscriptionStore.removeSubscription(subscriptionId);
            navigation.goBack();
          },
          style: "destructive",
        },
      ]);
    };

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Редагування підписки</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва"
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

          {/* Payment Cycle */}
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

          {/* Currency */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Валюта</Text>
            <TouchableWithoutFeedback
              onPress={() => setIsCurrencyModalVisible(true)}
            >
              <Text style={styles.pickerText}>{currency}</Text>
            </TouchableWithoutFeedback>
          </View>

          <Button title="Зберегти" onPress={handleEdit} />

          {/* Modals */}
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

          <View style={styles.deleteButtonContainer}>
            <Button title="Видалити" onPress={handleDelete} color="red" />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
);

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
  deleteButtonContainer: {
    marginTop: 20,
  },
}));

export default EditSubscriptionScreen;
