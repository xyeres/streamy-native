import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Home from '../screens/Home';
import Search from '../screens/Search';
import Player from '../screens/Player';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Player"
          component={Player}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
