declare module "googlemaps";

// Window객체에 type 추가하기
declare global {
  // interface를 사용하여 프로퍼티 타입 선언
  interface window {
    google: any;
    initMap: () => void;
  }
}

window.initMap = () => {
  //* 지도 불러오기
  if (mapRef.current) {
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: latitude || 37.5666784,
        lng: longitude || 126.9778436,
      },
      zoom: 14,
    });
    const marker = new window.google.maps.Marker({
      position: {
        lat: latitude || 37.5666784,
        lng: longitude || 126.9778436,
      },
      map,
    });
    map.addListener(
      "center_changed",
      throttle(() => {
        const centerLat = map.getCenter().lat();
        const centerLng = map.getCenter().lng();
        marker.setPosition({ lat: centerLat, lng: centerLng });
        dispatch(registerRoomActions.setLatitude(centerLat));
        dispatch(registerRoomActions.setLongitude(centerLng));
      }, 150),
    );
  }
};
