import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import SubscriptionStore from "../Store/SubscriptionStore";
import SubscriptionItem from "../components/SubscriptionItem";
import { MainScreenProps } from "../types";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const MainScreen: React.FC<MainScreenProps> = observer(
  ({ navigation, sortOption }) => {
    const { styles, theme } = useStyles(stylesheet);

    const renderPlaceholder = () => (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Поки у вас немає жодної підписки
        </Text>
      </View>
    );

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
      <View style={styles.container}>
        {SubscriptionStore.subscriptions.length === 0 ? (
          renderPlaceholder()
        ) : (
          <FlatList
            data={sortSubscriptions(
              [...SubscriptionStore.subscriptions],
              sortOption
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
  }
);

const stylesheet = createStyleSheet((theme) => {
  return {
    container: {
      flex: 1,
      padding: 20,
    },
    placeholderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      fontSize: 18,
      color: "#777",
    },
  };
});

export default MainScreen;
