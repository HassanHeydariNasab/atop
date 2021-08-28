import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@store/user';

const initialState: User = {
  id: -1,
  countryCode: '+98',
  mobile: '',
  name: '',
  coins: -1,
  token: '',
  verificationCode: '',
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },
  },
});

export const {reducer, actions} = currentUserSlice;
