import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice"; // counterSlice를 기본 내보내기로 가져옵니다.
import calculatorSlice from "./calculatorSlice"; // Import calculatorSlice

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    calculator: calculatorSlice.reducer, // Add calculator slice
  },
});

export default store;
