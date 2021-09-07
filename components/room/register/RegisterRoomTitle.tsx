import Input from "@/components/common/Input";
import { useSelector } from "@/store/index";
import { registerRoomAction } from "@/store/registerRoom";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
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
`;

const RegisterRoomTitle = () => {
  const title = useSelector((state) => state.registerRoom.title);
  const dispatch = useDispatch();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomAction.setTitle(e.target.value));
  };

  return (
    <Container>
      <h2>숙소 제목을 입력하세요.</h2>
      <h3>9단계</h3>
      <div className="register-room-description-wrapper">
        <Input
          label="숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요"
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <RegisterRoomFooter prevHref="/room/register/description" nextHref="/room/register/price" />
    </Container>
  );
};

export default RegisterRoomTitle;
