import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

// * 버튼 색상 구하기
const getButtonColor = (color: string) => {
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    case "white":
      return css`
        background-color: white;
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

const normalButtonStyle = css`
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
`;

// * register에서 사용되는 버튼 스타일
const RegisterButtonStyle = css`
  width: 161px;
  height: 45px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

const Container = styled.button<{ styleType: "normal" | "register" }>`
  ${({ styleType }) => (styleType === "register" ? RegisterButtonStyle : normalButtonStyle)};
  ${(props) => getButtonColor(props.color || "")}
`;

// button 타입을 확장시킨 속성 추가
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "dark_cyan" | "white";
  styleType?: "normal" | "register";
}
const Button: React.FC<ButtonProps> = ({ children, color, styleType = "normal", ...props }) => {
  return (
    <Container {...props} color={color} styleType={styleType}>
      {children}
    </Container>
  );
};

// 공통 컴포넌트 최적화
export default React.memo(Button);
