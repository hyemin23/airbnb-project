import { RoomType } from "./../../types/room.d";
import { RegisterRoomState } from "@/types/reduxState";
import axios from "lib/api";
import { makeQueryString } from "../utils";

//* 숙소 등록하기
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) => axios.post("/api/rooms", body);

//* 숙소 리스트 불러오기 query
type GetRoomListAPIQueries = {
  location?: string | string[];
  checkInDate?: string | string[];
  checkOutDate?: string | string[];
  adultCount?: string | string[];
  childrenCount?: string | string[];
  infantsCount?: string | string[];
  latitude?: string | string[];
  longitude?: string | string[];
  limit: string | string[];
  page: string | string[];
};

// * 숙소 리스트 불러오기
export const getRoomListAPI = (queries: GetRoomListAPIQueries) => {
  // return : room을 찾아서 room type으로 return
  // makeQueryString : "/api/rooms?querites" 형태로 요청
  return axios.get<RoomType[]>(makeQueryString("/api/rooms", queries));
};

// * 숙소 하나 불러오기 (detail)
export const getRoomAPI = (roomId: number) => {
  return axios.get<RoomType>(`/api/rooms/${roomId}`);
};
