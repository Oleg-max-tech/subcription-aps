import { View, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { RootStackParamList } from "../types";

interface CustomHeaderProps<T extends ParamListBase> {
  navigation: StackNavigationProp<RootStackParamList>;
  onSortPress: () => void;
}

const CustomHeader = ({ navigation, onSortPress }: CustomHeaderProps<any>) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onSortPress} style={styles.iconContainerLeft}>
        <AntDesign name="menuunfold" size={24} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddSubscriptionScreen")}
        style={styles.iconContainerRight}
      >
        <Ionicons name="add" size={24} />
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
    width: "225%",
    paddingHorizontal: 15,
  },
  iconContainerLeft: {
    padding: 8,
    borderRadius: 8,
  },
  iconContainerRight: {
    padding: 8,
    borderRadius: 8,
  },
}));
