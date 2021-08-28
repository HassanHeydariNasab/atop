import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './splash.styles';

export default () => {
  return (
    <View style={styles.display}>
      <ActivityIndicator />
    </View>
  );
};
