import * as React from 'react';
import {View, FlatList} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {PostItem} from '@components/molecules';
import {Post} from '@store/post/post.model';
import {styles} from './home.styles';
import {SCALE_24} from '@styles/spacing';

interface HomeViewProps {
  isLoading: boolean;
  posts: Post[];
  onEndReached: () => void;
  extraData: any;
  refreshing: boolean;
  onRefresh: () => void;
}
export default ({
  isLoading,
  posts,
  onEndReached,
  extraData,
  refreshing,
  onRefresh,
}: HomeViewProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => <PostItem post={item} />}
        onEndReached={onEndReached}
        extraData={extraData}
        ListFooterComponent={
          <ActivityIndicator animating={isLoading} style={{margin: SCALE_24}} />
        }
        ListEmptyComponent={isLoading ? undefined : <Text>Nothing!</Text>}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};
