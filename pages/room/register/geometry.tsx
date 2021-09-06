import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

// 컴포넌트를 dynamic을 사용해서 ssr을 하지 않고 불러오게 함
// 이유 : 컴포넌트안에서 window를 사용할것이기 때문에 dynamic을 사용하여 ssr을 방지
const RegisterRoomGeometry = dynamic(import("@/components/room/register/RegisterRoomGeometry"), { ssr: false });

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
