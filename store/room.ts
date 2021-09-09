import { RoomType } from "./../types/room.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "./../types/reduxState.d";
// * 초기상태
const initialState: RoomState = {
  rooms: [],
  detail: null,
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
      return state;
    },
    // * 상세 숙소 변경하기
    setDetailRoom(state, action: PayloadAction<RoomType>) {
      state.detail = action.payload;
      return state;
    },
  },
});

export const roomActions = { ...room.actions };
export default room;
