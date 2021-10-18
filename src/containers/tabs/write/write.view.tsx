import React from 'react';
import type {FC} from 'react';
import {Button, Column, Input} from 'native-base';

interface WriteViewProps {
  text: string;
  onTextChangeText: (_text: string) => void;
  onPublishPostPress: () => void;
  isLoading: boolean;
}
export const WriteView: FC<WriteViewProps> = ({
  text,
  onTextChangeText,
  onPublishPostPress,
  isLoading,
}) => {
  return (
    <Column
      flexGrow={1}
      justifyContent={'flex-start'}
      px={'4'}
      space={'4'}
      mt={'12'}>
      <Input
        placeholder={'write something interesting...'}
        keyboardType={'default'}
        autoFocus
        value={text}
        onChangeText={onTextChangeText}
        multiline
        numberOfLines={15}
        textAlignVertical={'top'}
        size={'md'}
      />
      <Button onPress={onPublishPostPress} isLoading={isLoading}>
        {'Publish'}
      </Button>
    </Column>
  );
};
