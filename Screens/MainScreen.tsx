import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import SubscriptionStore from "../Store/SubscriptionStore";
import SubscriptionItem from "../components/SubscriptionItem";
import { MainScreenProps } from "../types";

const MainScreen: React.FC<MainScreenProps> = observer(({ navigation }) => {
  // Функція для відображення плейсхолдера, якщо немає підписок
  const renderPlaceholder = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, color: "#777" }}>
        Поки у вас немає жодної підписки
      </Text>
    </View>
  );

  // Функція сортування підписок
  const sortSubscriptions = (subscriptions: any[], sortOption: string) => {
    switch (sortOption) {
      case "date":
        return subscriptions.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
      case "alphabet":
        return subscriptions.sort((a, b) => a.name.localeCompare(b.name));
      case "amount":
        return subscriptions.sort((a, b) => b.amount - a.amount);
      default:
        return subscriptions;
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {SubscriptionStore.subscriptions.length === 0 ? (
        renderPlaceholder()
      ) : (
        <FlatList
          data={sortSubscriptions(
            [...SubscriptionStore.subscriptions],
            "date" // за замовчуванням можна встановити сортування
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionItem
              subscription={item}
              onEdit={() =>
                navigation.navigate("EditSubscriptionScreen", {
                  subscriptionId: item.id,
                })
              }
            />
          )}
        />
      )}
    </View>
  );
});

export default MainScreen;
