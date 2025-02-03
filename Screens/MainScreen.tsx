import React from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useStyles } from "react-native-unistyles";
import { createStyleSheet } from "react-native-unistyles";

const MainScreen: React.FC<any> = observer(({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the main screen!</Text>
      {/* Your other UI components */}
    </View>
  );
});
