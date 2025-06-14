import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearLogin: (state) => {
      state.email = "";
      state.password = "";
      state.rememberMe = false;
      state.error = "";
    },
  },
});

export const loginActs = loginSlice.actions;
export default loginSlice;
