import Button from "@/components/common/Button";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import NavigationIcon from "@/assets/svg/Icon/navigation.svg";
import Selector from "@/components/common/Selector";
import { countryList } from "@/lib/staticData";
import Input from "@/components/common/Input";
import { useSelector } from "@/store/index";
import { registerRoomAction } from "@/store/registerRoom";
import { useDispatch } from "react-redux";
import { getLocationInfoAPI } from "@/lib/api/map";
import RegisterRoomFooter from "./RegisterRoomFooter";
const Container = styled.div`
  padding: 62px 30px 1000px;
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

  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }

  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px;
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
  }
`;

const disabledCountryOptions = ["국가/지역 선택"];

const RegisterRoomLoaction: React.FC = () => {
  // * 현재 주소 불러오기 로딩
  const [loading, setLoading] = useState(false);

  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector((state) => state.registerRoom.streetAddress);
  const detailAddress = useSelector((state) => state.registerRoom.detailAddress);
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const dispatch = useDispatch();

  //* 나라 변경시
  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomAction.setCountry(event.target.value));
  };

  //* 시/도 변경시
  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomAction.setCity(event.target.value));
  };

  //* 시/군/구 변경시
  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomAction.setDistrict(event.target.value));
  };

  //* 도로명주소 변경시
  const onChangeStreetAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomAction.setStreetAddress(event.target.value));
  };
  //*동호수 변경시
  const onChangeDetailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomAction.setDetailAddress(event.target.value));
  };
  //*우편번호 변경시
  const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomAction.setPostcode(e.target.value));
  };

  //* 현재 위치 불러오기 성공 시
  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      setLoading((prev) => !prev);
      // * 주소 정보 세팅
      dispatch(registerRoomAction.setCountry(currentLocation.country));
      dispatch(registerRoomAction.setCity(currentLocation.city));
      dispatch(registerRoomAction.setDistrict(currentLocation.district));
      dispatch(registerRoomAction.setStreetAddress(currentLocation.streetAddress));
      dispatch(registerRoomAction.setPostcode(currentLocation.postcode));
      dispatch(registerRoomAction.setLatitude(currentLocation.latitude));
      dispatch(registerRoomAction.setLongitude(currentLocation.longitude));
    } catch (e) {
      console.log(e);
      setLoading((prev) => !prev);
    }
  };

  // * 현재 위치 사용 클릭 시
  const onClickGetCurrentLocation = () => {
    setLoading((prev) => !prev);
    // getCurrentPosition은 첫 번째 인자로 성공했을 때 함수를, 두 번재 인자로 실패했을 때의 함수를 받는다.
    // 위치를 불러오는 데 성공했을 때 coords라는 값을 주고, lat,lon값이 현재 위치를 나타낸다.
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log("클릭:", e);
    });
  };

  return (
    <Container>
      <h2>숙소 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.</p>
      <div className="register-room-location-button-wrapper">
        <Button color="dark_cyan" colorReverse icon={<NavigationIcon />} onClick={onClickGetCurrentLocation}>
          {loading ? "불러오는 중..." : "현재 위치 사용"}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="국가/지역 선택"
          disabledOptions={disabledCountryOptions}
        />
      </div>

      <div className="register-room-location-city-district">
        <Input label="시/도" onChange={onChangeCity} value={city} />
        <Input label="시/군/구" onChange={onChangeDistrict} value={district} />
      </div>
      <div className="register-room-location-street-address">
        <Input label="도로명주소" onChange={onChangeStreetAdress} value={streetAddress} />
      </div>
      <div className="register-room-location-detail-address">
        <Input label="동호수(선택 사항)" onChange={onChangeDetailAddress} useValidation={false} value={detailAddress} />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" onChange={onChangePostcode} value={postcode} />
      </div>
      <RegisterRoomFooter prevHref="/room/register/bathroom" nextHref="/room/register/geometry" />
    </Container>
  );
};

export default RegisterRoomLoaction;
