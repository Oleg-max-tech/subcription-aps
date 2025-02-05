import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  MainScreen: undefined;
  AddSubscriptionScreen: undefined;
  EditSubscriptionScreen: { subscriptionId: string };
  SortModal: SortModalProps;
};

export type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainScreen"
>;

export interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

export type AddSubscriptionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddSubscriptionScreen"
>;

export interface AddSubscriptionScreenProps {
  navigation: AddSubscriptionScreenNavigationProp;
}
export type EditSubscriptionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditSubscriptionScreen"
>;

export type EditSubscriptionScreenRouteProp = RouteProp<
  RootStackParamList,
  "EditSubscriptionScreen"
>;
export interface EditSubscriptionScreenProps {
  navigation: EditSubscriptionScreenNavigationProp;
  route: EditSubscriptionScreenRouteProp;
}

export interface SubscriptionProps {
  id: string;
  title: string;
  name: string;
  amount: number;
  category: string;
  nextPaymentDate: string;
}

export interface SortModalProps {
  isVisible: boolean;
  onSortOption: (option: string) => void;
  onClose: () => void;
}
