import React from "react";

interface IProps {
  amenities: string;
}
const RoomAmentityIcon: React.FC<IProps> = ({ amenities }) => {
  const iconUrl = (amenities: string) => {
    switch (amenities) {
      case "TV":
        return "/static/svg/Icon/detail/tv.svg";
      case "무선 인터넷":
        return "/static/svg/Icon/detail/wifi.svg";
      case "난방":
        return "/static/svg/Icon/detail/thermometer.svg";
      case "에어컨":
        return "/static/svg/Icon/detail/ice.svg";
      case "다리미":
        return "/static/svg/Icon/detail/iron.svg";
      case "샴푸":
        return "/static/svg/Icon/detail/shampoo.svg";
      case "헤어 드라이어":
        return "/static/svg/Icon/detail/hair-dryer.svg";
      case "조식, 커피, 차":
        return "/static/svg/Icon/detail/coffee.svg";
      case "업무가능 공간/책상":
        return "/static/svg/Icon/detail/notebook.svg";
      case "벽난로":
        return "/static/svg/Icon/detail/fireplace.svg";
      case "옷장/서랍장":
        return "/static/svg/Icon/detail/closet.svg";
      case "게스트 전용 출입문":
        return "/static/svg/Icon/detail/door.svg";
      default:
        return "";
    }
  };

  return <img src={iconUrl(amenities)} alt="" />;
};

export default RoomAmentityIcon;
