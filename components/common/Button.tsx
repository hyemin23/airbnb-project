import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

// * 버튼 색상 구하기
const getButtonColor = (color: string) => {
  console.log(color);
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};
const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  ${(props) => getButtonColor(props.color || "")}
`;

// button 타입을 확장시킨 속성 추가
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "dark_cyan";
}
const Button: React.FC<ButtonProps> = ({ children, color, ...props }) => {
  return (
    <Container {...props} color={color}>
      {children}
    </Container>
  );
};

// 공통 컴포넌트 최적화
export default React.memo(Button);
