import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import SubscriptionStore from "../Store/SubscriptionStore";
import SubscriptionItem from "../components/SubscriptionItem";
import CustomHeader from "../CustomHeader";
import SortModal from "./SortModal";
import { MainScreenProps } from "../types";

const MainScreen: React.FC<MainScreenProps> = observer(({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");

  // Функція для відображення плейсхолдера, якщо немає підписок
  const renderPlaceholder = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, color: "#777" }}>
        Поки у вас немає жодної підписки
      </Text>
    </View>
  );

  // Функція для відкриття меню сортування
  const handleSortPress = () => {
    navigation.navigate("SortModal", {
      isVisible: true,
      onSortOption: handleSortOption,
      onClose: () => setModalVisible(false),
    });
  };

  // Обробка вибору сортування
  const handleSortOption = (option: string) => {
    setSortOption(option);
    setModalVisible(false); // Закриваємо модальне вікно після вибору
  };

  // Функція сортування підписок
  const sortSubscriptions = (subscriptions: any[]) => {
    switch (sortOption) {
      case "date":
        return subscriptions.sort((a, b) => {
          const dateA = new Date(a.date); // Перетворюємо в Date
          const dateB = new Date(b.date); // Перетворюємо в Date
          return dateB.getTime() - dateA.getTime(); // Порівнюємо дати
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
      {/* <CustomHeader navigation={navigation} onSortPress={handleSortPress} /> */}

      {SubscriptionStore.subscriptions.length === 0 ? (
        renderPlaceholder()
      ) : (
        <FlatList
          data={sortSubscriptions([...SubscriptionStore.subscriptions])} // Викликаємо сортування перед відображенням
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

      {/* Модальне вікно для сортування */}
      <SortModal
        isVisible={isModalVisible}
        onSortOption={handleSortOption}
        onClose={() => setModalVisible(false)} // Закриває модальне вікно
      />
    </View>
  );
});

export default MainScreen;
