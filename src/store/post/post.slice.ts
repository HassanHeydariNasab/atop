import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from './post.model';

interface LocalPostState {
  text: string;
  offset: number;
  limit: number;
  posts: Post[];
  isRefreshing: boolean;
}
// local state
const initialState: LocalPostState = {
  text: '',
  offset: 0,
  limit: 10,
  posts: [],
  isRefreshing: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    incrementOffset: (state, action: PayloadAction<void>) => {
      state.offset += state.limit;
    },
    resetPostsAndOffset: (state, action: PayloadAction<void>) => {
      state.offset = 0;
      state.posts = [];
    },
    appendPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = state.posts.concat(action.payload);
    },
    setIsRefreshing: (state, action: PayloadAction<void>) => {
      state.isRefreshing = true;
    },
    unsetIsRefreshing: (state, action: PayloadAction<void>) => {
      state.isRefreshing = false;
    },
  },
});

export const {reducer, actions} = postSlice;
