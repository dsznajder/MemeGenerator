// @flow

import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { primary } from 'src/styles/colors'

const data: Array<number> = Array(100)
  .fill()
  .map((element: null, index: number): number => index)

const App = () => {
  const renderItem = ({ item }: { item: number }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
    </View>
  )

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={item => `${item}`}
      numColumns={20}
      renderItem={renderItem}
    />
  )
}

export default App

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    paddingTop: 20,
  },
  text: {
    color: primary,
  },
})
