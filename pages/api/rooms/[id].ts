import { StoredUserType } from "types/user";
import Data from "lib/data";
import { NextApiRequest, NextApiResponse } from "next";
// * 숙소 불러오기 api
// id로 숙소를 찾은 후 숙소의 hostId에 맞는 유저 정보 중 비밀번호 제거하여 RoomType으로 전달
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      // room정보 가져오기
      const room = Data.room.find(Number(id as string));
      if (room) {
        //hostId로   user정보 찾기
        const host = Data.user.find({ id: room.hostId });

        if (host) {
          const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> = host;

          // password 제거
          delete newUserWithoutPassword.password;

          // 기존 room 정보에 해당 uesr 정보를 추가
          const roomWithHost = { ...room, host: newUserWithoutPassword };
          res.statusCode = 200;
          return res.send(roomWithHost);
        }
        res.statusCode = 404;
        return res.send("호스트 정보가 없습니다.");
      }
      res.statusCode = 404;
      return res.send("해당 숙소가 없습니다.");
    } catch (error) {
      console.log(error);
    }
  }
  res.statusCode = 405;
  return res.end();
};
