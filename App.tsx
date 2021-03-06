import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

// import Custom from './src/scenes/CustomList';
import Favourites from './src/scenes/FavouritesList';
import MemeCreator from './src/scenes/MainList/MemeCreator';
import MemeList from './src/scenes/MainList/MemeList';
import { BottomTabParamList, StackParamList } from './src/typings/scenes';

import Icon from './src/components/Icon';
import trackScreen from './src/helpers/trackScreen';
import { navigationRef } from './src/services/Navigation';
import { screenOptions, tabBarOptions } from './src/helpers/navigatorOptions';

enableScreens();

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<StackParamList>();

const tabBarIcon = (iconName: string) => ({ color }: { color: string }) => (
  <Icon color={color} name={iconName} />
);

const App = () => {
  return (
    <>
      <StatusBar animated barStyle="light-content" />
      <NavigationNativeContainer
        onStateChange={trackScreen}
        ref={navigationRef}
      >
        <Tab.Navigator initialRouteName="List" tabBarOptions={tabBarOptions}>
          <Tab.Screen
            name="List"
            options={{
              tabBarIcon: tabBarIcon('home'),
            }}
          >
            {() => (
              <Stack.Navigator
                initialRouteName="MemeList"
                screenOptions={screenOptions}
              >
                <Stack.Screen component={MemeList} name="MemeList" />
                <Stack.Screen component={MemeCreator} name="MemeCreator" />
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Favourites"
            options={{
              tabBarIcon: tabBarIcon('bookmark'),
            }}
          >
            {() => (
              <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen component={Favourites} name="Favourites" />
              </Stack.Navigator>
            )}
          </Tab.Screen>

          {/* <Tab.Screen
          name="Custom"
          options={{
            tabBarIcon: tabBarIcon('archive'),
          }}
        >
          {() => (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen component={Custom} name="Custom" />
            </Stack.Navigator>
          )}
        </Tab.Screen> */}
        </Tab.Navigator>
      </NavigationNativeContainer>
    </>
  );
};

export default App;
