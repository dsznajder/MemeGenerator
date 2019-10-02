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
import { range } from 'lodash';

import { RootParamList } from '~/types/scenes';
import { black, primary, white } from '~/styles/colors';

import { MemeCreatorActions, MemeCreatorState } from './types';

const { width } = Dimensions.get('window');

type MemeCreatorRouteProp = RouteProp<RootParamList, 'MemeCreator'>;

interface Props {
  route: MemeCreatorRouteProp;
}

const ACTION_TYPES: { setCreatedMeme: 'setCreatedMeme'; changeLine: 'changeLine' } = {
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
  const { meme } = route.params;
  const boxes = range(meme.boxCount);

  const [{ createdMeme, lines }, dispatch] = useReducer(reducer, {
    createdMeme: '',
    lines: boxes.map(i => `${i + 1} line`),
  });
  const viewShowRef: RefObject<ViewShot> = useRef();
  const imageStyle = { width: Math.min(meme.width, width), height: Math.min(meme.height, width) };

  const saveMeme = () => {
    viewShowRef.current.capture().then(path => {
      RNFS.readFile(path, 'base64').then(image => {
        dispatch({ type: ACTION_TYPES.setCreatedMeme, payload: `data:image/jpg;base64,${image}` });
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
          <Image source={{ uri: createdMeme }} style={imageStyle} />
          <Button title="Udostępnij" color={primary} onPress={shareMeme} />
        </>
      ) : (
        <>
          <ViewShot options={{ format: 'jpg', quality: 0.9 }} ref={viewShowRef}>
            <ImageBackground source={{ uri: meme.url }} style={imageStyle}>
              {lines.map(line => (
                <PanGestureHandler key={line}>
                  <Text style={styles.text}>{line}</Text>
                </PanGestureHandler>
              ))}
            </ImageBackground>
          </ViewShot>
          {boxes.map((line, index) => (
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
});
