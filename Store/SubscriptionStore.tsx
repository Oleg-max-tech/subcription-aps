import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubscriptionProps } from "../types";

class SubscriptionStore {
  subscriptions: SubscriptionProps[] = [];
  selectedCategory: string | null = null;
  sortByPrice: boolean = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "SubscriptionStore",
      properties: ["subscriptions"],
      storage: AsyncStorage,
    });
  }

  addSubscription(subscription: SubscriptionProps) {
    this.subscriptions.push(subscription);
  }

  updateSubscription(updatedSubscription: SubscriptionProps) {
    const index = this.subscriptions.findIndex(
      (sub) => sub.id === updatedSubscription.id
    );
    if (index !== -1) {
      this.subscriptions[index] = updatedSubscription;
    }
  }

  removeSubscription(id: string) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
  }

  resetSubscriptions() {
    this.subscriptions = [];
  }

  get filteredSubscriptions() {
    let subs = [...this.subscriptions];

    if (this.selectedCategory) {
      subs = subs.filter((sub) => sub.category === this.selectedCategory);
    }

    if (this.sortByPrice) {
      subs.sort((a, b) => a.amount - b.amount);
    }

    return subs;
  }

  setCategoryFilter(category: string | null) {
    this.selectedCategory = category;
  }

  toggleSortByPrice() {
    this.sortByPrice = !this.sortByPrice;
  }

  get totalExpense() {
    return this.subscriptions.reduce((total, sub) => total + sub.amount, 0);
  }
}

export default new SubscriptionStore();
