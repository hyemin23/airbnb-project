// users.json에 저장될 유저 정보들의 타입들
// client에서 사용하는 user data는 password를 제공하지 않을 예정 && 프로필 이미지는 회원가입 시 기본으로 넣을 예정.
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};
