import React, { RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/core';

export const navigationRef: RefObject<
  NavigationContainerRef
> = React.createRef();
