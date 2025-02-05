import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./Screens/MainScreen";
import AddSubscriptionScreen from "./Screens/AddSubscriptionScreen";
import EditSubscriptionScreen from "./Screens/EditSubscriptionScreen";
import { RootStackParamList } from "./types";
import CustomHeader from "./CustomHeader";
import { useState } from "react";
import SortModal from "./Screens/SortModal"; // Імпортуємо SortModal

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false); // Додаємо стан для відображення модалки
  const [sortOption, setSortOption] = useState<string>("");

  const onSortPress = () => {
    setModalVisible(true); // Відкриваємо модальне вікно сортування
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
    setModalVisible(false); // Закриваємо модальне вікно після вибору
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerLeft: () => (
              <CustomHeader
                navigation={navigation}
                onSortPress={onSortPress} // Передаємо функцію на натискання сортування
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddSubscriptionScreen"
          component={AddSubscriptionScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerRight: undefined,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="EditSubscriptionScreen"
          component={EditSubscriptionScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerRight: undefined,
          }}
        />
      </Stack.Navigator>

      {/* Модальне вікно для сортування */}
      <SortModal
        isVisible={isModalVisible}
        onSortOption={handleSortOption}
        onClose={() => setModalVisible(false)} // Закриваємо модальне вікно
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
