import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';

import en from '~/locales/en.json';
import pl from '~/locales/pl.json';

const fewCondition = (count: number): boolean =>
  count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20);

const pluralizer = (count: number): [string] => {
  const key = count === 1 ? 'one' : fewCondition(count) ? 'few' : 'many';

  return [key];
};

I18n.defaultLocale = 'pl';
I18n.locale = RNLocalize.getLocales()[0].languageCode;
I18n.fallbacks = true;
I18n.translations = {
  pl,
  en,
};
I18n.pluralization['en'] = pluralizer;
I18n.pluralization['pl'] = pluralizer;

export default I18n;
