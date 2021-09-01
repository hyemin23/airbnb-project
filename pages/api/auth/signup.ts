// next api를 이용한 구현
// 회원가입을 위한 경로

import Data from "lib/data";
import { NextApiRequest, NextApiResponse } from "next";

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
  }

  res.statusCode = 405;

  return res.end();
};
