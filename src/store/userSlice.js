import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser, delUser, udtUser } = userSlice.actions;
export default userSlice.reducer;
