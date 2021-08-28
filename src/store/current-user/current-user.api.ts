import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {User} from '@store/user';
import {baseUrl} from '@store/baseUrl';
import {RootState} from '..';

interface CreateCurrentUserRequest {
  countryCode: string;
  mobile: string;
}

interface VerifyUserRequest {
  countryCode: string;
  mobile: string;
  verificationCode: string;
}

export const currentUserApi = createApi({
  reducerPath: 'currentUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).currentUser.token;
      if (token) {
        headers.set('authorization', `JWT ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => `/v1/currentUser`,
    }),
    createCurrentUser: builder.mutation<void, CreateCurrentUserRequest>({
      query: body => ({url: '/v1/currentUser', method: 'POST', body}),
    }),
    editCurrentUser: builder.mutation<User, VerifyUserRequest>({
      query: body => ({url: '/v1/currentUser', method: 'PATCH', body}),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useCreateCurrentUserMutation,
  useEditCurrentUserMutation,
} = currentUserApi;
