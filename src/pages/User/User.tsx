import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { IoMdGrid } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import PostGrid from "../../components/PostGrid/PostGrid";
import { Link, useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import { userApi } from "./api";
import { Post, User } from "../../types";
import Loading from "../../components/Loading";
import useIsFollow from "../../hooks/useIsFollow";
import useLoading from "../../hooks/useLoading";
import { displayAlert } from "../../redux/reducers/alertSlice";

import {
  addFollowingUser,
  removeUnfollowedUser,
  setUser,
} from "../../redux/reducers/userSlice";
import FollowingModal from "./components/FollowingModal";
import FollowersModal from "./components/FollowersModal";

function User() {
  const [isFollowing] = useIsFollow();
  const userId = useParams<{ id: string }>().id;
  const MyData = useAppSelector((item) => item.user.user);
  const [userData, setUserData] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useAppDispatch();
  const [followersModal, setFollowersModal] = useState<boolean>(false);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followUser, isFollowLoading] = useLoading({
    callback: async () => {
      const res = await userApi.followUser(userData?._id);
      if (userData) {
        dispatch(addFollowingUser(userData));
      }

      setUserData((prevState: any) => ({
        ...prevState,
        followers: [...prevState.followers, MyData],
      }));
      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
    onError: () => {
      console.log("Error");
      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
  });
  const [unfollowUser, unfollowLoading] = useLoading({
    callback: async () => {
      const res = await userApi.unfollowUser(userData?._id);
      dispatch(removeUnfollowedUser(userData?._id || null));
      setUserData((prevState: any) => ({
        ...prevState,
        followers: prevState.followers.filter(
          (item: any) => item._id !== MyData._id
        ),
      }));

      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
    onError: () => {
      console.log("Error");
      dispatch(displayAlert({ type: true, title: "User followed" }));
    },
  });

  const [getUser, getIsLoading] = useFetching(async () => {
    const res = await userApi.getUserById(userId);
    setPosts(res.posts);
    setUserData(res);
  });

  useEffect(() => {
    getUser(null);
  }, []);

  return getIsLoading ? (
    <Loading />
  ) : userData ? (
    <div className=" w-full ">
      <div className="container mx-auto max-w-[975px] py-10 px-5  flex flex-col items-center">
        <div className="UserData flex gap-[100px]  w-full border-b-2 py-5">
          <img
            className="w-[150px] rounded-full"
            src={`${import.meta.env.VITE_USER_IMG + userData.photo}`}
            alt="ava"
          />
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 items-center">
              <p className="font-bold text-lg">{userData.username}</p>

              {isFollowing(userData._id) ? (
                <button
                  onClick={unfollowUser}
                  className=" bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded-lg font-bold text-sm"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={followUser}
                  className=" bg-sky-500 text-white hover:bg-sky-600 py-2 px-3 rounded-lg font-bold text-sm"
                >
                  Follow
                </button>
              )}
              <button className="bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded-lg font-bold text-sm">
                Message
              </button>
            </div>
            <div className="flex items-center gap-10">
              <p className="flex gap-2">
                <span className="font-bold">{posts?.length}</span>
                posts
              </p>
              <p
                className="flex gap-2 cursor-pointer"
                onClick={() => setFollowersModal((prevState) => !prevState)}
              >
                <span className="font-bold ">{userData.followers.length}</span>{" "}
                folllowers
              </p>
              <p
                onClick={() => setFollowingModal((prevState) => !prevState)}
                className="flex gap-2 cursor-pointer"
              >
                <span className="font-bold ">{userData.following.length}</span>
                following
              </p>
            </div>
          </div>
        </div>

        <nav className="flex gap-10 py-4 text-gray-400">
          <button className="text-black">
            <p className="flex items-center">
              <IoMdGrid />
              POSTS
            </p>
          </button>
        </nav>
        <PostGrid data={posts} setPosts={setPosts} />
      </div>
      {followersModal && (
        <FollowersModal
          users={userData.followers}
          active={followersModal}
          setActive={setFollowersModal}
        />
      )}
      {followingModal && (
        <FollowingModal
          users={userData.following}
          active={followingModal}
          setActive={setFollowingModal}
        />
      )}
    </div>
  ) : (
    <div>User not found</div>
  );
}

export default User;
