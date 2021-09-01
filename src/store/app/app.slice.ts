import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {App} from './app.model';

const initialState: App = {
  isSnackBarVisible: false,
  snackBarMessage: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsSnackBarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSnackBarVisible = action.payload;
    },
    setSnackBarMessage: (state, action: PayloadAction<string>) => {
      state.snackBarMessage = action.payload;
    },
  },
});

export const {reducer, actions} = appSlice;
