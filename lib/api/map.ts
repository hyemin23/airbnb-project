import axios from "lib/api";

// 반환 type 설정
type GetLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

// * 현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({ latitude, longitude }: { latitude: number; longitude: number }) =>
  axios.get<GetLocationInfoAPIResponse>(`/api/maps/location?latitude=${latitude}&longigude=${longitude}`);

// * 구글 장소 자동검색 api
export const searchPlacesAPI = (keyword: string) => {
  // 객체 배열로 return 받아서 호출한곳에 전달
  return axios.get<
    {
      description: string;
      placeId: string;
    }[]
  >(`/api/maps/places?keyword=${keyword}`);
};

// * placeId로 장소 정보 가져오기
export const getPlaceAPI = (placeId: string) => {
  // dynamic 요청
  return axios.get<{
    location: string;
    latitude: number;
    longitude: number;
  }>(`/api/maps/places/${placeId}`);
};
