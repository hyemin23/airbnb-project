import React from "react";
import styled from "styled-components";
import CheckMarkIcon from "@/assets/svg/Icon/check_mark.svg";
import Link from "next/link";
import Button from "@/components/common/Button";
import palette from "styles/palette";

const Container = styled.li`
  display: inline-block;
  padding: 16px 0;
  a {
    display: flex;
    align-items: center;
    svg {
      margin-right: 12px;
    }
    span {
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
    }
  }

  .register-room-check-step-in-progress {
    margin-left: 28px;
  }

  .register-room-check-step-continue-button {
    margin: 8px 0 0 28px;
  }

  .disabled-step {
    margin-left: 28px;
    font-size: 16px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  step: string;
  href: string;
  disabled: boolean;
  inProgress: boolean;
}

const RegisterRoomCheckStep: React.FC<IProps> = ({ step, href, disabled, inProgress }) => {
  // 제일먼저 진행중인 단계부터 확인 (제일 우선)
  if (inProgress) {
    return (
      <Container>
        <Link href={href}>
          <a className="register-room-check-step-in-progress">
            <span>{step}</span>
          </a>
        </Link>
        <Link href={href}>
          <a className="register-room-check-step-continue-button">
            <Button color="bittersweet" size="small" width="55px">
              계속
            </Button>
          </a>
        </Link>
      </Container>
    );
  }

  // 비활성화 아직 진행하지 않은 단계
  if (disabled) {
    return (
      <Container>
        <p className="disabled-step">{step}</p>
      </Container>
    );
  }
  return (
    <Container>
      <Link href={href}>
        <a>
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomCheckStep;
