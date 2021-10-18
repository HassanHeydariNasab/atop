import {navigate} from '@containers/root.router';
import {MiddlewareAPI, isRejectedWithValue, Middleware} from '@reduxjs/toolkit';
import {Toast} from 'native-base';

export const rtkQueryErrorLogger: Middleware =
  ({dispatch, getState}: MiddlewareAPI) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      console.log(JSON.stringify(action));
      Toast.show({title: 'Error', description: action.payload.data.message});
      if (action.payload.status === 401) {
        navigate('login', {});
      }
    }
    return next(action);
  };
