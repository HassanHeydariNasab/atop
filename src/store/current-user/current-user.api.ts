import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {User} from '@store/user';
import {baseUrl} from '@store/baseUrl';
import {RootState} from '..';

interface UpsertVerificationRequest {
  countryCode: string;
  mobile: string;
}

interface UpsertVerificationResponse {
  isUserNew: boolean;
}

interface UpsertUserRequest {
  countryCode: string;
  mobile: string;
  verificationCode: string;
  name?: string;
}

interface UpsertUserResponse {
  token: string;
}

export const currentUserApi = createApi({
  reducerPath: 'currentUserApi',
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
    getCurrentUser: builder.query<User, void>({
      query: () => `/v1/users/current`,
    }),
    upsertVerification: builder.mutation<
      UpsertVerificationResponse,
      UpsertVerificationRequest
    >({
      query: body => ({url: '/v1/verifications', method: 'PUT', body}),
    }),
    upsertUser: builder.mutation<UpsertUserResponse, UpsertUserRequest>({
      query: body => ({
        url: '/v1/users',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpsertVerificationMutation,
  useUpsertUserMutation,
} = currentUserApi;
