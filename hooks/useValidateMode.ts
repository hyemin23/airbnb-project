import { commonActions } from "./../store/common";
import { useSelector } from "@/store/index";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();

  // 현재 상태 확인해주는 함수
  const validateMode = useSelector((state) => state.common.validateMode);

  // validateMode를 쉽게 변경하도록 해주는 함수
  const setValidateMode = (value: boolean) => {
    dispatch(commonActions.setValidateMode(value));
  };

  return { validateMode, setValidateMode };
};
