import React from 'react';
import Routes from './Routes';
import {store} from '../redux/store';
import {Provider as ReduxProvider} from 'react-redux';

export default function Providers() {
  return (
    <ReduxProvider store={store}>
      <Routes />
    </ReduxProvider>
  );
}
