import analytics from '@react-native-firebase/analytics';

const Analytics = analytics();
Analytics.setAnalyticsCollectionEnabled(!__DEV__);

export const setCurrentScreen = async (screen: string) => {
  if (__DEV__) return;

  await Analytics.setCurrentScreen(screen, screen);
};

export const logEvent = (
  eventName: string,
  params: { [key: string]: string },
) => {
  if (__DEV__) return;

  Analytics.logEvent(eventName, params);
};

export default {
  Analytics,
};
