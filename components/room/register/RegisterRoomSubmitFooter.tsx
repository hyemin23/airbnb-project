import React from "react";
import styled from "styled-components";
import Link from "next/link";
import BackArrowIcon from "@/assets/svg/Icon/footerBack.svg";
import Button from "@/components/common/Button";
import palette from "styles/palette";
import { useSelector } from "@/store/index";
import { registerRoomAPI } from "@/lib/api/room";
import { useRouter } from "next/dist/client/router";

const Container = styled.footer`
  position: fixed;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

const RegisterRoomSubmitFooter: React.FC = () => {
  // hostId 대신해서 보내기
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  const router = useRouter();

  // 등록하기 클릭 시
  const onClickregisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };

    try {
      await registerRoomAPI(registerRoomBody);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Link href="/room/register/date">
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button width="102px" onClick={onClickregisterRoom} color="bittersweet">
        등록하기
      </Button>
    </Container>
  );
};

export default RegisterRoomSubmitFooter;
