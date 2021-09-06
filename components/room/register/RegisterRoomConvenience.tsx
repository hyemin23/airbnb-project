import CheckboxGroup from "@/components/common/CheckboxGroup";
import { convinienceList } from "@/lib/staticData";
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

const RegisterRoomConvenience: React.FC = () => {
  const dispatch = useDispatch();

  const convinience = useSelector((state) => state.registerRoom.conveniences);

  const onChangeConvinience = (selected: string[]) => {
    dispatch(registerRoomAction.setConveniences(selected));
  };
  return (
    <Container>
      <h2>게스트가 어떤 공간을 사용할 수 있나요?</h2>
      <h3>6단계</h3>
      <p className="register-room-step-info">등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.</p>
      <div className="register-room-conviniences-checkbox-group-wrapper">
        <CheckboxGroup value={convinience} options={convinienceList} onChange={onChangeConvinience} />
      </div>
      <RegisterRoomFooter prevHref="/room/register/amenities" nextHref="/room/register/photo" />
    </Container>
  );
};

export default RegisterRoomConvenience;
