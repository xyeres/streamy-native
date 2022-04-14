import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTab from '../components/BottomTab';
import HomeStackScreen from './HomeStack';
import SearchStackScreen from './SearchStack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Player"
        component={BottomTab}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
