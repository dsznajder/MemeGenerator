import { AsyncStorage } from 'react-native';

const __APP_STORAGE_KEY = `@MemeGeneratorStorage:`;

export default {
  get: (key: string) => AsyncStorage.getItem(`${__APP_STORAGE_KEY}${key}`),
  set: (key: string, value: string) =>
    AsyncStorage.setItem(`${__APP_STORAGE_KEY}${key}`, value),
};
