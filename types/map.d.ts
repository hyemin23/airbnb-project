declare module "googlemaps";

// Window객체에 type 추가하기
declare global {
  // interface를 사용하여 프로퍼티 타입 선언
  interface window {
    google: any;
    initMap: () => void;
  }
}
