// @flow

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { useScreens } from 'react-native-screens'

import Main from 'src/scenes/Main'
import RNDefault from 'src/scenes/RNDefault'

import { primary } from 'src/styles/colors'

useScreens()

const Scenes = {
  Main,
  RNDefault,
}

const config = {
  contentOptions: {
    activeTintColor: primary,
  },
}

const Navigator = createDrawerNavigator(Scenes, config)

export default createAppContainer(Navigator)
