import Animated from 'react-native-reanimated';
import React, { useRef } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { timing } from 'react-native-redash';
import { useMemoOne } from 'use-memo-one';

import { white } from '~/styles/colors';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  rippleColor?: string;
  rippleDuration?: number;
  rippleRadius?: number;
  rippleOpacity?: number;
};

const { Value, divide, set, interpolate, useCode, block } = Animated;

const Button = ({
  color,
  label,
  onPress,
  rippleDuration = 300,
  rippleRadius = 5,
  rippleColor = '#000',
  rippleOpacity = 0.3,
}: Props) => {
  const buttonLayout = useRef({
    width: 0,
    height: 0,
  });

  const { maxRippleRadius, opacity, scale, x, y, progress } = useMemoOne(() => {
    const progress = new Value<number>(0);
    const maxRippleRadius = new Value<number>(0);

    return {
      progress,
      maxRippleRadius,
      x: new Value<number>(0),
      y: new Value<number>(0),
      opacity: interpolate(progress, {
        inputRange: [0, Number.EPSILON, 1],
        outputRange: [0, rippleOpacity, 0],
      }),
      scale: interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [rippleRadius * 2, divide(maxRippleRadius, rippleRadius)],
      }),
    };
  }, []);

  useCode(
    () =>
      block([
        set(
          progress,
          timing({
            from: 0,
            to: 1,
            duration: rippleDuration,
          }),
        ),
      ]),
    [],
  );

  const animateRipple = ({
    locationX,
    locationY,
  }: {
    locationX: number;
    locationY: number;
  }) => {
    const { width, height } = buttonLayout.current;
    const halfOfWidth = width / 2;
    const halfOfHeight = height / 2;
    const offsetX = Math.abs(halfOfWidth - locationX);
    const offsetY = Math.abs(halfOfHeight - locationY);

    maxRippleRadius.setValue(
      Math.sqrt(
        Math.pow(halfOfWidth + offsetX, 2) +
          halfOfHeight +
          Math.pow(offsetY, 2),
      ),
    );
    x.setValue(locationX - rippleRadius);
    y.setValue(locationY - rippleRadius);
  };

  const handleLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    buttonLayout.current = {
      width: layout.width,
      height: layout.height,
    };
  };

  const handlePress = ({ nativeEvent }: GestureResponderEvent) => {
    animateRipple(nativeEvent);
    onPress && onPress();
  };

  return (
    <TouchableWithoutFeedback onLayout={handleLayout} onPress={handlePress}>
      <View
        pointerEvents="box-only"
        style={[styles.container, { backgroundColor: color }]}
      >
        <Text style={styles.label}>{label}</Text>

        <View style={styles.rippleContainer}>
          <Animated.View
            // @ts-ignore
            style={[
              styles.ripple,
              {
                top: y,
                left: x,
                backgroundColor: rippleColor,
                opacity,
                transform: [
                  {
                    scale,
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;

const RIPPLE_SIZE = 5;

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: 24,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    overflow: 'hidden',
    position: 'absolute',
    width: RIPPLE_SIZE * 2,
    height: RIPPLE_SIZE * 2,
    borderRadius: RIPPLE_SIZE,
  },
  label: {
    color: white,
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});
