import { StoredUserType } from "types/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Data from "lib/data";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.");
      }

      const user = Data.user.find({ email });

      if (!user) {
        res.statusCode = 404;
        return res.send("존재하지 않는 유저입니다.");
      }

      // * 비밀번호 일치 여부
      const isPasswordMatchd = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatchd) {
        res.statusCode = 403;
        return res.send("비밀번호가 일치하지 않습니다.");
      }

      // * 비밀번호 일치 시 비밀번호 제거하고 보내기 토큰과 함께
      const token = jwt.sign(String(user.id), process.env.JWT_SECRET_KEY!);

      res.setHeader(
        "Set-Cookie",
        `access_token=${token};path=/;expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toISOString};httponly`,
      );

      // delete사용 가능한 타입으로 바꿔주기
      const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;
      // password만 제거해서 보내주기
      delete userWithoutPassword.password;

      res.statusCode = 200;
      return res.send(user);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
    return res.end();
  }

  res.statusCode = 405;

  return res.end();
};
