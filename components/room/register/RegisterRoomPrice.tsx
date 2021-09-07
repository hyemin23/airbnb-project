import Input from "@/components/common/Input";
import { makeMoneyToString } from "@/lib/utill";
import { useSelector } from "@/store/index";
import { registerRoomAction } from "@/store/registerRoom";
import React from "react";
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
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-description-wrapper {
    width: 430px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const RegisterRoomPrice: React.FC = () => {
  const dispatch = useDispatch();

  const price = useSelector((state) => state.registerRoom.price);

  // 금액 변경시
  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // ","모두 없애기
    const numberPrice = Number(input.replace(/,/g, ""));
    // ? 인풋 값이 비워지면 price를 0 으로 변경
    if (!input) {
      dispatch(registerRoomAction.setPrice(0));
    }
    if (!numberPrice || numberPrice === 0) {
      dispatch(registerRoomAction.setPrice(0));
    }
    if (numberPrice !== 0) {
      dispatch(registerRoomAction.setPrice(numberPrice));
    }
  };

  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      {/* 금액을 입력하면 makeMoneyToStrign에서 ","를 넣어주나 */}
      <Input label="기본요금" value={makeMoneyToString(String(price))} onChange={onChangePrice} />
      <RegisterRoomFooter prevHref="/room/regiser/title" nextHref="/room/register/date" />
    </Container>
  );
};

export default RegisterRoomPrice;
