import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackScreen from './HomeStack';
import SearchStackScreen from './SearchStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FunPlayer from '../components/FunPlayer';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'lightgreen',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          marginBottom: 10,
          marginHorizontal: 20,
          elevation: 0,
          bottom: 12,
          backgroundColor: 'rgba(256,256,256, 1)',
          borderRadius: 15,
          height: 72,
          ...styles.shadow,
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            return (
              <View style={{alignItems: 'center'}}>
                <Ionicons name={iconName} size={25} color={color} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Play"
        component={FunPlayer}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            iconName = focused ? 'musical-notes-sharp' : 'musical-notes-sharp';
            return <Ionicons name={iconName} size={35} color={'white'} />;
          },
          tabBarButton: props => {
            return <CustomTabBarButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            iconName = focused ? 'search' : 'search';
            return (
              <View style={{alignItems: 'center'}}>
                <Ionicons name={iconName} size={25} color={color} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
