import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';
import React, { RefObject, useReducer, useRef } from 'react';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import {
  BaseButton,
  PanGestureHandler,
  PinchGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  clamp,
  onGestureEvent,
  preserveMultiplicativeOffset,
  withOffset,
} from 'react-native-redash';
import { range } from 'lodash';

import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Input from '~/components/Input';
import Storage from '~/services/Storage';
import { black, primary, secondary, white } from '~/styles/colors';
import { logEvent } from '~/services/Firebase';

import {
  MemeCreatorActions,
  MemeCreatorRouteProp,
  MemeCreatorState,
} from './types';

const { width } = Dimensions.get('window');
const { Value } = Animated;

interface Props {
  route: MemeCreatorRouteProp;
}

const ACTION_TYPES: {
  setCreatedMeme: 'setCreatedMeme';
  changeLine: 'changeLine';
  toggleFavourite: 'toggleFavourite';
} = {
  setCreatedMeme: 'setCreatedMeme',
  changeLine: 'changeLine',
  toggleFavourite: 'toggleFavourite',
};

const reducer = (state: MemeCreatorState, action: MemeCreatorActions) => {
  switch (action.type) {
    case ACTION_TYPES.changeLine:
      return {
        ...state,
        lines: state.lines.map((line, index) =>
          index === action.payload.index ? action.payload.line : line,
        ),
      };

    case ACTION_TYPES.setCreatedMeme:
      return { ...state, createdMeme: action.payload };

    case ACTION_TYPES.toggleFavourite:
      return { ...state, favourite: !state.favourite };

    default:
      return state;
  }
};

const MemeCreator = ({ route }: Props) => {
  const { meme } = route.params;
  const viewShowRef: RefObject<ViewShot> = useRef();
  const boxes = useRef(range(meme.boxCount));
  const panRefs = boxes.current.map(useRef);
  const pinchRefs = boxes.current.map(useRef);
  const [{ createdMeme, lines, favourite }, dispatch] = useReducer(reducer, {
    createdMeme: '',
    favourite: meme.favourite,
    lines: boxes.current.map(i => `${i + 1} line`),
  });

  const imageWidth = useRef(Math.min(meme.width, width - 20));
  const imageHeight = useRef(imageWidth.current * (meme.height / meme.width));
  const imageStyle = {
    width: imageWidth.current,
    height: imageHeight.current,
  };

  const gestureHandlers = useRef(
    boxes.current.map(index => {
      const panState = new Value(0);
      const pinchState = new Value(0);
      const translationX = new Value(0);
      const translationY = new Value(0);
      const pinchScale = new Value(1);
      const panGestureEvent = onGestureEvent({
        state: panState,
        translationY,
        translationX,
      });
      const pinchGestureEvent = onGestureEvent({
        state: pinchState,
        scale: pinchScale,
      });

      return {
        translateY: clamp(
          withOffset(translationY, panState),
          -10 - index * 30,
          imageHeight.current - (index + 1) * 30,
        ),
        translateX: clamp(
          withOffset(translationX, panState),
          -imageWidth.current / 2,
          imageWidth.current / 2,
        ),
        scale: clamp(
          preserveMultiplicativeOffset(pinchScale, pinchState),
          1,
          3,
        ),
        panGestureEvent,
        panRef: panRefs[index],
        pinchGestureEvent,
        pinchRef: pinchRefs[index],
      };
    }),
  );

  const toggleFavourite = () => {
    if (favourite) {
      Storage.removeFromArray(Storage.keys.favourites, meme.id);
    } else {
      logEvent('added_to_favourites', { name: meme.name });
      Storage.addToArray(Storage.keys.favourites, meme);
    }
    dispatch({ type: ACTION_TYPES.toggleFavourite });
  };

  const saveMeme = () => {
    viewShowRef.current.capture().then(path => {
      RNFS.readFile(path, 'base64').then(image => {
        dispatch({
          type: ACTION_TYPES.setCreatedMeme,
          payload: `data:image/jpg;base64,${image}`,
        });
      });
    });
  };

  const shareMeme = () => {
    Share.open({ url: createdMeme })
      .then(() => {
        logEvent('meme_shared', { name: meme.name });
      })
      .catch(() => {
        logEvent('share_menu_dismissed', { name: meme.name });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BaseButton onPress={toggleFavourite}>
        <Icon
          color="red"
          name={favourite ? 'heart' : 'heart-outlined'}
          size={36}
        />
      </BaseButton>

      {createdMeme ? (
        <>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: createdMeme }}
            style={imageStyle}
          />
          <Button color={primary} label="Udostępnij" onPress={shareMeme} />
        </>
      ) : (
        <View>
          <ViewShot options={{ format: 'jpg', quality: 0.9 }} ref={viewShowRef}>
            <FastImage
              resizeMode={FastImage.resizeMode.stretch}
              source={{
                cache: FastImage.cacheControl.immutable,
                uri: meme.url,
              }}
              style={imageStyle}
            />

            {boxes.current.map(index => {
              const {
                panGestureEvent,
                pinchGestureEvent,
                translateY,
                translateX,
                scale,
                panRef,
                pinchRef,
              } = gestureHandlers.current[index];
              return (
                <PanGestureHandler
                  {...panGestureEvent}
                  key={index}
                  simultaneousHandlers={pinchRef}
                >
                  <Animated.View
                    // @ts-ignore
                    style={[
                      styles.textContainer,
                      {
                        top: index * 30,
                        transform: [{ translateX }, { translateY }],
                      },
                    ]}
                  >
                    <PinchGestureHandler
                      {...pinchGestureEvent}
                      simultaneousHandlers={panRef}
                    >
                      <Animated.Text
                        // @ts-ignore
                        style={[styles.text, { transform: [{ scale }] }]}
                      >
                        {lines[index]}
                      </Animated.Text>
                    </PinchGestureHandler>
                  </Animated.View>
                </PanGestureHandler>
              );
            })}
          </ViewShot>

          {boxes.current.map((line, index) => (
            <View key={line} style={styles.inputContainer}>
              <Input
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={text =>
                  dispatch({
                    type: ACTION_TYPES.changeLine,
                    payload: {
                      line: text,
                      index,
                    },
                  })
                }
                placeholder={`${line}`}
                value={lines[index]}
              />
            </View>
          ))}

          <Button color={secondary} label="Zapisz mem" onPress={saveMeme} />
        </View>
      )}
    </ScrollView>
  );
};

export default MemeCreator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: white,
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: black,
    textShadowRadius: 4,
  },
  inputContainer: {
    padding: 10,
  },
  textContainer: {
    alignSelf: 'center',
    position: 'absolute',
  },
});
