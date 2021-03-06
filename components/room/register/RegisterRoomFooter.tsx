import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import BackArrowIcon from "@/assets/svg/Icon/footerBack.svg";
import Button from "@/common/Button";
import useValidateMode from "@/hooks/useValidateMode";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

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
interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}
const RegisterRoomFooter: React.FC<IProps> = ({ prevHref, nextHref, isValid = true }) => {
  const { setValidateMode } = useValidateMode();

  // * 계속 버튼 클릭 시
  const onClickNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      event.preventDefault();
      setValidateMode(true);
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <a>
          <Button onClick={onClickNext}>계속</Button>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;
