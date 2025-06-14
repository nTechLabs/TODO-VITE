import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counterSlice",
  initialState: { count: 0 },
  reducers: {
    up: (state, action) => {
      state.count += action.payload; // action.step 대신 action.payload를 사용하여 더 직관적으로 변경합니다.
    },
    down: (state, action) => {
      state.count -= action.payload; // action.step 대신 action.payload를 사용하여 더 직관적으로 변경합니다.
    },
  },
});

export default counterSlice;
export const counterSliceActs = counterSlice.actions; // counterSlice.actions를 counterSliceActions로 내보냅니다.
