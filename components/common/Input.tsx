import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import useValidateMode from "@/hooks/useValidateMode";

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};
// 제네릭을 사용하여 props에 타입 추가
const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }

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

  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }

  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange}
        &:focus{
          border-color: ${palette.orange}
        }
      };
  `}

  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.dark_cyan};
      }
    `}
`;

// <input>태그가 가지는 속성들에 대한 type extends를 통해 IProps는 input태그가 갖고 있는 속성을 확장하여 사용
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element; //type이 JSX 엘리먼트(JSX 문법)인 icon 값
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  label?: string;
}

// ...props -> 나머지 속성 값
const Input: React.FC<IProps> = ({ icon, isValid = false, useValidation = true, errorMessage, label, ...props }) => {
  // validateMode는 useState에서 redux 값으로 변경하여 사용
  // 현재 state에서 값 가져오기 (commonActions.setValidateMode로 변경 가능)
  // hooks로 가져오기
  const { validateMode } = useValidateMode();

  return (
    <Container iconExist={!!icon} isValid={isValid} useValidation={validateMode && useValidation}>
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}
      <div className="input-icon-wrapper">{icon}</div>
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

// 공통 컴포넌트에는 props의 값들이 자주 변경됨. props의 값이 같다면 리렌더 방지
export default React.memo(Input);
