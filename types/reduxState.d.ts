import { UserType } from "@/types/user";

// redux store 저장을 위한 설정
// * 유저 redux state
export type UserState = UserType & {
  isLogged: boolean;
};
