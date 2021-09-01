import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

// 제네릭을 사용하여 props에 타입 추가
const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }

    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }

  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`;

// <input>태그가 가지는 속성들에 대한 type extends를 통해 IProps는 input태그가 갖고 있는 속성을 확장하여 사용
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element; //type이 JSX 엘리먼트(JSX 문법)인 icon 값
}

// ...props -> 나머지 속성 값
const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default Input;
