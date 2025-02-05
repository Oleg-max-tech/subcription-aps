import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./Screens/MainScreen";
import AddSubscriptionScreen from "./Screens/AddSubscriptionScreen";
import EditSubscriptionScreen from "./Screens/EditSubscriptionScreen";
import { RootStackParamList } from "./types";
import CustomHeader from "./CustomHeader"; // Потрібно додати CustomHeader компонент

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const onSortPress = () => {
    console.log("Sort button pressed");
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
              backgroundColor: "#fff", // Заміни на тему, якщо потрібно
            },
            headerLeft: () => (
              <CustomHeader
                navigation={navigation}
                onSortPress={onSortPress} // Передаємо onSortPress
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddSubscriptionScreen"
          component={AddSubscriptionScreen}
          options={({ navigation }) => {
            return {
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerRight: undefined,
              presentation: "modal",
            };
          }} // Якщо хочеш приховати хедер
        />
        <Stack.Screen
          name="EditSubscriptionScreen"
          component={EditSubscriptionScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#fff", // Заміни на тему, якщо потрібно
            },
            headerRight: () => (
              <CustomHeader
                navigation={navigation}
                onSortPress={onSortPress} // Передаємо onSortPress
              />
            ),
          })}
        />
      </Stack.Navigator>
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
