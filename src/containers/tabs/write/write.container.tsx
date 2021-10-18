import type {FC} from 'react';
import React, {useEffect} from 'react';
import {batch, useDispatch} from 'react-redux';
import {useToast} from 'native-base';
import {postActions, useCreatePostMutation} from '@store/post';
import {useShallowPickSelector} from '@hooks/useSelector';
import type {TabsRouterProps} from '../tabs.router';
import {WriteView} from './write.view';

export const WriteContainer: FC<TabsRouterProps<'write'>> = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {text} = useShallowPickSelector('post', ['text']);
  const onTextChangeText = (_text: string) => {
    dispatch(postActions.setText(_text));
  };

  const [createPost, {isLoading, isSuccess}] = useCreatePostMutation();
  const onCreatePostPress = () => {
    if (text) createPost({text});
  };

  useEffect(() => {
    if (isSuccess) {
      batch(() => {
        toast.show({title: 'Published!'});
        dispatch(postActions.setText(''));
      });
    }
  }, [isSuccess]);

  return (
    <WriteView
      text={text || ''}
      onTextChangeText={onTextChangeText}
      onPublishPostPress={onCreatePostPress}
      isLoading={isLoading}
    />
  );
};
