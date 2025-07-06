import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice"; // counterSlice를 기본 내보내기로 가져옵니다.
import calculatorSlice from "./calculatorSlice"; // Import calculatorSlice
import loginSlice from "./loginSlice"; // Import loginSlice
import carSlice from "./carSlice"; // Import carSlice
import userSlice from "./userSlice"; // Import userSlice
import todoSlice from "./todoSlice"; // Import todoSlice

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // Add counter slice
    calculator: calculatorSlice.reducer, // Add calculator slice
    login: loginSlice.reducer, // Add login slice
    cars: carSlice.reducer, // Add car slice
    users: userSlice, // Add user slice
    todo: todoSlice.reducer, // Add todo slice
  },
});

export default store;
