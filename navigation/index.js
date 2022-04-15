import React from 'react';
import Routes from './Routes';
import {store} from '../lib/store';
import {Provider as ReduxProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Providers() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ReduxProvider store={store}>
        <Routes />
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
