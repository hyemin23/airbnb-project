import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// * 초기
const initialState: { authMode: "signup" | "login" } = {
  authMode: "signup",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // * 인증 팝업 변경 함수 signup에서 login으로 변경
    setAuthMode(state, action: PayloadAction<"signup" | "login">) {
      state.authMode = action.payload;
    },
  },
});

export const authAction = { ...auth.actions };
export default auth;
