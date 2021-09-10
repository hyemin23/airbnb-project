import useValidateMode from "@/hooks/useValidateMode";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import WarningIcon from "@/assets/svg/Icon/warning.svg";

// 기존셀렉터 스타일
const normalSelectorStyle = css`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    font-size: 16px;
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/Icon/selecticon.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

// 숙소 등록에서 사용되는 스타일
const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }

  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/Icon/register_selectIcon.svg");
    background-position: right 14px center;
    background-repeat: no-repeat;
  }
`;

// 스타일 Props 설정

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: "register" | "normal";
}
const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === "normal" && normalSelectorStyle};
  ${({ type }) => type === "register" && RegisterSelectorStyle};

  select {
    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}

    &:disabled {
      background-image: url("/static/svg/Icon/disabled_register_selector_down_arrow.svg");
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
      cursor: not-allowed;
    }
  }

  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: "register" | "normal";
}

const Selector: React.FC<IProps> = ({
  label,
  options = [],
  disabledOptions = [],
  isValid,
  value,
  useValidation = true,
  errorMessage = "옵션을 선택하세요.",
  type = "normal",
  ...props
}) => {
  const { validateMode } = useValidateMode();

  return (
    <Container isValid={!!isValid} validateMode={validateMode && useValidation} type={type}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {/* 비활성화 옵션 확인 */}
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
      </label>
      {useValidation && validateMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

// 공통 컴포넌트 props 최적화
export default React.memo(Selector);
