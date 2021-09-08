import Button from "@/components/common/Button";
import React from "react";
import Link from "next/link";
import SearchIcon from "@/assets/svg/Icon/white_search.svg";
import { useSelector } from "@/store/index";
import { makeQueryString } from "@/lib/utils";

const SearchRoomButton = () => {
  const searchRoom = useSelector((state) => state.searchRoom);
  const roomListHref = makeQueryString("/room", searchRoom);

  return (
    <Link href={roomListHref}>
      <a>
        <Button icon={<SearchIcon />} color="amaranth" width="89px">
          검색
        </Button>
      </a>
    </Link>
  );
};

export default SearchRoomButton;
