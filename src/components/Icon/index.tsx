// @flow

import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import { black } from '~/styles/colors';

import icoMoonConfig from './selection.json';

const FontIcon = createIconSetFromIcoMoon(icoMoonConfig);

type Props = {
  color?: string;
  name: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

const Icon = ({ size = 22, color = black, name, style }: Props) => (
  <FontIcon color={color} name={name} size={size} style={style} />
);

export default React.memo<Props>(Icon);
