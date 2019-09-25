import RNFS from 'react-native-fs';
import React, { RefObject, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  TextInput as Input,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { RouteProp } from '@react-navigation/core';

/* eslint-disable import/default, import/no-unresolved, import/namespace */
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
/* eslint-enable */

import { RootParamList } from '~/types/scenes';
import { black, primary, white } from '~/styles/colors';

const { width } = Dimensions.get('window');

type MemeCreatorRouteProp = RouteProp<RootParamList, 'MemeCreator'>;

interface Props {
  route: MemeCreatorRouteProp;
}

const MemeCreator = ({ route }: Props) => {
  const [firstLine, setFirstLine] = useState('');
  const [secondLine, setSecondLine] = useState('');
  const [createdMeme, setCreatedMeme] = useState('');
  const { meme } = route.params;
  const viewShowRef: RefObject<ViewShot> = useRef();
  const imageStyle = { width: Math.min(meme.width, width), height: Math.min(meme.height, width) };

  const saveMeme = () => {
    viewShowRef.current.capture().then(path => {
      RNFS.readFile(path, 'base64').then(image => {
        setCreatedMeme(`data:image/jpg;base64,${image}`);
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
          <Input placeholder="First line" onChangeText={setFirstLine} value={firstLine} />
          <ViewShot options={{ format: 'jpg', quality: 0.9 }} ref={viewShowRef}>
            <ImageBackground source={{ uri: meme.url }} style={imageStyle}>
              <Text style={[styles.text, styles.firstLine]}>{firstLine}</Text>
              <Text style={[styles.text, styles.secondLine]}>{secondLine}</Text>
            </ImageBackground>
          </ViewShot>
          <Input placeholder="Second line" onChangeText={setSecondLine} value={secondLine} />
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
  firstLine: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  secondLine: {
    alignSelf: 'center',
    bottom: 0,
    flex: 1,
    position: 'absolute',
  },
  text: {
    color: white,
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: black,
    textShadowRadius: 4,
  },
});
