import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@/assets/svg/Icon/CloseIcon.svg";
import MailIcon from "@/assets/svg/Icon/mail.svg";
import PersonIcon from "@/assets/svg/Icon/person.svg";
import ClosedPassword from "@/assets/svg/Icon/hidepassword.svg";
import OpenedEyeIcon from "@/assets/svg/Icon/showpassword.svg";
import Input from "./common/Input";
import Selector from "./common/Selector";
import { dayList, monthList, yearList } from "lib/staticData";
import Button from "./common/Button";
import { signupAPI } from "lib/api/auth";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: #ffffff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birhday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      width: 33.3333%;
    }
    .sign-up-modal-birthday-day-selector {
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
  }
`;

type Inputs = {
  example: string;
  exampleRequired: string;
};

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  // 생일
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  //* 생년월일 월 변경시
  const onChangeBirthMonth = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthMonth(event.target.value);
    },
    [birthMonth],
  );

  //* 생년월일 일 변경시
  const onChangeBirthDay = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthDay(event.target.value);
    },
    [birthDay],
  );

  //* 생년월일 년 변경시
  const onChangeBirthYear = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthYear(event.target.value);
    },
    [birthYear],
  );

  //* 이메일 주소 변경시
  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [email],
  );

  //* 이름 변경시
  const onChangeLastname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastname(event.target.value);
    },
    [lastname],
  );

  //* 성 변경시
  const onChangeFirstname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstname(event.target.value);
    },
    [firstname],
  );

  //* 비밀번호 변경시
  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [password],
  );

  const toggleHidePassword = useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //   회원가입 폼 제출하기
    try {
      const signUpBody = {
        email,
        firstname,
        lastname,
        password,
        birthday: new Date(`${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`).toISOString(),
      };
      await signupAPI(signUpBody);
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input placeholder="성 (예:박)" icon={<PersonIcon />} value={firstname} onChange={onChangeFirstname} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="이름 (예:혜민)" icon={<PersonIcon />} value={lastname} onChange={onChangeLastname} />
      </div>

      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <ClosedPassword onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <p className="sign-up-birthday-label">생일</p>

      <div className="sign-up-modal-birhday-selectors">
        <div className="sign-up-modal-birthday-year-selector">
          <Selector options={yearList} disabledOptions={["년"]} defaultValue="년" onChange={onChangeBirthYear} />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector options={monthList} disabledOptions={["월"]} defaultValue="월" onChange={onChangeBirthMonth} />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector options={dayList} disabledOptions={["일"]} defaultValue="일" onChange={onChangeBirthDay} />
        </div>
      </div>

      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;
