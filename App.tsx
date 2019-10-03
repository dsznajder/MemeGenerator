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

import Icon from './src/components/Icon';
import { black, primary } from './src/styles/colors';

/* eslint-disable react-hooks/rules-of-hooks */
useScreens();
/* eslint-enable react-hooks/rules-of-hooks */

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<StackParamList>();

const tabBarIcon = (iconName: string) => ({
  tintColor,
}: {
  tintColor: string;
}) => <Icon name={iconName} color={tintColor} />;

const App = () => {
  return (
    <NavigationNativeContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: primary,
          inactiveTintColor: black,
        }}
        initialRouteName="List"
      >
        <Tab.Screen
          options={{
            tabBarIcon: tabBarIcon('home'),
          }}
          name="List"
        >
          {() => (
            <Stack.Navigator initialRouteName="MemeList">
              <Stack.Screen name="MemeList" component={MemeList} />
              <Stack.Screen name="MemeCreator" component={MemeCreator} />
            </Stack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          options={{
            tabBarIcon: tabBarIcon('bookmark'),
          }}
          name="Favourites"
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen component={Favourites} name="Favourites" />
            </Stack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          options={{
            tabBarIcon: tabBarIcon('archive'),
          }}
          name="Custom"
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen component={Custom} name="Custom" />
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
