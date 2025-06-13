import { createSlice } from "@reduxjs/toolkit";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    firstCalcNumber: "",
    secondCalcNumber: "",
    operator: "",
    result: "",
  },
  reducers: {
    setFirstCalcNumber: (state, action) => {
      state.firstCalcNumber = action.payload;
    },
    setSecondCalcNumber: (state, action) => {
      state.secondCalcNumber = action.payload;
    },
    setOperator: (state, action) => {
      state.operator = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    clearCalculator: (state) => {
      state.firstCalcNumber = "";
      state.secondCalcNumber = "";
      state.operator = "";
      state.result = "";
    },
  },
});

export default calculatorSlice;
export const calculatorActions = calculatorSlice.actions;
