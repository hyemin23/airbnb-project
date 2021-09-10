import Button from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import { useSelector } from "@/store/index";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  position: sticky;
  top: 128px;
  padding: 24px 24px 16px;
  width: 362px;

  /* 사용 가능한 공간만큼만 사용하겠다는 의미 */
  height: fit-content;
  background-color: white;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 24px;

  .room-detail-reservation-info {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .room-detail-reservation-inputs {
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid ${palette.gray_71};
    border-radius: 8px;

    .room-detail-reservation-date-inputs {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      border-bottom: 1px solid ${palette.gray_71};

      .room-detail-reservation-check-in {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px 0 0 0;

        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 8px 0 0 0;
          cursor: pointer;
          border-right: 1px solid ${palette.gray_71};

          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }

      .room-detail-reservation-check-out {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px 0 0 0;

        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 8px 0 0 0;
          cursor: pointer;
          border-right: 1px solid ${palette.gray_71};

          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
    }
  }

  .room-detail-reservation-guests-count-wrapper {
    position: relative;
    .room-detail-reservation-guests-count {
      width: 100%;
      height: 56px;
      border-radius: 0 0 8px 8px;
      padding: 10px 12px;
      cursor: pointer;

      span {
        display: block;
        font-size: 10px;
        font-weight: 600;
        margin-bottom: 7px;
      }

      p {
        font-size: 14px;
        color: ${palette.gray_71};
      }
    }

    .room-detail-reservation-guests-popup {
    }
  }
`;

const RoomDetailReservation: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const checkInRef = useRef<HTMLLabelElement>(null);
  const checkOutRef = useRef<HTMLLabelElement>(null);

  const room = useSelector((state) => state.room.detail);
  if (!room) {
    return null;
  }

  // * 예약하기 클릭 시
  const onclickReservationButton = async () => {
    // 체크인이 비어있을 경우
    if (checkInRef.current && !startDate) {
      // 체크인 초점
      checkInRef.current.focus();
    }
    // 체크아웃이 비어있을 경우
    else if (checkOutRef.current && !endDate) {
      // 체크아웃 초점
      checkOutRef.current.focus();
    }
  };

  return (
    <Container>
      <p className="room-detail-reservation-info">요금을 확인하려면 날짜를 입력하세요.</p>
      <div className="room-detail-reservation-inputs">
        <div className="room-detail-reservation-date-inputs">
          <div className="room-detail-reservation-check-in">
            <label ref={checkInRef}>
              체크인
              <DatePicker
                placeholderText="날짜 추가"
                popperPlacement="top-end"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date as Date);
                }}
                openToDate={new Date()}
                selectsStart
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                minDate={new Date(room.startDate)}
                maxDate={new Date(room.endDate)}
                disabledKeyboardNavigation
              />
            </label>
          </div>
          <div className="room-detail-reservation-check-out">
            <label ref={checkOutRef}>
              체크아웃
              <DatePicker
                placeholderText="날짜추가"
                popperPlacement="top-end"
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                selectsEnd
                openToDate={new Date()}
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                disabledKeyboardNavigation
                minDate={new Date(startDate as Date)}
                maxDate={new Date(room.endDate)}
              />
            </label>
          </div>
        </div>
        <div className="room-detail-reservation-guests-count-wrapper">
          <div className="room-detail-reservation-guests-count">
            <span>인원</span>
            <p>게스트 1명</p>
          </div>
        </div>
      </div>
      <Button color="amaranth" width="100%" onClick={onclickReservationButton}>
        {startDate && endDate ? "예약하기" : "예약 가능 여부 보기"}
      </Button>
    </Container>
  );
};

export default RoomDetailReservation;