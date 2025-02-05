import React from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import SubscriptionStore from "../Store/SubscriptionStore";
import SubscriptionItem from "../components/SubscriptionItem";
import CustomHeader from "../CustomHeader";
import { MainScreenProps } from "../types";

const MainScreen: React.FC<MainScreenProps> = observer(({ navigation }) => {
  const handleSortPress = () => {
    console.log("Відкрито меню сортування");
    // Додай тут логіку відкриття меню сортування
  };

  const renderPlaceholder = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, color: "#777" }}>
        Поки у вас немає жодної підписки
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {SubscriptionStore.subscriptions.length === 0 ? (
        renderPlaceholder()
      ) : (
        <FlatList
          data={[...SubscriptionStore.subscriptions]}
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
          extraData={SubscriptionStore.subscriptions.length}
        />
      )}
    </View>
  );
});

export default MainScreen;
