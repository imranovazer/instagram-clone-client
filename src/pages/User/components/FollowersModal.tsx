import React from "react";
import MyModal from "../../../components/MyModal";
import { User } from "../../../types";
import useIsFollow from "../../../hooks/useIsFollow";
import useLoading from "../../../hooks/useLoading";
import { userApi } from "../api";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import {
  addFollowingUser,
  removeUnfollowedUser,
} from "../../../redux/reducers/userSlice";
import { displayAlert } from "../../../redux/reducers/alertSlice";
import { Link } from "react-router-dom";

function FollowersModal({
  active,
  setActive,
  users,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  users: Array<User>;
}) {
  const MyUserData = useAppSelector((item) => item.user.user);
  const dispatch = useAppDispatch();
  const [isFollowing] = useIsFollow();
  const [followUser, isFollowLoading] = useLoading({
    callback: async (user: User) => {
      const res = await userApi.followUser(user._id);
      dispatch(addFollowingUser(user));

      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
    onError: () => {
      console.log("Error");
      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
  });
  const [unfollowUser, unfollowLoading] = useLoading({
    callback: async (id: string) => {
      const res = await userApi.unfollowUser(id);
      dispatch(removeUnfollowedUser(id));

      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
    onError: () => {
      console.log("Error");
      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
  });

  return (
    <MyModal active={active} setActive={setActive} heading="Followers">
      <div className="flex flex-col gap-4 p-4">
        {users &&
          users.map((user, key) => (
            <div key={key} className="px-2 flex items-center justify-between ">
              <Link
                to={
                  MyUserData._id === user._id ? "/profile" : `/user/${user._id}`
                }
                className="flex items-center gap-5"
              >
                <img
                  className="w-[50px] rounded-full"
                  src={`${import.meta.env.VITE_USER_IMG + user.photo}`}
                  alt="user"
                />
                <p className="font-bold">{user.username}</p>
              </Link>

              {MyUserData._id === user._id ? (
                <p>You</p>
              ) : isFollowing(user._id) ? (
                <button
                  onClick={() => unfollowUser(user._id)}
                  className=" bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded-lg font-bold text-sm"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => followUser(user)}
                  className=" bg-sky-500 text-white hover:bg-sky-600 py-2 px-3 rounded-lg font-bold text-sm"
                >
                  Follow
                </button>
              )}
            </div>
          ))}
      </div>
    </MyModal>
  );
}

export default FollowersModal;
