import * as React from 'react';
import {View, Text} from 'react-native';
import {styles} from './write.styles';

interface WriteViewProps {}
export default ({}: WriteViewProps) => {
  return (
    <View style={styles.container}>
      <Text>Create</Text>
    </View>
  );
};
