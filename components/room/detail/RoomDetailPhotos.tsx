import { useSelector } from "@/store/index";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  max-height: 465px;
  margin-bottom: 48px;

  .room-detail-one-photo {
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  .room-detail-photos-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
  }
  .room-detail-three-photos-first {
    position: relative;
    margin-right: 8px;
    width: 66.66%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .room-detail-three-photos-second {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 33.33%;
    img {
      height: calc((100% - 8px) / 2);
    }
  }

  .room-detail-five-photos-first {
    position: relative;
    margin-right: 8px;
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* 5장 이상인 경우 */
  .room-detail-five-photos-second {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 다음줄에 오도록 */
    flex-wrap: wrap;
    img {
      /* flext-direction이 column이므로 한칸에 2개로 알맞게 나누어 들어가도록 */
      /* calc함수는 띄어쓰기 구분하므로 조심하기 */
      width: calc((100% - 8px) / 2);
      height: calc((100% - 8px) / 2);
      /* column으로 정렬되어 있으니 첫번째 줄의 첫번째 자식 img 태그에게 margin 8px 를 줌 */
      /* ":"가 하나의 경우는 기본 선택자의 행위에대한 부분을 의미해요 */
      /* "::"는 요소가 아닌 내용 즉 text-node를 처리하거나, html 이아닌것에 처리하는경우는 ::를 사용 */
      &:first-child {
        margin-right: 8px;
      }
      /* 위에와는 다르게 부모의 3번째 위치하는 img태그에게 margin을 줌 */
      &:nth-child(3) {
        margin-right: 8px;
      }
    }
  }
`;

const RoomDetailPhotos = () => {
  const roomTitle = useSelector((state) => state.room.detail?.title);
  const photos = useSelector((state) => state.room.detail?.photos);

  // 사진이 없는 경우
  if (!photos) {
    return null;
  }

  // 사진이 1장인 경우
  if (photos.length === 1) {
    return (
      <Container>
        <div className="room-detail-one-photo">
          <img src={photos[0]} alt={roomTitle} />
        </div>
      </Container>
    );
  }

  // 사진이 3이면
  if (photos.length < 4) {
    return (
      <Container>
        <div className="room-detail-photos-wrapper">
          <div className="room-detail-three-photos-first">
            <img src={photos[0]} alt={roomTitle} />
          </div>
          <div className="room-detail-three-photos-second">
            <img src={photos[1]} alt={roomTitle} />
            <img src={photos[2]} alt={roomTitle} />
          </div>
        </div>
      </Container>
    );
  }

  // 사진이 5장 이상인 경우
  if (photos.length > 4) {
    return (
      <Container>
        <div className="room-detail-photos-wrapper">
          <div className="room-detail-five-photos-first">
            <img src={photos[0]} alt={roomTitle} />
          </div>
          <div className="room-detail-five-photos-second">
            <img src={photos[1]} alt={roomTitle} />
            <img src={photos[2]} alt={roomTitle} />
            <img src={photos[3]} alt={roomTitle} />
            <img src={photos[4]} alt={roomTitle} />
          </div>
        </div>
      </Container>
    );
  }

  return <Container>hello world</Container>;
};

export default RoomDetailPhotos;
