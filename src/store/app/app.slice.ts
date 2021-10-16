import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {App} from './app.model';

const initialState: App = {};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const {reducer, actions} = appSlice;
