import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackScreen from './HomeStack';
import SearchStackScreen from './SearchStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FunPlayer from '../components/FunPlayer';
import COLORS from '../utils/colors';
import CONSTANTS from '../utils/constants';
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        top: -8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: CONSTANTS.ROUNDED_EDGE,
          backgroundColor: 'white',
          ...styles.shadow,
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
          backgroundColor: 'white',
          borderRadius: 15,
          height: 72,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow,
        },
        tabBarActiveTintColor: COLORS.DARK_PINK,
        tabBarInactiveTintColor: COLORS.INACTIVE,
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
              <View style={{position: 'absolute', top: 20}}>
                <Ionicons name={iconName} size={size} color={color} />
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
            focused ? (color = COLORS.DARK_PINK) : (color = COLORS.INACTIVE);
            let iconName;
            iconName = focused ? 'musical-notes-sharp' : 'musical-notes-sharp';
            return <Ionicons name={iconName} size={size} color={color} />;
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
              <View style={{position: 'absolute', top: 20}}>
                <Ionicons name={iconName} size={size} color={color} />
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
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 3,
  },
});

export default Tabs;
