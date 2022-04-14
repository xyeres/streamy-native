import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreen from './HomeStack';
import BottomTab from '../components/BottomTab';
import Tabs from './Tabs';

export default function Routes() {
  // TODO authcheck load user and show loading state here
  const user = true;
  const AuthStack = () => null;

  return (
    <NavigationContainer>{user ? <Tabs /> : <AuthStack />}</NavigationContainer>
  );
}
