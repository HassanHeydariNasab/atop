import React from 'react';
import type {FC} from 'react';
import {Column, Divider, FlatList, Input, Spinner, View} from 'native-base';
import {PostItem} from '@components/molecules';
import {Post} from '@store/post/post.model';
import {Icon} from '@components/atoms';

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
    <Column flexGrow={1} alignItems={'center'}>
      <FlatList
        data={posts}
        onEndReached={onEndReached}
        extraData={extraData}
        renderItem={({item}) => <PostItem post={item} />}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={<Spinner animating={isLoading} />}
        ListFooterComponentStyle={{marginBottom: 54}}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <Column position={'absolute'} top={'10'} opacity={'0.7'} width={'80%'}>
        <Input
          placeholder={'Type to explore'}
          variant={'rounded'}
          InputLeftElement={<Icon name={'search'} size={'6'} ml={'4'} />}
          px={'4'}
          size={'md'}
          bg={'white'}
          borderWidth={'4'}
        />
      </Column>
    </Column>
  );
};
