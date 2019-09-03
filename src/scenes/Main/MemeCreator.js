// @flow

import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native'

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
  const meme = getParam('meme', {})

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image resizeMode="contain" source={{ uri: meme.url }} style={styles.image} />
    </ScrollView>
  )
}

export default MemeCreator

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  image: {
    height: '100%',
    width: width - 20,
  },
})
