import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Auth {
  countryCode: string;
  mobile: string;
  verificationCode: string;
  name: string;
  token: string;
}
// local state
const initialState: Auth = {
  countryCode: '+98',
  mobile: '9013792332',
  verificationCode: '',
  name: '',
  token: '',
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      let mobile = action.payload;
      if (mobile === '0') {
        mobile = mobile.substr(1);
      }
      state.mobile = mobile;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {reducer, actions} = currentUserSlice;
