// @flow

import React, { useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text } from 'react-native'

import Input from 'src/components/Input'
import { black, white } from 'src/styles/colors'

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
  const meme = getParam('meme', {})

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input label="First line" onChangeText={setFirstLine} value={firstLine} />
      <ImageBackground
        source={{ uri: meme.url }}
        style={{ width: Math.min(meme.width, width), height: Math.min(meme.height, width) }}
      >
        <Text style={[styles.text, styles.firstLine]}>{firstLine}</Text>
        <Text style={[styles.text, styles.secondLine]}>{secondLine}</Text>
      </ImageBackground>
      <Input label="Second line" onChangeText={setSecondLine} value={secondLine} />
    </ScrollView>
  )
}

export default MemeCreator

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
})
