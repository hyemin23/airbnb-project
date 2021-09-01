import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "@/assets/svg/logo/Logo.svg";
import TextLogo from "@/assets/svg/logo/TextLogo.svg";
import palette from "styles/palette";
import SignUpModal from "@/components/SignUpModal";
import useModal from "@/hooks/useModal";

const Container = styled.div`
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  .header-logo-wrapper {
    display: flex;
    align-items: center;

    .header-logo {
      margin-right: 6px;
    }
  }

  /* Login button & Join Button */
  .header-auth-buttons {
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
  }

  .header-login-button {
    box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.18);
    &:hover {
      box-shadow: 0px 2px 8px rgb(0, 0, 0, 0.12);
    }
  }

  /* Modal */
  .modal-wrapper {
    .modal-contents {
      width: 400px;
      height: 400px;
      background-color: white;
      z-index: 11;
    }
  }
`;
const Header: React.FC = () => {
  // 모달 value 가져오기
  const { openModal, ModalPortal } = useModal();

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <Logo className="header-logo" />
          <TextLogo />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button type="button" className="header-sign-up-button" onClick={openModal}>
          회원가입
        </button>
        <button className="header-login-button">로그인</button>
      </div>
      {/* Modal 출력 */}
      <ModalPortal>
        <SignUpModal />
      </ModalPortal>
    </Container>
  );
};

export default Header;
