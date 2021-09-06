import { useSelector } from "@/store/index";
import { registerRoomAction } from "@/store/registerRoom";
import { throttle } from "lodash";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;

  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  /* 지도 css */
  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  /* 지도 위성 제거 */
  .gmnoprint .gm-style-mtc {
    display: none;
  }
  /* 로드뷰 아이콘 제거 */
  .gm-svpc {
    display: none;
  }
  /* 풀 스크린 제거 */
  .gm-fullscreen-control {
    display: none;
  }
`;

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const RegisterRoomGeometry: React.FC = () => {
  const dispatch = useDispatch();

  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  // 구글 지도 script 불러오기
  const loadMapScript = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}&callback=initMap`;
      // html 파싱을 막지 않고 </html>을 만났을 때 실행.
      // 참고링크 : https://kimlog.me/js/2019-10-05-script/
      script.defer = true;
      document.head.appendChild(script);
      // web browser가 모두 준비되고 실행
      script.onload = () => {
        resolve();
      };
    });
  };

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    //   * 지도 불러오기
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      });

      //   * 마커 표시
      // developers.google.com/maps/documentation/javascript/markers?hl=en
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      });

      // redux store lat, lng save
      // 쓰로틀 적용
      map.addListener(
        "center_changed",
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();
          // 마커 재수정
          marker.setPosition({
            lat: centerLat,
            lng: centerLng,
          });
          dispatch(registerRoomAction.setLatitude(centerLat));
          dispatch(registerRoomAction.setLongitude(centerLng));
        }, 150),
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <Container>
      <h2>핀이 놓인 위치가 정확한가요?</h2>
      <h3>4단계</h3>
      <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
      <div className="register-room-geometry-map-wrapper">
        <div ref={mapRef} id="map" />
      </div>

      <RegisterRoomFooter prevHref="/room/register/location" nextHref="/room/register/amentities" />
    </Container>
  );
};

export default RegisterRoomGeometry;
