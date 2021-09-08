import Counter from "@/components/common/Counter";
import { useSelector } from "@/store/index";
import { searchRoomActions } from "@/store/searchRoom";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";
import SearchRoomButton from "./SearchRoomButton";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    border-color: ${palette.gray_dd};
  }
  > div {
    width: 100%;
    height: 100%;
  }
  .search-room-bar-guests-texts {
    position: absolute;
    width: calc(100%-114px);
    top: 16px;
    left: 20px;
  }

  .search-room-bar-guests-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .search-room-bar-guests-popup {
    position: absolute;
    background-color: white;
    width: 394px;
    top: 78px;
    right: 0;
    padding: 16px 32px;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
  }

  .search-room-bar-guests-counter-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }

  .search-room-bar-guests-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-room-bar-button-wrapper {
    position: absolute;
    top: 12px;
    right: 9px;
  }
`;
const SearchRoomGuests = () => {
  const dispatch = useDispatch();
  const [popupOpend, setPopupOpened] = useState(false);

  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);

  //* 성인 수 변경하기 Dispatch
  const setAdultCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setAdultCount(value));
  };
  //* 어린이 수 변경하기 Dispatch
  const setChildrenCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setChildrenCount(value));
  };

  //* 유아 수 변경하기 Dispatch
  const setInfantsCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setInfantsCount(value));
  };

  //* 게스트 인원 수 텍스트
  const guetsText = `게스트 ${adultCount}명${!childrenCount ? "" : `, 어린이${childrenCount}명`}${
    !infantsCount ? "" : `, 유아${infantsCount}명`
  }`;

  return (
    <Container onClick={() => setPopupOpened((prev) => !prev)}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-room-bar-guests-texts">
          <p className="search-room-bar-guests-label">인원</p>
          <p className="search-room-bar-guests-text">{guetsText}</p>
        </div>
        <div className="search-room-bar-button-wrapper">
          <SearchRoomButton />
        </div>
        {popupOpend && (
          <div className="search-room-bar-guests-popup">
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter
                label="성인"
                description="만 13세 이상"
                minValue={1}
                value={adultCount}
                // counter에서 받아온 count로 setAdult함수 인수 setting
                onChange={(count) => setAdultCountDispatch(count)}
              />
            </div>
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter
                label="어린이"
                description="2~12세"
                minValue={1}
                value={childrenCount}
                onChange={(count) => setChildrenCountDispatch(count)}
              />
            </div>
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter
                label="유아"
                description="2세 미만"
                minValue={1}
                value={infantsCount}
                onChange={(count) => setInfantsCountDispatch(count)}
              />
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchRoomGuests;
