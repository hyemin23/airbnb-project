import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 선택되기 전의 상태가 있기 때문에 null로 초기값 설정
type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: string | null;
};

// * 초기 상태
const initialState: RegisterRoomState = {
  // 건물 유형 큰 범주
  largeBuildingType: null,
  // 건물 유형
  buildingType: null,
  // 숙소 유형
  roomType: null,
  // 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: null,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    // 큰 건물 유형 변경
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    // 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
  },
});

export const registerRoomAction = { ...registerRoom.actions };

export default registerRoom;
