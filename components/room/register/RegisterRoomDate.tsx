import DatePicker from "@/components/common/DatePicker";
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
  .register-room-date-wrapper {
    display: flex;
    align-items: center;
    label {
      span {
        display: block;
        margin-bottom: 8px;
      }
    }
    input {
      display: block;
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;

      &:placeholder {
        color: ${palette.gray_76};
      }
      &:focus {
        margin-right: 20px;
      }
    }
    .register-room-start-date {
      margin-right: 20px;
    }
  }
`;

const RegisterRoomDate: React.FC = () => {
  const dispatch = useDispatch();

  const startDate = useSelector((state) => state.registerRoom.startDate);
  const endDate = useSelector((state) => state.registerRoom.endDate);

  const dateStartDate = startDate ? new Date(startDate) : null;
  const dateEndDate = endDate ? new Date(endDate) : null;

  // * 예약 시작 날짜 변경 시
  // * 서울이 UTC시간 기준 +9 시간이기 때문에 9시간 전의 시간으로 표시됨 따라서 +9시간을 더해주기
  const onChangeStartDate = (date: Date | null) => {
    dispatch(registerRoomAction.setStartDate(date ? date.toISOString() : null));
  };

  const onChangeEndDate = (date: Date | null) => {
    dispatch(registerRoomAction.setEndDate(date ? date.toISOString() : null));
  };

  return (
    <Container>
      <h2>예약 가능 여부 설정하기</h2>
      <h3>11단계</h3>
      <div className="register-room-date-wrapper">
        <div className="register-room-start-date">
          <label>
            <span>예약 시작일</span>
            {/* DatePicker의 onChange 값 필수. */}
            <DatePicker
              onChange={onChangeStartDate}
              startDate={dateStartDate}
              selected={dateStartDate}
              monthsShown={2}
              minDate={new Date()}
            />
          </label>
        </div>

        <div className="register-room-end-date">
          <label>
            <span>예약 마감일</span>
            {/* DatePicker의 onChange 값 필수. */}
            <DatePicker
              onChange={onChangeEndDate}
              endDate={dateEndDate}
              selected={dateEndDate}
              monthsShown={2}
              minDate={new Date()}
            />
          </label>
        </div>
      </div>

      <RegisterRoomFooter prevHref="/room/register/price" nextHref="/room/register/checklist" />
    </Container>
  );
};

export default RegisterRoomDate;
