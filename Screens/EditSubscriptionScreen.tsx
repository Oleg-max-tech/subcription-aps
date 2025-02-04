import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { EditSubscriptionScreenProps } from "../types";
import SubscriptionStore from "../Store/SubscriptionStore";
import { observer } from "mobx-react-lite";

const EditSubscriptionScreen: React.FC<EditSubscriptionScreenProps> = observer(
  ({ route, navigation }) => {
    const { subscriptionId } = route.params;
    const subscription = SubscriptionStore.subscriptions.find(
      (sub) => sub.id === subscriptionId
    );

    const [title, setTitle] = useState(subscription?.title || "");
    const [amount, setAmount] = useState(subscription?.amount.toString() || "");
    const [category, setCategory] = useState(subscription?.category || "");
    const [nextPaymentDate, setNextPaymentDate] = useState(
      subscription?.nextPaymentDate || ""
    );

    useEffect(() => {
      if (subscription) {
        setTitle(subscription.title);
        setAmount(subscription.amount.toString());
        setCategory(subscription.category);
        setNextPaymentDate(subscription.nextPaymentDate);
      }
    }, [subscription]);

    const handleEdit = () => {
      if (subscription) {
        SubscriptionStore.updateSubscription({
          ...subscription,
          title,
          amount: parseFloat(amount),
          category,
          nextPaymentDate,
        });
        navigation.goBack();
      }
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
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Редагування підписки
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Назва"
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
        <Button title="Зберегти" onPress={handleEdit} />
        <View style={{ marginTop: 20 }}>
          <Button title="Видалити" onPress={handleDelete} color="red" />
        </View>
      </View>
    );
  }
);

const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
};

export default EditSubscriptionScreen;
