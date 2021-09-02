import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "@/assets/svg/logo/Logo.svg";
import TextLogo from "@/assets/svg/logo/TextLogo.svg";
import palette from "styles/palette";
import useModal from "@/hooks/useModal";
import { useSelector } from "../store";
import HamburgerIcon from "@/assets/svg/Icon/HamburgerIcon.svg";
import { useDispatch } from "react-redux";
import { authAction } from "@/store/auth";
import AuthModal from "./auth/AuthModal";
import OutsideClickHandler from "react-outside-click-handler";
import { logoutAPI } from "lib/api/auth";
import { userAction } from "@/store/user";
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

  /* profile */
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }

    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
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

  /* react-outside-click-handler div */
  /* div태그가 생기는데 이 태그에는 className안 먹힘 따라서 형제 연산자 적용 */
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;

    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;
const Header: React.FC = () => {
  // 모달 value 가져오기
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [isUsermenuOpen, setIsUsermenuOpen] = useState(false);

  const logOut = async () => {
    try {
      // 토큰 지우고 store 초기화
      await logoutAPI();
      dispatch(userAction.initUser());
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <Logo className="header-logo" />
          <TextLogo />
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
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
        </div>
      )}

      {/* outsideclickhandler 적용 */}
      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpen) {
              setIsUsermenuOpen(false);
            }
          }}
        >
          <button className="header-user-profile" type="button" onClick={() => setIsUsermenuOpen((prev) => !prev)}>
            <HamburgerIcon />
            <img src={user.profileImage} className="header-user-profile-image" alt="" />
          </button>
          {isUsermenuOpen && (
            <ul className="header-usermenu">
              <li>숙소관리</li>
              <Link href="/room/register/building">
                <a
                  role="presentation"
                  onClick={() => {
                    setIsUsermenuOpen(false);
                  }}
                >
                  <li>숙소 등록하기</li>
                </a>
              </Link>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={logOut}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
      {/* Modal 출력 */}
      <ModalPortal>
        {/* SignUpModal -> AuthModal 변경 auth값에 따라 회원가입과 로그인 모달을 띄우게 해주는 역할 */}
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
