import useDebounce from "@/hooks/useDebounce";
import { getPlaceAPI, searchPlacesAPI } from "@/lib/api/map";
import { useSelector } from "@/store/index";
import { searchRoomActions } from "@/store/searchRoom";
import { isEmpty, result } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";

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

  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;

    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      outline: none;

      /* 말줄임 효과 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }
  .search-room-bar-loaction-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;

    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;
const SearchRoomBarLocation = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const location = useSelector((state) => state.searchRoom.location);
  const [popupOpend, setPopupOpend] = useState(false);
  // * 검색결과 저장
  const [results, setResults] = useState<
    {
      description: string;
      placeId: string;
    }[]
  >();

  // * debounce hooks
  const searchKeyword = useDebounce(location, 150);

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpend(true);
  };

  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  //* 위치  변경 Dispatch
  const setLocationDispatch = (value: string) => {
    dispatch(searchRoomActions.setLocation(value));
  };

  //* 위도 변경 Dispatch
  const setLatitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLatitude(value));
  };

  //* 경도  변경 Dispatch
  const setLongitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLongitude(value));
  };
  //* 근처 추천 장소 클릭시
  const onClickNearPlaces = () => {
    setPopupOpend(false);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationDispatch("근처 추천 장소");
        setLatitudeDispatch(coords.latitude);
        setLongitudeDispatch(coords.longitude);
      },
      (e) => {
        console.log(e);
      },
    );
  };

  // * 검색된 장소 클릭 시
  const onClickResult = async (placeId: string) => {
    try {
      const { data } = await getPlaceAPI(placeId);
      setLocationDispatch(data.location);
      setLatitudeDispatch(data.latitude);
      setLongitudeDispatch(data.longitude);
      setPopupOpend(false);
    } catch (error) {
      console.log(error);
    }
  };

  // * 검색어(location)가 변하면 장소 검색
  // input값이 변경될 때 장소 검색 & location 값이 변경될 때 검색
  useEffect(() => {
    // 검색어가 없는 경우
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      // 장소 검색
      searchPlaces();
    }
  }, [searchKeyword]);

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpend(false)}>
        <div className="search-room-bar-location-texts">
          <p className="search-room-bar-location-label">장소</p>
          <input
            ref={inputRef}
            type="text"
            value={location}
            onChange={(e) => setLocationDispatch(e.target.value)}
            placeholder="어디로 여행가세요?"
          />
        </div>
        {popupOpend && location !== "근처 추천 장소" && (
          <ul className="search-room-bar-loaction-results">
            {/* 장소가 비어있는 경우 */}
            {!location && (
              <li onClick={onClickNearPlaces} role="presentation">
                <span>근처 추천 장소</span>
              </li>
            )}
            {/* 장소가 비어있지 않은 경우 */}
            {!isEmpty(results) &&
              results?.map((result, index) => (
                <li key={index} role="presentation" onClick={() => onClickResult(result.placeId)}>
                  <span>{result.description}</span>
                </li>
              ))}
            {/* 검색 결과가 없는 경우 */}
            {location && isEmpty(results) && <li>검색 결과가 없습니다.</li>}
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchRoomBarLocation;
