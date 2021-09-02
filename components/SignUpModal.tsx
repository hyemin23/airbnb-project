import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useDispatch } from "react-redux";
import { userAction } from "store/user";
import useValidateMode from "@/hooks/useValidateMode";
import PasswordWarning from "./auth/PasswordWarning";
import palette from "styles/palette";
import { authAction } from "@/store/auth";

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

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 10px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}
// 리렌더링 방지
const PASSWORD_MIN_LENGTH = 8;
const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  // 생일
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  // validateMode Hooks 가져오기
  const { setValidateMode } = useValidateMode();

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

  // * 비밀번호 validation
  const [passwordFocused, setPasswordFocuesd] = useState(false);

  // * 비밀번호 focus 시
  const onFocusPassword = useCallback(() => {
    setPasswordFocuesd(true);
  }, []);

  // * 비밀번호 확인 조건 1
  // 패스워드가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () => !password || !lastname || password.includes(lastname) || password.includes(email.split("@")[0]),
    [password, lastname, email],
  );

  // * 비밀번호 확인 조건2
  // 8자리 이상인지
  const isPasswordOverMinLength = useMemo(() => !!password && password.length >= PASSWORD_MIN_LENGTH, [password]);

  // * 비밀번호 확인 조건3
  // 숫자나 특수 기호를 포함하는지 (특수문자)
  const isPasswordHasNumverOrSymbol = useMemo(
    () => !(/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) || /[0-9]/g.test(password)),
    [password],
  );
  const toggleHidePassword = useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  // * 회원가입 폼 입력 값 확인
  const validateSignUpFrom = () => {
    if (!email || !lastname || !firstname || !password) {
      return false;
    }

    // 비밀번호 체크
    if (isPasswordHasNumverOrSymbol && isPasswordHasNameOrEmail && !isPasswordOverMinLength) {
      return false;
    }

    // 생년월일 셀렉터 값 체크
    if (!birthYear || !birthMonth || !birthDay) {
      return false;
    }

    // 모든 조건이 만족하면 true
    return true;
  };

  //* 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // state값 변경 기본 값 : false
    setValidateMode(true);

    console.log("가입 조건 확인 : ", validateSignUpFrom());

    // 가입 조건 확인
    if (validateSignUpFrom()) {
      // 가입 시도
      try {
        const signUpBody = {
          email,
          firstname,
          lastname,
          password,
          birthday: new Date(`${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`).toISOString(),
        };

        // 가입 정보 받아오기 password 제거된 상태로
        const { data } = await signupAPI(signUpBody);
        dispatch(userAction.setLoggedUser(data));
        closeModal();
      } catch (error) {
        console.dir(error);
      }
    }
  };

  // * 로그인 모달로 변경
  const onChangeLoginModal = () => {
    dispatch(authAction.setAuthMode("login"));
  };

  //언마운트시(컴포넌트가 사라질 때)
  // validateMode꺼주기
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

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
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다"
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성 (예:박)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="성을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름 (예:혜민)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 입력하세요."
        />
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
          useValidation
          isValid={!isPasswordHasNameOrEmail && isPasswordOverMinLength && !isPasswordHasNumverOrSymbol}
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={isPasswordHasNameOrEmail}
              text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다"
            />
            <PasswordWarning isValid={!isPasswordOverMinLength} text="최소 8자" />
            <PasswordWarning isValid={isPasswordHasNumverOrSymbol} text="숫자나 기호를 포함하세요." />
          </>
        )}
      </div>
      <p className="sign-up-birthday-label">생일</p>

      <div className="sign-up-modal-birhday-selectors">
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={["년"]}
            defaultValue="년"
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={["월"]}
            defaultValue="월"
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={["일"]}
            defaultValue="일"
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
      </div>

      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span className="sign-up-modal-set-login" role="presentation" onClick={onChangeLoginModal}>
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
