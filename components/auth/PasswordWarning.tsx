import styled from "styled-components";
import RedXIcon from "@/assets/svg/Icon/xIcon.svg";
import GreenCheckIcon from "@/assets/svg/Icon/checkIcon.svg";
import palette from "styles/palette";

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? palette.davidson_orange : palette.green)};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;
