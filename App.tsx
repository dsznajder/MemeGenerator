import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useScreens } from 'react-native-screens';

import MemeCreator from './src/scenes/MemeCreator';
import MemeList from './src/scenes/MemeList';
import { RootParamList } from './src/types/scenes';

useScreens();

const Stack = createStackNavigator<RootParamList>();

const App = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="MemeList">
        <Stack.Screen name="MemeList" component={MemeList} />
        <Stack.Screen name="MemeCreator" component={MemeCreator} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
