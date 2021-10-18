import React from 'react';
import type {FC} from 'react';
import {LogBox} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';
import {theme} from '@styles/theme';
import {persistor, store} from '@store/index';
import {RootRouter} from '@containers/root.router';

LogBox.ignoreLogs([/Listener/]);

export const App: FC<{}> = ({}) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <RootRouter />
        </NativeBaseProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
