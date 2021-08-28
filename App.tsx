import * as React from 'react';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import Router from './src/containers/root-router';
import {store} from '@store/index';

const App: React.FC<{}> = ({}) => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
