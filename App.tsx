import * as React from 'react';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Router from './src/Router';

const App: React.FC<{}> = ({}) => {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
};

export default App;
