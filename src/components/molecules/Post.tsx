import * as React from 'react';
import {Card, Text} from 'react-native-paper';
import type {Post} from '@store/post/post.model';
import {StyleSheet, ViewStyle} from 'react-native';
import {SCALE_4, SCALE_8} from '@styles/spacing';

interface PostProps {
  post: Post;
  containerStyle?: ViewStyle;
}
export const PostItem = ({
  post: {text, userName},
  containerStyle,
}: PostProps) => {
  return (
    <Card style={[containerStyle, styles.containerStyle]}>
      <Card.Title title={userName} />
      <Card.Content>
        <Text style={styles.text}>{text}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: SCALE_8,
    marginHorizontal: SCALE_4,
  },
  text: {
    textAlign: 'auto',
  },
});
