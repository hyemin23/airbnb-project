import React, { useMemo } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import Selector from "@/common/Selector";
import { useSelector } from "../store";
import { registerRoomAction } from "@/store/registerRoom";
import { useDispatch } from "react-redux";
import { largeBuildingTypeList } from "@/lib/staticData";
import RadioGroup from "./common/RadioGroup";
import RegisterRoomFooter from "./register/RegisterRoomFooter";

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

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  .register-room-room-type-radio {
    margin-top: 80px;
    max-width: 485px;
    margin-bottom: 50px;
  }
  .register-room-is-setup-for-guest-radio {
    margin-bottom: 50px;
  }
`;

// 선택 불가능한 큰 범위 건물 유형
const disabledargebuildingTypeOptions = ["하나를 선택해주세요."];
const RegisterRoomBuilding: React.FC = () => {
  const dispatch = useDispatch();

  // largeBuildingType을 가져오는 selector(대분류)
  const largeBuildingType = useSelector((state) => state.registerRoom.largeBuildingType);

  // 빌딩 타입을 가져오는 selector(대분류-detail)
  const buildingType = useSelector((state) => state.registerRoom.buildingType);

  // radio room type
  const roomType = useSelector((state) => state.registerRoom.roomType);

  const isSetUpForGuest = useSelector((state) => state.registerRoom.isSetUpForGuest);

  // * 큰 범위 건물 유형 변경 시
  const onChangeLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomAction.setLargeBuildingType(event.target.value));
  };

  // * 선택된 건물 유형 options
  // 큰 범위 건물이 선택되면 해당 유형별 옵션 리스트를 불러옴
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트": {
        const { apartmentBuildingTypeList } = require("../lib/staticData");

        // reducer 빌딩 타입 설정
        console.log(apartmentBuildingTypeList[0]);
        dispatch(registerRoomAction.setBuildingType(apartmentBuildingTypeList[0]));

        // 전체 배열 return
        return apartmentBuildingTypeList;
      }
      case "주택": {
        const { houstBuildingTypeList } = require("../lib/staticData");
        registerRoomAction.setBuildingType(houstBuildingTypeList[0]);
        return houstBuildingTypeList;
      }
      case "별채": {
        const { secondaryUnitBuildingTypeList } = require("../lib/staticData");
        registerRoomAction.setBuildingType(secondaryUnitBuildingTypeList[0]);

        return secondaryUnitBuildingTypeList;
      }
      case "독특한 숙소": {
        const { uniqueSpaceBuildingTypeList } = require("../lib/staticData");
        registerRoomAction.setBuildingType(uniqueSpaceBuildingTypeList[0]);

        return uniqueSpaceBuildingTypeList;
      }
      case "B&B": {
        const { bnbBuildingTypeList } = require("../lib/staticData");
        registerRoomAction.setBuildingType(bnbBuildingTypeList[0]);

        return bnbBuildingTypeList;
      }
      case "부티크호텔": {
        const { boutiquesHotelBuildingTypeList } = require("../lib/staticData");
        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  const onChangeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 2단계 건물 유형 value 설정
    dispatch(registerRoomAction.setBuildingType(event.target.value));
  };

  // * 숙소 유형 radio options
  const roomTypeRadioOptions = [
    {
      label: "집전체",
      value: "entire",
      description:
        "게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실,욕실,부엌이 포함됩니다.",
    },
    {
      label: "개인실",
      value: "private",
      description: "게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.",
    },
    {
      label: "다인실",
      value: "public",
      description: "게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.",
    },
  ];

  // * 숙소 유형 변경시
  const onChangeRoomType = (value: any) => {
    dispatch(registerRoomAction.setRoomType(value));
  };

  // * 게스트만 사용하도록 만들어진 숙소인지 라디오 options
  const isSetUpForGuestOptions = [
    {
      label: "예, 게스트용으로 다로 마련된 숙소입니다.",
      value: true,
    },
    {
      label: "아니요, 제 개인 물건이 숙소에 있습니다.",
      value: false,
    },
  ];
  // * 게스트용 숙소인지 변경 시
  const onChangeIsSetUpForGuest = (value: any) => {
    dispatch(registerRoomAction.setIsSetUpForGuest(value));
  };

  // * 모든 값들이 있는지 확인
  const isValid = useMemo(() => {
    if (!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest === null) {
      // 값들이 비워져있으면 이동 불가능
      return false;
    }
    // 다음 페이지로 이동
    return true;
  }, [largeBuildingType, buildingType, roomType, isSetUpForGuest]);

  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="하나를 선택해주세요."
          disabledOptions={disabledargebuildingTypeOptions}
          isValid={!!largeBuildingType}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || undefined}
          onChange={onChangeBuildingType}
          disabled={!largeBuildingType}
          isValid={!!buildingType}
          label="건물 유형을 선택하세요."
          options={detailBuildingOptions}
        />
      </div>

      {buildingType && (
        <>
          <div className="register-room-room-type-radio">
            <RadioGroup
              isValid={!!roomType}
              label="게스트가 묵게 될 숙소 유형을 골라주세요."
              value={roomType}
              options={roomTypeRadioOptions}
              onChange={onChangeRoomType}
            />
          </div>
          <div className="register-room-is-setup-for-guest-radio">
            <RadioGroup
              isValid={isSetUpForGuest !== null}
              label="게스트만 사용하도록 만들어진 숙소인가요?"
              value={isSetUpForGuest}
              onChange={onChangeIsSetUpForGuest}
              options={isSetUpForGuestOptions}
            />
          </div>
        </>
      )}
      <RegisterRoomFooter isValid={isValid} prevHref="/" nextHref="/room/register/bedrooms" />
    </Container>
  );
};

export default RegisterRoomBuilding;
