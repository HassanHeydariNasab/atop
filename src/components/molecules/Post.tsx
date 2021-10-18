import React from 'react';
import type {FC} from 'react';
import type {Post} from '@store/post/post.model';
import {Column, Text} from 'native-base';

interface PostProps {
  post: Post;
}
export const PostItem: FC<PostProps> = ({post: {text, userName}}) => {
  return (
    <Column p={'2'} mt={'2'} mx={'2'}>
      <Text fontWeight={'bold'} mb={'2'}>
        {userName}
      </Text>
      <Text>{text}</Text>
    </Column>
  );
};
