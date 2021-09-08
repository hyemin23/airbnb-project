import { RoomType } from "./../types/room.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "./../types/reduxState.d";
// * 초기상태
const initialState: RoomState = {
  rooms: [],
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
      return state;
    },
  },
});

export const roomActions = { ...room.actions };
export default room;
