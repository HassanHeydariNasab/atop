import React, {useMemo} from 'react';
import type {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Column, Row, Spinner, Text} from 'native-base';
import {format} from 'timeago.js';
import type {Post} from '@store/post/post.model';
import {Icon} from '@components/atoms';
import {useLikePostMutation} from '@store/post';

interface PostProps {
  post: Post;
}
export const PostItem: FC<PostProps> = ({
  post: {id, text, userName, creationDate, liked},
}) => {
  const [likePost, {data, isLoading}] = useLikePostMutation();
  const onPressLike = () => {
    likePost({id});
  };
  const _liked = useMemo(() => {
    return data ? data.liked : liked;
  }, [data, liked]);
  return (
    <Column p={'4'} mt={'2'} space={'4'}>
      <Row space={'2'}>
        <Text fontFamily={'bold'}>{userName}</Text>
        <Text color={'grayText'} fontWeight={'medium'} fontFamily={'medium'}>
          {format(new Date(creationDate))}
        </Text>
      </Row>
      <Text fontFamily={'regular'}>{text}</Text>
      <Row alignItems={'center'} space={'2'}>
        {isLoading ? (
          <Spinner size={'lg'} color={'grayText'} />
        ) : (
          <TouchableOpacity onPress={onPressLike}>
            <Icon name={'recommend'} size={'9'} />
          </TouchableOpacity>
        )}
        <Text fontFamily={'medium'} color={'grayText'}>
          {_liked}
        </Text>
      </Row>
    </Column>
  );
};
