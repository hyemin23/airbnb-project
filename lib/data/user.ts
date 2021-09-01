import { StoredUserType } from "./../../types/user.d";
import { readFileSync } from "fs";
import { writeFileSync } from "fs";

// DB접근과 같은 부분(4단계)

// 유저 리스트 data 불러오기
const getList = () => {
  //  filename의 파일을 [options]의 방식으로 읽은 후 문자열을 반환합니다.(동기적)
  const userBuffer = readFileSync("data/users.json");
  const userString = userBuffer.toString();

  if (!userString) {
    return [];
  }

  // 배열로 return
  const users: StoredUserType[] = JSON.parse(userString);
  return users;
};

// email의 유저가 있는지 중복 검사
const exist = ({ email }: { email: string }) => {
  // 유저목록을 가져오고
  const users = getList();

  // 넘어온 이메일과 기존 data에 이메일이 들어있는지 검사
  return users.some((user) => user.email === email);
};

// 유저 리스트 저장
const write = async (users: StoredUserType[]) => {
  writeFileSync("data/users.json", JSON.stringify(users));
};

export default { getList, exist, write };
