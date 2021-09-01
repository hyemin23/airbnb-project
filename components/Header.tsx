import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "@/assets/svg/logo/Logo.svg";
import TextLogo from "@/assets/svg/logo/TextLogo.svg";
import palette from "styles/palette";

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
`;
const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <Logo className="header-logo" />
          <TextLogo />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button type="button" className="header-sign-up-button">
          회원가입
        </button>
        <button className="header-login-button">로그인</button>
      </div>
    </Container>
  );
};

export default Header;
