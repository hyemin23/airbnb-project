import { BedType } from "./../types/room.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 선택되기 전의 상태가 있기 때문에 null로 초기값 설정
type RegisterRoomState = {
  // 1단계
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;

  // 2단계
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: {
    id: number;
    beds: {
      type: BedType;
      count: number;
    }[];
  }[];
  publicBedList: {
    type: BedType;
    count: number;
  }[];

  // 3단계
  bathroomCount: number;
  bathroomType: "private" | "public" | null;

  // 4단계
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;

  // 5단계
  amenities: string[];

  // 6단계
  conveniences: string[];

  // 7단계
  photos: string[];
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

  // * 2단계
  // 최대 숙박 인원
  maximumGuestCount: 1,
  //침실 개수
  bedroomCount: 0,
  // 침대 개수
  bedCount: 1,
  // 침대 유형
  bedList: [],
  // 공용 공간 침대 유형
  publicBedList: [],

  // * 3단계
  // 욕실 개수
  bathroomCount: 1,
  // 욕실 유형
  bathroomType: null,

  // * 4단계
  // 국가
  country: "",
  // 시/도
  city: "",
  // 시/군/구
  district: "",
  // 도로명 주소
  streetAddress: "",
  // 동호수
  detailAddress: "",
  // 우편번호
  postcode: "",
  // 위도
  latitude: 0,
  // 경도
  longitude: 0,

  // * 5단계
  amenities: [],

  // * 6단계
  conveniences: [],

  // * 7단계
  photos: [
    "https://bnb-hyemin-bucket.s3.ap-northeast-2.amazonaws.com/preview560__a08c7b24-a3e4-4cf7-ad82-78948a4e6f14.jpg",
    "https://bnb-hyemin-bucket.s3.ap-northeast-2.amazonaws.com/preview560__a08c7b24-a3e4-4cf7-ad82-78948a4e6f14.jpg",
    "https://bnb-hyemin-bucket.s3.ap-northeast-2.amazonaws.com/preview560__a08c7b24-a3e4-4cf7-ad82-78948a4e6f14.jpg",
  ],
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    //* 큰 건물 유형 변경
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    //* 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    //* 숙소 유형 변경하기
    setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
      state.roomType = action.payload;
      return state;
    },
    //* 게스트 유형의 숙소인지 확인
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    //* 최대 숙박인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    //* 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      // 기존 bedList가 더 클 경우에는 기존 bedList에서 초과되는 부분 잘라내기
      if (bedroomCount < bedList.length) {
        bedList = state.bedList.slice(0, bedroomCount);
      }
      // 기존 bedList 길이가 더 작은 경우 즉, 기존 배열보다 큰 경우 기존 배열에 더해주기
      else {
        for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({
            id: i,
            beds: [],
          });
        }
      }
      state.bedList = bedList;
      return state;
      //기존 bedList 늘리기
      // 문제점 : 침대 유형을 변경하면 기본 배열(beds)가 빈배열로 초기화 됨.
      // state.bedList = Array.from(Array(bedroomCount), (_, i) => ({
      //   id: i + 1,
      //   beds: [],
      // }));
    },
    //* 최대 침대 수량 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    // * 침대 유형 개수 변경하기
    setBedTypeCount(
      state,
      action: PayloadAction<{
        bedroomId: number;
        type: BedType;
        count: number;
      }>,
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);

      if (index === -1) {
        // 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      // 타입이 존재한다면
      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      }
      // 이미 추가된 항목이 있다면 count 늘려주기
      else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },
    // * 공용공간 침대 유형 개수 변경하기
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType; count: number }>) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (index === -1) {
        // 타입이 없다면 타입 추가
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      // 타입 존재
      if (count === 0) {
        // 수량이 없다면 타입제거
        state.publicBedList.splice(index, 1);
      } else {
        //해당 인덱스 수량 넣어주기
        state.publicBedList[index].count = count;
      }
      return state;
    },

    // * 욕실 개수 변경하기
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },
    // * 욕실 유형 변경하기
    setBathroomType(state, action: PayloadAction<"private" | "public">) {
      state.bathroomType = action.payload;
      return state;
    },
    //* 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
      return state;
    },
    //* 시/도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      return state;
    },
    //* 시/군/구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
      return state;
    },
    //* 도로명주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
      return state;
    },
    //* 동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
      return state;
    },
    //* 우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
      return state;
    },
    //* 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
      return state;
    },
    //* 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
      return state;
    },
    // * 편의시설 변경하기
    setAmentities(state, action: PayloadAction<string[]>) {
      state.amenities = action.payload;
      return state;
    },
    // * 편의공간 변경하기
    setConveniences(state, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
      return state;
    },
    // * 숙소 사진 변경하기
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
      return state;
    },
  },
});

export const registerRoomAction = { ...registerRoom.actions };

export default registerRoom;
