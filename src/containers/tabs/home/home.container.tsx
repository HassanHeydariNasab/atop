import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {batch, useDispatch} from 'react-redux';
import {useShallowPickSelector} from '@hooks/useSelector';
import {postActions, postApiUtil, useGetPostsQuery} from '@store/post';
import {Post} from '@store/post/post.model';
import HomeView from './home.view';

export default () => {
  const dispatch = useDispatch();
  const {offset, limit, posts, isRefreshing} = useShallowPickSelector('post', [
    'offset',
    'limit',
    'posts',
    'isRefreshing',
  ]);
  const {isLoading, isFetching, isSuccess, data, refetch} = useGetPostsQuery({
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
      console.log({offset, d: data.results});
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
      dispatch(postActions.resetOffset());
      dispatch(postActions.setIsRefreshing());
    });
  };

  return (
    <HomeView
      isLoading={isFetching}
      posts={posts}
      onEndReached={onEndReached}
      extraData={extraData}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};
