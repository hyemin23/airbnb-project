import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "@/assets/svg/logo/Logo.svg";
import TextLogo from "@/assets/svg/logo/TextLogo.svg";
import palette from "styles/palette";
import { useSelector } from "../store";
import HeaderAuths from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";

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
  // user객체는 useSelector로 불러오게되면 객체의 주소를 비교하므로 유저 정보가 변경되어 user가 변경된다면 객체가 새로 만들어져 user객체를 불러온 컴포넌트는 전부 리렌더링 됨.
  // userProfileImage 처럼 원시 타입으로 사용하면 방지할 수 있음.
  // const user = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <Logo className="header-logo" />
          <TextLogo />
        </a>
      </Link>
      {!isLogged && <HeaderAuths />}
      {/* outsideclickhandler 적용 */}
      {isLogged && <HeaderUserProfile />}
    </Container>
  );
};

export default Header;
