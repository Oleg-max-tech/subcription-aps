import { View, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { RootStackParamList } from "./types";

interface CustomHeaderProps<T extends ParamListBase> {
  navigation: StackNavigationProp<RootStackParamList>;
  onSortPress: () => void;
}

const CustomHeader = ({ navigation, onSortPress }: CustomHeaderProps<any>) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onSortPress} style={styles.iconContainer}>
        <AntDesign name="menuunfold" size={24} color={theme.header.text} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddSubscriptionScreen")}
        style={styles.iconContainer}
      >
        <Ionicons name="add" size={24} color={theme.header.text} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const stylesheet = createStyleSheet((theme) => ({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
}));
