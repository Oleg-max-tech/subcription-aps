import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubscriptionProps } from "../types";

class SubscriptionStore {
  subscriptions: SubscriptionProps[] = [];
  hydrated = false; // Перевірка, чи завантажені дані

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "SubscriptionStore",
      properties: ["subscriptions"],
      storage: AsyncStorage,
    }).then(() => {
      runInAction(() => {
        this.hydrated = true;
      });
    });
  }

  addSubscription(subscription: SubscriptionProps) {
    runInAction(() => {
      this.subscriptions.push(subscription);
    });
  }

  updateSubscription(updatedSubscription: SubscriptionProps) {
    runInAction(() => {
      const index = this.subscriptions.findIndex(
        (sub) => sub.id === updatedSubscription.id
      );
      if (index !== -1) {
        this.subscriptions[index] = updatedSubscription;
      }
    });
  }

  removeSubscription(id: string) {
    runInAction(() => {
      this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
    });
  }

  resetSubscriptions() {
    runInAction(() => {
      this.subscriptions = [];
    });
  }

  get totalExpense() {
    return this.subscriptions.reduce((total, sub) => total + sub.amount, 0);
  }

  async hydrateStore() {
    await makePersistable(this, {
      name: "SubscriptionStore",
      properties: ["subscriptions"],
      storage: AsyncStorage,
    });
  }
}

export default new SubscriptionStore();
