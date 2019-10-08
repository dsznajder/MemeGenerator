import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const DEVICE_WIDTH = deviceWidth;
export const DEVICE_HEIGHT = deviceHeight;
