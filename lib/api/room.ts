import { RegisterRoomState } from "@/types/reduxState";
import axios from "lib/api";

//* 숙소 등록하기
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) => axios.post("/api/rooms", body);
