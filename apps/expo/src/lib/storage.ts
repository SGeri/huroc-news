import AsyncStorage from "@react-native-async-storage/async-storage";

type Item = {
  "onboarding-notifications": string;
  "onboarding-done": boolean;
  "user-id": string;
};

async function getItem(key: keyof Item) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("catch", e);
    throw new Error("Nem sikerült elérni az adatokat a háttértárból!");
  }
}

async function setItem<K extends keyof Item, V extends Item[K]>(
  key: K,
  value: V,
) {
  try {
    await AsyncStorage.setItem(key, String(value));
  } catch (e) {
    throw new Error("Nem sikerült elmenteni az adatokat a háttértárba!");
  }
}

async function removeItem(key: keyof Item) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error("Nem sikerült törölni az adatokat a háttértárból!");
  }
}

export { AsyncStorage, getItem, setItem, removeItem };
