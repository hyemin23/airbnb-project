import Data from "lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { StoredUserType } from "types/user";
import jwt from "jsonwebtoken";

// next api를 이용한 구현
// 회원가입을 위한 경로 (3단계)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, firstname, lastname, password, birthday } = req.body;

    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    //   이메일 중복 확인
    const userExist = Data.user.exist(email);
    if (userExist) {
      res.statusCode = 409;
      res.send("이미 가입된 메일입니다.");
    }

    //   비밀번호 암호화
    const hashedPassword = bcrypt.hashSync(password, 8);

    //   정보 저장
    const users = Data.user.getList();
    let userId;
    //   기존 유저들이 없는 경우
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    //   유저 정보를 암호화 하여 전달
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      //   최초 가입 시 기본 이미지로 만들어주기
      profileImage: "/static/image/default_profile_image.jpg",
    };

    //   기존 유저 배열에 추가 & 저장
    Data.user.write([...users, newUser]);

    //   유저 로그인을 위한 쿠키에 저장할 token 생성(JWT)
    //   secret 값은 인증에 관련된 것, 안전하게 환경변수에 저장하여 사용
    //   "!" 는 앞의 값이 확실히 null OR undefined가 아니라는 걸 알림 (typescript의 non-null assertions)
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET_KEY!);

    //   만든 토큰을 브라우저의 쿠키에 저장 response header에 쿠키 설정
    //   "Set-Cookie" 활용 브라우저에 저장
    //   3일 뒤 만료
    await new Promise((resolve) => {
      res.setHeader(
        "Set-Cookie",
        `access_token=${token};path=/;expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString()};HttpOnly`,
      );
      resolve(token);
    });

    //   토큰과 함께 생성된 유저 정보 전달 password 전달 X
    // StoredUserType의 password 속성을 Partial로 만든 Type을 만들어서 반환 타입에러 없이 delete사용가능
    const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> = newUser;
    delete newUserWithoutPassword.password;

    res.statusCode = 200;
    return res.send(newUser);
  }

  res.statusCode = 405;

  return res.end();
};
