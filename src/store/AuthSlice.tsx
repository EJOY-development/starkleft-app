import { createSlice, current } from "@reduxjs/toolkit";

const initialState = Object.freeze({
  uid: null,
  username: null,
  accessToken: null,
  refreshToken: null,
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    clearAuth: (state) => {
      state = Object.assign(state, initialState);
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const authCurrent = (state: any) => state.auth;

export default authSlice.reducer;
