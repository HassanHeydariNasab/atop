import * as React from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {styles} from './write.styles';

interface WriteViewProps {
  text: string;
  onTextChangeText: (_text: string) => void;
  onCreatePostPress: () => void;
  isLoading: boolean;
}
export default ({
  text,
  onTextChangeText,
  onCreatePostPress,
  isLoading,
}: WriteViewProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={'new post'}
        placeholder={'write something interesting...'}
        keyboardType={'default'}
        autoFocus
        value={text}
        onChangeText={onTextChangeText}
        style={styles.mobileTextInput}
        mode={'outlined'}
        multiline
      />
      <Button onPress={onCreatePostPress} loading={isLoading}>
        Create
      </Button>
    </View>
  );
};
