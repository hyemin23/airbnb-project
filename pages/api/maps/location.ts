import axios from "lib/api";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { latitude, longigude } = req.query;

    if (!latitude || !longigude) {
      res.statusCode = 400;
      return res.send("위치 정보가 없습니다.");
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longigude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`;

      //maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
      const { data } = await axios.get(url);
      const addressComponent = data.results[0].address_components;
      const { lat, lng } = data.results[0].geometry.location;

      const result = {
        latitude: Number(lat),
        longigude: Number(lng),
        country: addressComponent[4].long_name,
        city: addressComponent[3].long_name,
        district: addressComponent[2].long_name,
        streetAddress: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
        postcode: addressComponent[5].long_name,
      };

      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      res.statusCode = 404;
      return res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
};
