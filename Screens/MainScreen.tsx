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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CustomHeader navigation={navigation} onSortPress={handleSortPress} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Мої підписки</Text>
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
    </View>
  );
});

export default MainScreen;
