import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import HomeScreen from '../screens/HomeScreen';
import TracklistScreen from '../screens/TracklistScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Tracklist"
        options={({route}) => ({
          title: route.params.title,
          headerShown: false,
        })}
        component={TracklistScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
