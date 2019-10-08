import { HeaderStyleInterpolators } from '@react-navigation/stack';

import { background, black, primary, secondary, white } from '~/styles/colors';

export const screenOptions = {
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  headerTintColor: white,
  headerStyle: {
    backgroundColor: primary,
    elevation: 10,
    shadowColor: black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardStyle: { backgroundColor: background },
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
