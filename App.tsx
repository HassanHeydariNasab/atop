import React from 'react';
import type {FC} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {theme} from '@styles/theme';
import {store} from '@store/index';
import {RootRouter} from '@containers/root.router';

export const App: FC<{}> = ({}) => {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={theme}>
        <RootRouter />
      </NativeBaseProvider>
    </ReduxProvider>
  );
};
