import {MiddlewareAPI, isRejectedWithValue, Middleware} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {appActions} from './app';

export const rtkQueryErrorLogger: Middleware =
  ({dispatch, getState}: MiddlewareAPI) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      console.log(JSON.stringify(action));
      batch(() => {
        dispatch(appActions.setSnackBarMessage(action.payload.data.message));
        dispatch(appActions.setIsSnackBarVisible(true));
      });
    }

    return next(action);
  };
