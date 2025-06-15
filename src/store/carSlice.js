// redux toolkit에서는 action과 reducer 를 slice function으로 묶어서 관리합니다.
// name
// initialState
// reducers  -- state를 변경하는 함수들

import { createSlice } from "@reduxjs/toolkit";
import carData from "../values/carData";

// state
const initialState = {
  carData,
  totalQuantity: 0,
  totalValue: 0,
  isLoading: true,
};

const carSlice = createSlice({
  name: "carSlice",
  initialState,
  reducers: {
    // totalQuantity와 totalValue를 계산합니다.
    calculateTotals: (state) => {
      let totalQuantity = 0;
      let totalValue = 0;
      state.carData.forEach(({ quantity, price }) => {
        totalQuantity += quantity;
        totalValue += quantity * price;
      });
      state.totalQuantity = totalQuantity;
      state.totalValue = totalValue;
    },
  },
});

export const carSliceActs = carSlice.actions; // 액션들을 내보냅니다.
export default carSlice; // carSlice를 기본 내보내기로 내보냅니다.
