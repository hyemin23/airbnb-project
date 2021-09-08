import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

//  datpicker의 css import
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import palette from "styles/palette";

// 한글 버전을 위한 date-fns
import ko from "date-fns/locale/ko";
import { addHours } from "date-fns";

const Container = styled.div`
  width: 100%;
  height: 100%;

  .react-datepicker {
    padding: 16px 32px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
    border-radius: 32px;
    cursor: pointer;
  }

  .react-datepicker__triangle {
    border-bottom-color: white !important;
  }

  .react-datepicker__month-container {
    padding: 0 27px;
  }

  .react-datepicker__header {
    padding-top: 22px;
    font-size: 16px;
    font-weight: 600;
    border: 0;
    background-color: white;
  }

  .react-datepicker__navigation--previous {
    top: 40px;
    left: 56px;
    border: 0;
    background-image: url("/static/svg/Icon/datePicker/datepicker_left_arrow.svg");
    background-repeat: no-repeat;
  }

  .react-datepicker__navigation--next {
    top: 40px;
    right: 56px;
    border: 0;
    background-image: url("/static/svg/Icon/datePicker/datepciker_right_arrow.svg");
    background-repeat: no-repeat;
  }

  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: 600;
    font-family: Airbnb Cereal, sans-sans-serif;
  }

  .react-datepicker__day-names {
    padding-top: 16px;
  }
  .react-datepicker__day-name {
    width: 48px;
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: ${palette.gray_71};
  }

  .react-datepicker__moth {
    margin: 0;
  }

  .react-datepicker__day {
    width: 48px;
    height: 48px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: --apple-system, sans-serif;
    color: ${palette.black};
    outline: none;

    &:hover {
      border: 1px solid ${palette.black};
      color: ${palette.black};
      background-color: white;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${palette.gray_f7};
  }
  .react-datepicker__day--in-selecting-range {
    background-color: ${palette.gray_f7};
  }
  .react-datepicker__day--selected {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
    &:hover {
      background-color: ${palette.black};

      color: white;
    }
  }
  .react-datepicker__day--range-start {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--range-end {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--disabled {
    color: ${palette.gray_dd};
    cursor: no-drop;
    &:hover {
      border: 0;
    }
  }

  input {
    &::placeholder {
      font-size: 14px;
      opacity: 0.7;
      color: ${palette.gray_76};
    }
  }
`;

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, ...props }) => {
  return (
    <Container>
      <ReactDatePicker
        {...props}
        disabledKeyboardNavigation
        locale={ko}
        dateFormat="MM월 dd일"
        // 서울이 UTC시간 기준 +9 시간이기 때문에 9시간 전의 시간으로 표시됨 따라서 +9시간을 더해주기 date-fns 이용
        onChange={(date, event) => {
          if (date) {
            onChange(addHours(date as Date, 9), event);
          } else {
            onChange(null, event);
          }
        }}
      />
    </Container>
  );
};

export default DatePicker;
