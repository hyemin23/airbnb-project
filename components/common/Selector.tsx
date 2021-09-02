import useValidateMode from "@/hooks/useValidateMode";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    /* 브라우저에 내장된 효과 제거 */
    -webkit-appearance: none;
    background-image: url("/static/svg/Icon/selecticon.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }

  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny}!important;

        background-color: ${isValid ? "white" : palette.snow};
      };
      
      }
    `};
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid: boolean;
}

const Selector: React.FC<IProps> = ({ options = [], disabledOptions = [], isValid, value, ...props }) => {
  const { validateMode } = useValidateMode();

  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

// 공통 컴포넌트 props 최적화
export default React.memo(Selector);
