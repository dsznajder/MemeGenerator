import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useScreens } from 'react-native-screens';

import { BottomTabParamList, StackParamList } from './src/types/scenes';

import Custom from './src/scenes/CustomList';
import Favourites from './src/scenes/FavouritesList';
import MemeCreator from './src/scenes/MainList/MemeCreator';
import MemeList from './src/scenes/MainList/MemeList';

/* eslint-disable react-hooks/rules-of-hooks */
useScreens();
/* eslint-enable react-hooks/rules-of-hooks */

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationNativeContainer>
      <Tab.Navigator initialRouteName="List">
        <Tab.Screen name="List">
          {() => (
            <Stack.Navigator initialRouteName="MemeList">
              <Stack.Screen name="MemeList" component={MemeList} />
              <Stack.Screen name="MemeCreator" component={MemeCreator} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Favourites" component={Favourites} />
        <Tab.Screen name="Custom" component={Custom} />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
