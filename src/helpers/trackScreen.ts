import React from 'react';

import { navigationRef } from '~/services/Navigation';
import { setCurrentScreen } from '~/services/Firebase';

const routeNameRef: { current: string } = React.createRef();

const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

export default () => {
  const navigation = navigationRef.current;

  if (navigation) {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(navigation.getRootState());

    if (previousRouteName !== currentRouteName) {
      setCurrentScreen(currentRouteName);
    }

    routeNameRef.current = currentRouteName;
  }
};
