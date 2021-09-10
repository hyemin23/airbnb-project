import { StoredReservation } from "./../../../types/reservation.d";
import { isEmpty } from "lodash";
import Data from "lib/data";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // ?숙소 등록하기
    try {
      const { userId, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount } = req.body;
      if (
        !userId ||
        !checkInDate ||
        !checkOutDate ||
        adultCount === undefined ||
        childrenCount === undefined ||
        infantsCount === undefined
      ) {
        res.statusCode = 400;
        return res.send("필수값이 없습니다.");
      }

      const reservations = Data.reservation.getList();

      if (isEmpty(reservations)) {
        const reservation: StoredReservation = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        Data.reservation.write([reservation]);
        res.statusCode = 201;
        return res.end();
      }

      // 비어있지 않은 경우
      const reservation = {
        id: reservations[reservations.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // data 저장

      Data.reservation.write([...reservations, reservation]);
      res.statusCode = 201;

      return res.end();
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
