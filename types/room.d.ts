import { UserType } from "./user.d";
export type BedType =
  | "다른 침대 추가"
  | "소파"
  | "에어 매트릭스"
  | "요와 이불"
  | "싱글"
  | "더블"
  | "퀸"
  | "이층 침대"
  | "바닥용 에어매트릭스"
  | "유아 침대"
  | "유아용 침대"
  | "해먹"
  | "물침대";

//* 저장 될 숙소 타입
export type StoredRoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public";
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amenities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: Date;
  endDate: Date;

  //날짜들 새로 추가해서 보낼 것
  createdAt: Date;
  updatedAt: Date;
  // 숙소의 hostId를 userId로 바꿔서 보낼 예정
  hostId: number;
};

//* 숙소 타입
export type RoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public";
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amenities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  host: UserType;
};
