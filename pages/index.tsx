import React from "react";
import { NextPage } from "next";
import Home from "@/components/home/Home";

// FC : children이 있는 경우에 VFC는 없는 경우에
const index: NextPage = () => {
  return <Home />;
};

export default index;
