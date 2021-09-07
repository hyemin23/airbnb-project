import Button from "@/components/common/Button";
import { useSelector } from "@/store/index";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";
import UploadIcon from "@/assets/svg/Icon/upload.svg";
import { isEmpty } from "lodash";
import { uploadFileAPI } from "@/lib/api/file";
import { useDispatch } from "react-redux";
import { registerRoomAction } from "@/store/registerRoom";
import RegisterRoomPhotoCardList from "./RegisterRoomPhotoCardList";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-upload-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 6px;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterRoomPhoto = () => {
  const photos = useSelector((state) => state.registerRoom.photos);
  const dispatch = useDispatch();

  //* 이미지 업로드 하기
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        // 원인은 모르겠으나, api를 불러오면 안되므로 대치
        // const { data } = await axios.post("/api/files/upload", formdata);

        // 아마 aws-sdk 등 버전 문제인것같음
        const { data } = await uploadFileAPI(formdata);

        console.log(data);

        // 사진 상태 저장
        if (data) {
          dispatch(registerRoomAction.setPhotos([...photos, data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <h2>숙소 사진 올리기</h2>
      <h3>7단계</h3>
      <p className="register-room-step-info">등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.</p>

      {isEmpty(photos) && (
        <div className="register-room-upload-photo-wrapper">
          <>
            <input type="file" accept="image/*" onChange={uploadImage} />
            <Button icon={<UploadIcon />} color="bittersweet" width="167px">
              사진 업로드
            </Button>
          </>
        </div>
      )}
      {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}

      <RegisterRoomFooter prevHref="/room/register/conveniences" nextHref="/room/register/" />
    </Container>
  );
};

export default RegisterRoomPhoto;
