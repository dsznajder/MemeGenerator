// @flow

import { createStackNavigator } from 'react-navigation-stack'

import MemeCreator from './MemeCreator'
import MemeList from './MemeList'

const Scenes = {
  MemeList,
  MemeCreator,
}

const config = {}

export default createStackNavigator(Scenes, config)
