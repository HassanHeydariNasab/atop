import * as React from 'react';
import {useColorScheme} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from '@store/index';
import Router from '@containers/root.router';
import {SnackbarContainer} from '@containers/snackbar';

const App: React.FC<{}> = ({}) => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Router />
        <SnackbarContainer />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
