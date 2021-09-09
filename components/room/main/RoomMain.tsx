import { useSelector } from "@/store/index";
import { format } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import MapIcon from "@/assets/svg/Icon/map/map.svg";
import RoomList from "./RoomList";
import dynamic from "next/dynamic";

// window 객체에 접근하기 위하여 ssr 렌더링 안 함
const RoomListMap = dynamic(() => import("./RoomListMap"), { ssr: false });

const Container = styled.div`
  padding: 50px 80px;
  margin: auto;

  .room-list-info {
    margin-bottom: 8px;
  }
  .room-list-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 24px;
  }
  .room-list-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .room-list-buttons-left-side {
      display: flex;
      button {
        height: 36px;
        padding: 0 16px;
        margin-right: 8px;
        border-radius: 30px;
        border: 1px solid ${palette.gray_b0};
        background-color: white;
        cursor: pointer;
        outline: none;
        &:hover {
          border-color: ${palette.black};
        }
      }
    }
    .room-list-show-map-button {
      display: flex;
      align-items: center;
      height: 42px;
      padding: 12px;
      background-color: white;
      border-radius: 8px;
      border: 0;
      background-color: white;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${palette.gray_f7};
      }
      svg {
        margin-right: 8px;
      }
    }
  }

  .room-list-wrapper {
    display: flex;
  }
`;

const RoomMain: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  const rooms = useSelector((state) => state.room.rooms);
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const getRoomListInfo = `${rooms.length}개의 숙소 ${
    checkInDate ? `${checkInDate ? format(new Date(checkInDate), "MM월 dd일") : ""}` : ""
  } ${checkInDate ? `${checkOutDate ? format(new Date(checkOutDate), "- MM월 dd일") : ""}` : ""}`;

  return (
    <Container>
      <p className="room-list-info">{getRoomListInfo}</p>
      <h1 className="room-list-title">숙소</h1>
      <div className="room-list-buttons">
        <div className="room-list-buttons-left-side">
          <button type="button">숙소 유형</button>
          <button type="button">요금</button>
        </div>
        {!showMap && (
          <button
            type="button"
            className="room-list-show-map-button"
            onClick={() => {
              setShowMap((prev) => !prev);
            }}
          >
            <MapIcon /> 지도 표시하기
          </button>
        )}
      </div>
      <div className="room-list-wrapper">
        <RoomList showMap={showMap} />
        {showMap && <RoomListMap showMap={showMap} setShowMap={setShowMap} />}
      </div>
    </Container>
  );
};

export default RoomMain;
