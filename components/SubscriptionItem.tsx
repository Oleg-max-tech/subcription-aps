import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

interface SubscriptionItemProps {
  subscription: {
    id: string;
    title: string;
    amount: number;
    nextPaymentDate: string;
    currency: string; // додано поле для валюти
  };
  onEdit: () => void;
}

// Об'єкт відповідності назв компаній і їхніх іконок
const companyIcons: { [key: string]: JSX.Element } = {
  youtube: <FontAwesome name="youtube-play" size={24} color="red" />,
  netflix: <MaterialCommunityIcons name="netflix" size={24} color="red" />,
  spotify: <FontAwesome name="spotify" size={24} color="green" />,
  amazon: <FontAwesome name="amazon" size={24} color="orange" />,
  apple: <FontAwesome name="apple" size={24} color="black" />,
  microsoft: <MaterialCommunityIcons name="microsoft" size={24} color="blue" />,
  playstation: <FontAwesome5 name="playstation" size={24} color="black" />,
  xbox: <FontAwesome5 name="xbox" size={24} />,
  telegram: <FontAwesome name="telegram" size={24} />,
  viber: <FontAwesome5 name="viber" size={24} />,
  google: <AntDesign name="google" size={24} />,
  adobe: <Fontisto name="adobe" size={24} />,
  ubisoft: <MaterialCommunityIcons name="ubisoft" size={24} />,
  nintendo: <MaterialCommunityIcons name="nintendo-game-boy" size={24} />,
  uber: <FontAwesome5 name="uber" size={24} />,
  deezer: <FontAwesome5 name="deezer" size={24} />,
  battle: <FontAwesome5 name="battle-net" size={24} />,
  scribd: <Entypo name="scribd" size={24} />,
  steam: <FontAwesome5 name="steam" size={24} />,
};

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  subscription,
  onEdit,
}) => {
  // Визначаємо іконку для підписки, якщо є в списку
  const icon = companyIcons[subscription.title.toLowerCase()] || (
    <Feather name="credit-card" size={24} color="#888" />
  );

  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {icon}
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {subscription.title}
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
            {subscription.amount} {subscription.currency} •{" "}
            {subscription.nextPaymentDate}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onEdit} style={{ padding: 8 }}>
        <Feather name="edit-2" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionItem;
