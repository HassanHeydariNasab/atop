import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {User} from '@store/user';
import {baseUrl} from '@store/baseUrl';
import {RootState} from '..';
import {Post} from './post.model';

interface GetPostsRequest {
  offset: number;
  limit: number;
}

interface GetPostsResponse {
  results: Post[];
}

interface CreatePostRequest {
  text: string;
}

interface CreatePostResponse {
  id: number;
}

interface LikePostRequest {
  id: number;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).persistedReducer.currentUser
        .token;
      if (token) {
        headers.set('authorization', `${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
      query: ({offset, limit}) => `/v1/posts?offset=${offset}&limit=${limit}`,
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      query: body => ({url: '/v1/posts', method: 'POST', body}),
    }),
    likePost: builder.mutation<void, LikePostRequest>({
      query: id => ({
        url: `/v1/posts/${id}?action=like`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  util: postApiUtil,
} = postApi;
