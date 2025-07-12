import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { 
    count: 0,
    history: [],
    step: 1
  },
  reducers: {
    // Basic actions
    increment: (state) => {
      state.count += 1;
      state.history.push(`+1 (${state.count})`);
    },
    decrement: (state) => {
      state.count -= 1;
      state.history.push(`-1 (${state.count})`);
    },
    // Enhanced actions with payload
    up: (state, action) => {
      const value = action.payload || 1;
      state.count += value;
      state.history.push(`+${value} (${state.count})`);
    },
    down: (state, action) => {
      const value = action.payload || 1;
      state.count -= value;
      state.history.push(`-${value} (${state.count})`);
    },
    // Additional actions
    reset: (state) => {
      state.count = 0;
      state.history.push(`Reset (${state.count})`);
    },
    setCount: (state, action) => {
      const newValue = action.payload;
      state.count = newValue;
      state.history.push(`Set to ${newValue}`);
    },
    multiplyBy: (state, action) => {
      const multiplier = action.payload || 2;
      state.count *= multiplier;
      state.history.push(`×${multiplier} (${state.count})`);
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    }
  },
});

export default counterSlice;
export const counterSliceActs = counterSlice.actions;
