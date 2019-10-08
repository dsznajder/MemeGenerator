import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { Platform } from 'react-native';

import { background, black, primary, secondary, white } from '~/styles/colors';

export const screenOptions = {
  headerStyleInterpolator: Platform.select({
    android: HeaderStyleInterpolators.forFade,
    ios: HeaderStyleInterpolators.forUIKit,
  }),
  cardStyleInterpolator: Platform.select({
    android: CardStyleInterpolators.forRevealFromBottomAndroid,
    ios: CardStyleInterpolators.forHorizontalIOS,
  }),
  headerStyle: {
    backgroundColor: primary,
    elevation: 10,
    shadowColor: black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardStyle: {
    backgroundColor: background,
  },
  gestureEnabled: true,
  cardOverlayEnabled: true,
  headerTintColor: white,
};

export const tabBarOptions = {
  activeTintColor: secondary,
  inactiveTintColor: `${white}af`,
  style: {
    backgroundColor: primary,
    elevation: 10,
    shadowColor: black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
};
