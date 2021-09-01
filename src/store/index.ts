import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import logger from 'redux-logger';
import {rtkQueryErrorLogger} from './middlewares';
import {appReducer} from './app';
import {currentUserReducer} from './current-user';
import {currentUserApi} from './current-user/current-user.api';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(rtkQueryErrorLogger)
      .concat(currentUserApi.middleware),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
