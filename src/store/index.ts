import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import logger from 'redux-logger';
import {rtkQueryErrorLogger} from './middlewares';
import {appReducer} from './app';
import {currentUserReducer} from './current-user';
import {currentUserApi} from './current-user/current-user.api';
import {postApi, postReducer} from './post';

export const store = configureStore({
  reducer: {
    app: appReducer,
    currentUser: currentUserReducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      //.concat(logger)
      .concat(rtkQueryErrorLogger)
      .concat(currentUserApi.middleware)
      .concat(postApi.middleware),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
