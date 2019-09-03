// @flow

import RNFS from 'react-native-fs'
import React, { useRef, useState } from 'react'
import Share from 'react-native-share'
import ViewShot from 'react-native-view-shot'
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text } from 'react-native'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { black, primary, white } from 'src/styles/colors'

const { width } = Dimensions.get('window')

type MemeType = {
  box_count: number,
  height: number,
  id: string,
  name: string,
  url: string,
  width: number,
}

type Props = {
  navigation: {
    getParam: (param: string, MemeType) => MemeType,
  },
}

const MemeCreator = ({ navigation: { getParam } }: Props) => {
  const [firstLine, setFirstLine] = useState('')
  const [secondLine, setSecondLine] = useState('')
  const [createdMeme, setCreatedMeme] = useState('')
  const meme = getParam('meme', {})
  const viewShowRef = useRef()
  const imageStyle = { width: Math.min(meme.width, width), height: Math.min(meme.height, width) }

  const saveMeme = () => {
    // $FlowFixMe
    viewShowRef.current.capture().then(path => {
      RNFS.readFile(path, 'base64').then(image => {
        setCreatedMeme(`data:image/jpg;base64,${image}`)
      })
    })
  }

  const shareMeme = () => {
    Share.open({ url: createdMeme })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {createdMeme ? (
        <>
          <Image source={{ uri: createdMeme }} style={imageStyle} />
          <Button color={primary} onPress={shareMeme} style={styles.button}>
            <Text style={styles.buttonText}>{'Udostępnij'}</Text>
          </Button>
        </>
      ) : (
        <>
          <Input label="First line" onChangeText={setFirstLine} value={firstLine} />
          <ViewShot options={{ format: 'jpg', quality: 0.9 }} ref={viewShowRef}>
            <ImageBackground source={{ uri: meme.url }} style={imageStyle}>
              <Text style={[styles.text, styles.firstLine]}>{firstLine}</Text>
              <Text style={[styles.text, styles.secondLine]}>{secondLine}</Text>
            </ImageBackground>
          </ViewShot>
          <Input label="Second line" onChangeText={setSecondLine} value={secondLine} />
          <Button color={primary} onPress={saveMeme} style={styles.button}>
            <Text style={styles.buttonText}>{'Zapisz mem'}</Text>
          </Button>
        </>
      )}
    </ScrollView>
  )
}

export default MemeCreator

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 20,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
  },
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
})
