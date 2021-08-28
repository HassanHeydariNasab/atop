import * as React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './home.styles';

interface HomeViewProps {
  isLoading: boolean;
}
export default ({isLoading}: HomeViewProps) => {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <ActivityIndicator animating={isLoading} />
    </View>
  );
};
