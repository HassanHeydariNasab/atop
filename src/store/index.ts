import {combineReducers, configureStore} from '@reduxjs/toolkit';
import type {Middleware} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import type {Storage} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createReduxFlipperDebugger from 'redux-flipper';
import {rtkQueryErrorLogger} from './middlewares';
import {currentUserReducer} from './current-user';
import {currentUserApi} from './current-user/current-user.api';
import {postApi, postReducer} from './post';

const persistingReducer = combineReducers({
  post: postReducer,
  currentUser: currentUserReducer,
});

const storage = new MMKV({
  id: 'persisted',
  encryptionKey: '1234',
});

export const mmkvStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistedReducer = persistReducer<ReturnType<typeof persistingReducer>>(
  {
    key: 'redux',
    storage: mmkvStorage,
    blacklist: [],
    stateReconciler: autoMergeLevel2,
    debug: true,
  },
  persistingReducer,
);

const rootReducer = combineReducers({
  persistedReducer,
  [currentUserApi.reducerPath]: currentUserApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      createReduxFlipperDebugger(),
      rtkQueryErrorLogger,
      currentUserApi.middleware as Middleware,
      postApi.middleware as Middleware,
    ]),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type StorageState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;
