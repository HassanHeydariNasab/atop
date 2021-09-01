import {User} from '@store/user';
import * as React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './profile.styles';

interface HomeViewProps {
  isLoading: boolean;
  user?: User;
}
export default ({isLoading, user}: HomeViewProps) => {
  return (
    <View style={styles.container}>
      {user && <Text>Hello {user.name}</Text>}
      <ActivityIndicator animating={isLoading} />
    </View>
  );
};
