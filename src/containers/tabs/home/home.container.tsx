import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {batch, useDispatch} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {useShallowPickSelector} from '@hooks/useSelector';
import {postActions, postApiUtil, useGetPostsQuery} from '@store/post';
import {HomeView} from './home.view';
import type {TabsRouterProps} from '../tabs.router';

export const HomeContainer: FC<TabsRouterProps<'home'>> = () => {
  const dispatch = useDispatch();
  const {offset, limit, posts, isRefreshing} = useShallowPickSelector('post', [
    'offset',
    'limit',
    'posts',
    'isRefreshing',
  ]);
  const {isFetching, data, isError} = useGetPostsQuery({
    offset,
    limit,
  });
  const [extraData, setExtraData] = useState<number>(0);

  const onEndReached = () => {
    if (!isFetching) {
      dispatch(postActions.incrementOffset());
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(postActions.appendPosts(data.results));
      dispatch(postActions.unsetIsRefreshing());
    }
  }, [data]);

  useEffect(() => {
    setExtraData(_extraData => _extraData + 1);
  }, [posts]);

  const onRefresh = () => {
    batch(() => {
      dispatch(postApiUtil.resetApiState());
      dispatch(postActions.resetPostsAndOffset());
      dispatch(postActions.setIsRefreshing());
    });
  };

  const {isConnected} = useNetInfo();
  useEffect(() => {
    if (isConnected) {
      onRefresh();
    }
  }, [isConnected]);

  useEffect(() => {
    if (isError) {
      dispatch(postActions.unsetIsRefreshing());
    }
  }, [isError]);

  return (
    <HomeView
      isLoading={isFetching && !isRefreshing}
      posts={posts}
      onEndReached={onEndReached}
      extraData={extraData}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};
