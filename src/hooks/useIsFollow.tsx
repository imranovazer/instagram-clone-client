import React from "react";
import { useAppSelector } from "../redux/store/hooks";

function useIsFollow() {
  const me = useAppSelector((item) => item.user.user);

  const isFollowing = (id: string | undefined) => {
    const foundindex = me.following.findIndex((item) => item._id === id);
    return foundindex === -1 ? false : true;
  };

  return [isFollowing];
}

export default useIsFollow;
