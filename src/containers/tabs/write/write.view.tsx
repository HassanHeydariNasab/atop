import React from 'react';
import type {FC} from 'react';
import {Button, Column, Input} from 'native-base';

interface WriteViewProps {
  text: string;
  onTextChangeText: (_text: string) => void;
  onCreatePostPress: () => void;
  isLoading: boolean;
}
export const WriteView: FC<WriteViewProps> = ({
  text,
  onTextChangeText,
  onCreatePostPress,
  isLoading,
}) => {
  return (
    <Column flexGrow={1} justifyContent={'center'} px={'8'} space={'4'}>
      <Input
        placeholder={'write something interesting...'}
        keyboardType={'default'}
        autoFocus
        value={text}
        onChangeText={onTextChangeText}
        multiline
        numberOfLines={10}
      />
      <Button onPress={onCreatePostPress} isLoading={isLoading}>
        Create
      </Button>
    </Column>
  );
};
