import React from 'react';
import type {FC} from 'react';
import {Column, IconButton, Row, Text} from 'native-base';
import {format} from 'timeago.js';
import type {Post} from '@store/post/post.model';
import {Icon} from '@components/atoms';
import {TouchableOpacity} from 'react-native';

interface PostProps {
  post: Post;
  onPressLike: () => void;
}
export const PostItem: FC<PostProps> = ({
  post: {text, userName, creationDate},
  onPressLike,
}) => {
  return (
    <Column p={'2'} mt={'2'} mx={'2'}>
      <Row space={'2'}>
        <Text fontFamily={'Vazir-Bold'} mb={'2'}>
          {userName}
        </Text>
        <Text
          color={'grayText'}
          fontWeight={'medium'}
          fontFamily={'Vazir-Medium'}>
          {format(new Date(creationDate))}
        </Text>
      </Row>
      <Text fontFamily={'Vazir-Regular'}>{text}</Text>
      <TouchableOpacity onPress={onPressLike}>
        <Icon name={'favorite-border'} />
      </TouchableOpacity>
    </Column>
  );
};
