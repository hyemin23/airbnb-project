import axios from "lib/api";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;
    if (!keyword) {
      res.statusCode = 400;
      return res.send("키워드가 없습니다.");
    }
    try {
      // https://developers.google.com/maps/documentation/places/web-service/query?hl=en
      // 키워드를 인코딩하여 보내야함
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAP_API
        }&language=ko&input=${encodeURI(keyword as string)}`,
      );

      // * description과 placeId 전달
      const results = data.predictions.map((prediction: any) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));
      res.statusCode = 200;
      res.send(results);
    } catch (error) {
      res.statusCode = 404;
      return res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
};
