import { createSlice } from "@reduxjs/toolkit";
import { USERS_API_URL } from "../pages/ServerApi/api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    delUser: (state, action) => {
      // action.payload: array of ids to delete
      state.users = state.users.filter((u) => !action.payload.includes(u.id));
    },
    udtUser: (state, action) => {
      // action.payload: user object with id
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) {
        state.users[idx] = { ...state.users[idx], ...action.payload };
      }
    },
  },
});

export const { getUsers, addUser, delUser, udtUser } = userSlice.actions;
export default userSlice; // Export the slice object, not just the reducer
