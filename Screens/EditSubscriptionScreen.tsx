import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { EditSubscriptionScreenProps } from "../types";
import SubscriptionStore from "../Store/SubscriptionStore";

const EditSubscriptionScreen: React.FC<EditSubscriptionScreenProps> = ({
  route,
  navigation,
}) => {
  const { subscriptionId } = route.params;
  const subscription = SubscriptionStore.subscriptions.find(
    (sub) => sub.id === subscriptionId
  );

  const [title, setTitle] = useState(subscription?.title || "");

  const handleEdit = () => {
    if (subscription) {
      SubscriptionStore.updateSubscription({
        ...subscription,
        title,
      });
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Редагування підписки
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
        placeholder="Введіть назву підписки"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Зберегти" onPress={handleEdit} />
    </View>
  );
};

export default EditSubscriptionScreen;
