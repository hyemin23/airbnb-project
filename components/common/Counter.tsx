import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import CounterPlus from "@/assets/svg/Icon/counter_plus.svg";
import CounterMius from "@/assets/svg/Icon/counter_minus.svg";
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .counter-label {
    font-size: 16px;
    color: ${palette.gray_48};
    font-weight: 600;
  }
  .counter-description {
    display: block;
    font-size: 14px;
    color: ${palette.gray_71};
  }
  .counter-contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;

    button {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid ${palette.dark_cyan};
      color: ${palette.dark_cyan};
      background-color: white;
      outline: none;
      cursor: pointer;
      font-size: 21px;
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
`;

interface IProps {
  label?: string;
  description?: string;
  value?: number;
  minValue?: number;
  increaseNum?: number;
  onChange?: (value: number) => void;
}

// 기본값 1 증가값 1 최솟값 1
const Counter: React.FC<IProps> = ({ label, value = 1, minValue = 0, increaseNum = 1, onChange, description }) => {
  return (
    <Container>
      <label className="counter-label">
        {label}
        {description && <span className="counter-description">{description}</span>}
      </label>

      <div className="counter-contents">
        <button
          type="button"
          disabled={value === minValue}
          // 버튼을 먼저 클릭하게되면 여기가 실행되면서 전달받은 onChange 이벤트가 있을 경우에만 값을 증가OR감소 시켜서 해당 value를 호출한곳의 onChange이벤트의 인수로 전달
          onClick={() => {
            if (onChange) {
              onChange(value - increaseNum);
            }
          }}
        >
          <CounterMius />
        </button>
        <p>{value}</p>
        <button
          type="button"
          onClick={() => {
            if (onChange) {
              onChange(value + increaseNum);
            }
          }}
        >
          <CounterPlus />
        </button>
      </div>
    </Container>
  );
};

export default Counter;
