import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  &:after {
    display: block;
    content: "";
    clear: both;
  }
  .checkbox-label {
    position: relative;
    height: 18px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    color: ${palette.gray_48};
    cursor: pointer;
    float: left;
    clear: both;
  }

  /** ie input x버튼 삭제 */
  input::-ms-clear {
    display: none;
  }

  /* checkbox 삭제 span으로 대체 */
  input[type="checkbox"] {
    margin: 0;
    border: 0;
    width: 0;
    height: 0;
    -webkit-appearance: none;
  }
  input[type="checkbox"]:checked {
    margin: 0;
    border: 0;
    -webkit-appearance: none;
  }
  input[type="checkbox"] + input {
    display: none;
  }

  /* span으로 checkbox 만들기 */
  input[type="checkbox"] + span {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    display: inline-block;
    flex-shrink: 0;
  }
  input[type="checkbox"] + span::before {
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    display: inline-table;
    border: 1px solid ${palette.gray_b0};
    border-radius: 2px;
    box-sizing: border-box;
    background-color: white;
    cursor: pointer;
  }

  input[type="checkbox"]:checked + span::before {
    content: "";
    width: 18px;
    height: 18px;
    display: inline-table;
    background-color: ${palette.dark_cyan};
    border: 0;
    border-radius: 2px;
    position: absolute;
    background-image: url("/static/svg/Icon/checkbox_mark.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

interface IProps {
  value?: string[];
  options?: string[];
  onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<IProps> = ({ value = [], options = [], onChange }) => {
  return (
    <Container>
      {options.map((option) => (
        <label className="checkbox-label" key={option}>
          <input
            type="checkbox"
            checked={value?.includes(option)}
            onChange={(e) => {
              // 체크된것들이 있으면
              if (e.target.checked) {
                //   현재 value = null
                //   지금 value에 option값 넣어 전달
                onChange([...value!, option]);
              }
              //   선택을 모두 해제 했다면
              else {
                //   해당 checkbox의 값과 value 값이 다르면 걔네들 빼고 나머지 값 return
                onChange(
                  value.filter((option_) => {
                    //   체크 해제된 애들만 빠고 나머지 return
                    return option_ !== option;
                  }),
                );
              }
            }}
          />
          <span />
          {option}
        </label>
      ))}
    </Container>
  );
};

export default CheckboxGroup;
