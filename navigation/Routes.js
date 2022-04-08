import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './HomeStack';

export default function Routes() {
  // TODO authcheck load user and show loading state here
  const user = true;
  const AuthStack = () => null;

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
