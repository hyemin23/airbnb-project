import { UserState } from "@/types/reduxState";
import { UserType } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// redux toolkit 이용
const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

// user모듈과 유저의 값을 저장하는 reducer
// createSlice : reducer이름과 함수가 포함된 초기 상태와 lookup테이블을 받아 액션 생성자 함수, 액션 유형 문자열 및 리듀서 함수를 자동으로 생성합니다.
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    //  * 로그인한 유저 변경하기
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    // * 로그아웃
    initUser(state) {
      // 초기화
      state = initialState;
      return state;
    },
  },
});

export const userAction = { ...user.actions };
export default user;
