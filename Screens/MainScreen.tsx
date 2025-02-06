import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { observer } from "mobx-react-lite";
import SubscriptionStore from "../Store/SubscriptionStore";
import SubscriptionItem from "../components/SubscriptionItem";
import { MainScreenProps } from "../types";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { sortSubscriptions } from "./Modal/SortModal";

const MainScreen: React.FC<MainScreenProps> = observer(
  ({ navigation, sortOption }) => {
    const { styles, theme } = useStyles(stylesheet);

    const renderPlaceholder = () => (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>У вас поки що немає підписок</Text>
      </View>
    );

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
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() =>
                  navigation.navigate("EditSubscriptionScreen", {
                    subscriptionId: item.id,
                  })
                }
                activeOpacity={0.7}
              >
                <SubscriptionItem
                  subscription={item}
                  onEdit={() =>
                    navigation.navigate("EditSubscriptionScreen", {
                      subscriptionId: item.id,
                    })
                  }
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </View>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    fontWeight: "300",
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContainerPressed: {
    backgroundColor: "#f2f2f2",
    shadowOpacity: 0.2,
  },
}));

export default MainScreen;
