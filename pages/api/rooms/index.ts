import { StoredRoomType } from "@/types/room.d";
import Data from "lib/data";
import { isEmpty } from "lodash";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // ?숙소 등록하기
    try {
      const { largeBuildngType } = req.body;

      // rooms 는 배열
      const rooms = await Data.room.getList();

      // rooms가 비어있으면
      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        //   배열로 만들어 저장
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      // 비어있지 않은 경우
      const newRoom: StoredRoomType = {
        // 마지막 데이터 길이 +1의 id
        id: rooms[rooms.length - 1].id++,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.end();
    } catch (e) {
      console.log(e);
      return res.send(e as unknown);
    }
  }

  res.statusCode = 405;
  return res.end();
};
