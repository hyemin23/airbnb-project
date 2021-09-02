import { RootState, useSelector } from "@/store/index";
import React from "react";
import LoginModal from "../auths/LoginModal";
import SignUpModal from "../SignUpModal";

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  return (
    <>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </>
  );
};

export default AuthModal;
