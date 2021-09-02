// 사용자 인증에 관련된 api (1단계) 사용하기 쉽게 api로 만들기
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
  return axios.post<UserType>("/api/auth/signup", body);
};

// 로그인 api
export const loginAPI = (body: { email: string; password: string }) => {
  return axios.post<UserType>("/api/auth/login", body);
};

//* cookie의 access_token의 유저 정보를 받아오는 api
export const meAPI = () => axios.get<UserType>("/api/auth/loadMyData");
