import Animated from 'react-native-reanimated';
import RNFS from 'react-native-fs';
import React, { RefObject, useReducer, useRef } from 'react';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/core';
import { clamp, onGestureEvent, withOffset } from 'react-native-redash';
import { range } from 'lodash';

import { RootParamList } from '~/types/scenes';
import { black, primary, white } from '~/styles/colors';

import { MemeCreatorActions, MemeCreatorState } from './types';

const { width } = Dimensions.get('window');

type MemeCreatorRouteProp = RouteProp<RootParamList, 'MemeCreator'>;

interface Props {
  route: MemeCreatorRouteProp;
}

const ACTION_TYPES: {
  setCreatedMeme: 'setCreatedMeme';
  changeLine: 'changeLine';
} = {
  setCreatedMeme: 'setCreatedMeme',
  changeLine: 'changeLine',
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

    default:
      return state;
  }
};

const MemeCreator = ({ route }: Props) => {
  const viewShowRef: RefObject<ViewShot> = useRef();
  const { meme } = route.params;
  const boxes = useRef(range(meme.boxCount));
  const [{ createdMeme, lines }, dispatch] = useReducer(reducer, {
    createdMeme: '',
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
      const state = new Animated.Value(0);
      const translationX = new Animated.Value(0);
      const translationY = new Animated.Value(0);
      const gestureEvent = onGestureEvent({
        state,
        translationY,
        translationX,
      });
      return {
        translateY: clamp(
          withOffset(translationY, state),
          -10 - index * 30,
          imageHeight.current - (index + 1) * 30,
        ),
        translateX: clamp(
          withOffset(translationX, state),
          -imageWidth.current / 2,
          imageWidth.current / 2,
        ),
        gestureEvent,
      };
    }),
  );

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
        console.log('shared');
      })
      .catch(() => {
        console.log('dismissed');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {createdMeme ? (
        <>
          <Image
            resizeMode="contain"
            source={{ uri: createdMeme }}
            style={imageStyle}
          />
          <Button title="Udostępnij" color={primary} onPress={shareMeme} />
        </>
      ) : (
        <>
          <ViewShot options={{ format: 'jpg', quality: 0.9 }} ref={viewShowRef}>
            <ImageBackground
              resizeMode="contain"
              source={{ uri: meme.url }}
              style={imageStyle}
            >
              {boxes.current.map(index => {
                const {
                  gestureEvent,
                  translateY,
                  translateX,
                } = gestureHandlers.current[index];
                return (
                  <PanGestureHandler {...gestureEvent} key={index}>
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
                      <Text style={styles.text}>{lines[index]}</Text>
                    </Animated.View>
                  </PanGestureHandler>
                );
              })}
            </ImageBackground>
          </ViewShot>

          {boxes.current.map((line, index) => (
            <TextInput
              key={line}
              value={lines[index]}
              placeholder={`${line}`}
              onChangeText={text =>
                dispatch({
                  type: ACTION_TYPES.changeLine,
                  payload: {
                    line: text,
                    index,
                  },
                })
              }
            />
          ))}
          <Button color={primary} onPress={saveMeme} title="Zapisz mem" />
        </>
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
  textContainer: {
    alignSelf: 'center',
    position: 'absolute',
  },
});
