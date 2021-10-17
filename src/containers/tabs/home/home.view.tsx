import React from 'react';
import type {FC} from 'react';
import {Column, FlatList, Spinner, Text} from 'native-base';
import {PostItem} from '@components/molecules';
import {Post} from '@store/post/post.model';

interface HomeViewProps {
  isLoading: boolean;
  posts: Post[];
  onEndReached: () => void;
  extraData: any;
  refreshing: boolean;
  onRefresh: () => void;
}
export const HomeView: FC<HomeViewProps> = ({
  isLoading,
  posts,
  onEndReached,
  extraData,
  refreshing,
  onRefresh,
}) => {
  return (
    <Column flexGrow={1}>
      <FlatList
        data={posts}
        renderItem={({item}) => <PostItem post={item} />}
        onEndReached={onEndReached}
        extraData={extraData}
        ListFooterComponent={<Spinner animating={isLoading} />}
        ListEmptyComponent={isLoading ? undefined : <Text>{'Nothing!'}</Text>}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </Column>
  );
};
