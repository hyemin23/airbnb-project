import useModal from "@/hooks/useModal";
import { authAction } from "@/store/auth";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";
import AuthModal from "./auth/AuthModal";

const HeaderAuthButtonContainer = styled.div`
  /* Login button & Join Button */
  button {
    height: 40px;
    padding: 0 16px;
    border: 0;
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
  }
  .header-sign-up-button {
    margin-right: 8px;
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }

  .header-login-button {
    box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.18);
    &:hover {
      box-shadow: 0px 2px 8px rgb(0, 0, 0, 0.12);
    }
  }
`;
// 리렌더링 방지 (모달 열고 닫을 때 마다 렌더링 되는거 막기 위해 분기)
const HeaderAuths: React.FC = () => {
  // 모달 value 가져오기
  const { openModal, ModalPortal, closeModal } = useModal();
  const dispatch = useDispatch();

  return (
    <>
      <HeaderAuthButtonContainer>
        <button
          type="button"
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authAction.setAuthMode("signup"));
            openModal();
          }}
        >
          회원가입
        </button>
        <button
          className="header-login-button"
          onClick={() => {
            dispatch(authAction.setAuthMode("login"));
            openModal();
          }}
        >
          로그인
        </button>
      </HeaderAuthButtonContainer>
      {/* Modal 출력 */}
      <ModalPortal>
        {/* SignUpModal -> AuthModal 변경 auth값에 따라 회원가입과 로그인 모달을 띄우게 해주는 역할 */}
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
