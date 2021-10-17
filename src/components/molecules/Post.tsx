import React from 'react';
import type {FC} from 'react';
import type {Post} from '@store/post/post.model';
import type {ViewStyle} from 'react-native';
import {Column, Text} from 'native-base';

interface PostProps {
  post: Post;
  containerStyle?: ViewStyle;
}
export const PostItem: FC<PostProps> = ({
  post: {text, userName},
  containerStyle,
}) => {
  return (
    <Column
      style={containerStyle}
      borderWidth={'1px'}
      m={'2'}
      p={'2'}
      borderColor={'gray.300'}
      borderRadius={'8'}>
      <Text>{userName}</Text>
      <Text textAlign={'auto'}>{text}</Text>
    </Column>
  );
};
