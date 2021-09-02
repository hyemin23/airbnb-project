import { userAction } from "@/store/user";
import { logoutAPI } from "lib/api/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import OutsideClickHandler from "react-outside-click-handler";
import HamburgerIcon from "@/assets/svg/Icon/HamburgerIcon.svg";
import Link from "next/link";

// 로그인이 되었을 때 뷰를 컴포넌트로 분리
const HeaderUserProfile = () => {
  // * 유저 메뉴 열고,닫힘 여부
  const [isUsermenuOpen, setIsUsermenuOpen] = useState(false);

  // user객체는 useSelector로 불러오게되면 객체의 주소를 비교하므로 유저 정보가 변경되어 user가 변경된다면 객체가 새로 만들어져 user객체를 불러온 컴포넌트는 전부 리렌더링 됨.
  // userProfileImage 처럼 원시 타입으로 사용하면 방지할 수 있음.
  const userProfileImage = useSelector((state) => state.user.profileImage);
  const dispatch = useDispatch();

  // * 로그아웃
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
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpen) {
          setIsUsermenuOpen(false);
        }
      }}
    >
      <button className="header-user-profile" type="button" onClick={() => setIsUsermenuOpen((prev) => !prev)}>
        <HamburgerIcon />
        <img src={userProfileImage} className="header-user-profile-image" alt="" />
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
  );
};

export default HeaderUserProfile;
