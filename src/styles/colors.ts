import { Platform } from 'react-native';

export const black = '#000000';
export const white = '#FFFFFF';
export const transparent = 'transparent';

export const error = '#D23A4B';
export const success = '#37B487';
export const warning = '#E7BE33';
export const fontPlaceholderColor = '#DBDBDB';

export const secondary = '#E06764';
export const background = '#302B32';
export const primary = Platform.select({
  android: '#231e26',
  ios: '#2B262D',
});
