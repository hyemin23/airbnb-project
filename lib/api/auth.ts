// 사용자 인증에 관련된 api (1단계)
// baseURL : http://localhost:3000으로 설정해놨음
import axios from "axios";
import { UserType } from "@/types/user";

// 회원가입 body
interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 api
export const signupAPI = (body: SignUpAPIBody) => {
  // 여기서 pages/api/auth 컨트롤러로 넘어감(2단계)
  // request : signupapibody 형태 axios response : userType형태
  axios.post<UserType>("/api/auth/signup", body);
};
