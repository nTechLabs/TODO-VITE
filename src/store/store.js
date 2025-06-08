import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice"; // counterSlice를 기본 내보내기로 가져옵니다.

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
