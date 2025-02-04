import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import SubscriptionStore from "../Store/SubscriptionStore";
import SubscriptionItem from "../components/SubscriptionItem";
import { MainScreenProps } from "../types";

const MainScreen: React.FC<MainScreenProps> = observer(({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
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
      <Button
        title="Додати підписку"
        onPress={() => navigation.navigate("AddSubscriptionScreen")}
      />
    </View>
  );
});

export default MainScreen;
