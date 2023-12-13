import React from "react";
import { useAppSelector } from "../redux/store/hooks";

function useIsLiked() {
  const me = useAppSelector((item) => item.user.user);

  const isLiked = (id: string | undefined) => {
    const foundindex = me.favoritePosts.findIndex((item) => item._id === id);
    return foundindex === -1 ? false : true;
  };

  return [isLiked];
}

export default useIsLiked;
