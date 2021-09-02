import { CommonState } from "@/types/reduxState.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기
const initialState: CommonState = {
  validateMode: false,
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    // * validateMode 변경 함수
    setValidateMode: (state, action: PayloadAction<boolean>) => {
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common;
