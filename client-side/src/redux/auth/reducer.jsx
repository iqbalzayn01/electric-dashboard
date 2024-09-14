import { createReducer } from '@reduxjs/toolkit';
import { setToken, clearToken, setOneUser } from './actions';

const initialAuthState = sessionStorage.getItem('auth')
  ? JSON.parse(sessionStorage.getItem('auth'))
  : { token: null, refreshToken: null };

const initialState = {
  user: {},
  ...initialAuthState,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setToken, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      sessionStorage.setItem(
        'auth',
        JSON.stringify({
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
        })
      );
    })
    .addCase(clearToken, (state) => {
      state.token = null;
      state.refreshToken = null;
      sessionStorage.removeItem('auth');
    })
    .addCase(setOneUser, (state, action) => {
      state.user = action.payload;
    });
});

export default authReducer;
