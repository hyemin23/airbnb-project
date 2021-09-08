import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

// placeId로 장소에 대한 정보를 받아오는 api
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { placeId } = req.query;
    if (!placeId) {
      res.statusCode = 400;
      return res.send("placeId가 없습니다");
    }

    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
      );

      console.log("placeId data:", data);
      const { formatted_address: location } = data.results[0];
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        location,
        latitude: lat,
        longitude: lng,
      };
      res.statusCode = 200;
      return res.send(result);
    } catch (error) {
      res.statusCode = 404;
      console.log(e);
      return res.end();
    }
  }
};
