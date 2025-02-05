import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./Screens/MainScreen";
import AddSubscriptionScreen from "./Screens/AddSubscriptionScreen/AddSubscriptionScreen";
import EditSubscriptionScreen from "./Screens/EditSubscription/EditSubscriptionScreen";
import { RootStackParamList } from "./types";
import CustomHeader from "./components/CustomHeader";
import { useState } from "react";
import SortModal from "./Screens/SortModal";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string>("date");

  const onSortPress = () => {
    setModalVisible(true);
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
    setModalVisible(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          options={({ navigation }) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerLeft: () => (
              <CustomHeader navigation={navigation} onSortPress={onSortPress} />
            ),
          })}
        >
          {(props) => <MainScreen {...props} sortOption={sortOption} />}
        </Stack.Screen>
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
            presentation: "modal",
          }}
        />
      </Stack.Navigator>

      <SortModal
        isVisible={isModalVisible}
        onSortOption={handleSortOption}
        onClose={() => setModalVisible(false)}
      />
    </NavigationContainer>
  );
}
