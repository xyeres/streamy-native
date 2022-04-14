import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Home from '../screens/Home';
import Search from '../screens/Search';
import Player from '../screens/Player';
import Tracklist from '../screens/Tracklist';
import Test from '../screens/Test';
import BottomTab from '../components/BottomTab';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tracklist"
          options={({route}) => ({title: route.params.title})}
          component={Tracklist}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <BottomTab />
    </>
  );
};

export default HomeStack;
