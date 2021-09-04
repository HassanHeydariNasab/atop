import * as React from 'react';
import {useState, useEffect} from 'react';
import {batch, useDispatch} from 'react-redux';
import CreateView from './write.view';
import {postActions, useCreatePostMutation} from '@store/post';
import {useShallowPickSelector} from '@hooks/useSelector';
import {useTabsNavigation} from '../tabs.router';
import {appActions} from '@store/app';

export default () => {
  const tabsNavigation = useTabsNavigation();
  const dispatch = useDispatch();
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
        dispatch(appActions.setSnackBarMessage('Posted!'));
        dispatch(appActions.setIsSnackBarVisible(true));
        dispatch(postActions.setText(''));
      });
    }
  }, [isSuccess]);

  return (
    <CreateView
      text={text || ''}
      onTextChangeText={onTextChangeText}
      onCreatePostPress={onCreatePostPress}
      isLoading={isLoading}
    />
  );
};
