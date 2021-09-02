import Data from "lib/data";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { StoredUserType } from "@/types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // client에서 보낸 쿠키(access token)
      const accessToken = req.headers.cookie;
      console.log("server accessToken : ", accessToken);

      if (!accessToken) {
        res.statusCode = 400;
        return res.send("access_token이 없습니다.");
      }
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!);
      console.log("jwt를 통해 인증받은 userId", userId);

      const user = Data.user.find({ id: Number(userId) });

      if (!user) {
        res.statusCode = 404;
        return res.send("사용자가 존재하지 않습니다.");
      }

      const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;

      delete userWithoutPassword.password;

      res.statusCode = 200;
      // password를 제거한 객체를 return client에서 data로 받을 수 있게
      return res.send(userWithoutPassword);
    } catch (error) {
      res.statusCode = 500;
      return res.send(error);
    }
  }
  res.statusCode = 405;
  return res.end();
};
