import AsyncStorage from '@react-native-community/async-storage';

const __APP_STORAGE_KEY = `@MemeGeneratorStorage:`;

type StorageKeys = {
  favourites: 'favourites';
};

const keys: StorageKeys = {
  favourites: 'favourites',
};

export default {
  get: (key: keyof StorageKeys): Promise<string> =>
    AsyncStorage.getItem(`${__APP_STORAGE_KEY}${key}`),
  set: (key: keyof StorageKeys, value: string): Promise<void> =>
    AsyncStorage.setItem(`${__APP_STORAGE_KEY}${key}`, value),

  removeFromArray: async (
    key: keyof StorageKeys,
    value: string,
  ): Promise<void> => {
    const storageKey = `${__APP_STORAGE_KEY}${key}`;
    const items = JSON.parse(await AsyncStorage.getItem(storageKey)) || [];

    return AsyncStorage.setItem(
      storageKey,
      JSON.stringify(
        items.filter(item => {
          return typeof item === 'string' ? item !== value : item.id !== value;
        }),
      ),
    );
  },

  addToArray: async (
    key: keyof StorageKeys,
    value: { id: string },
  ): Promise<void> => {
    const storageKey = `${__APP_STORAGE_KEY}${key}`;
    const items = JSON.parse(await AsyncStorage.getItem(storageKey)) || [];
    return AsyncStorage.setItem(storageKey, JSON.stringify([...items, value]));
  },

  keys,
};
