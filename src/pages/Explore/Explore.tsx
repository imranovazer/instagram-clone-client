import React, { useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import { ExplorApi } from "./api";
import { Post, User } from "../../types";
import PostGrid from "../../components/PostGrid/PostGrid";
import { ContainerLoading } from "../../components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaRegCompass } from "react-icons/fa6";

import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import useIsFollow from "../../hooks/useIsFollow";
import useLoading from "../../hooks/useLoading";
import { userApi } from "../User/api";
import { useAppDispatch } from "../../redux/store/hooks";
import {
  addFollowingUser,
  removeUnfollowedUser,
} from "../../redux/reducers/userSlice";
import { displayAlert } from "../../redux/reducers/alertSlice";

function Explore() {
  const dispatch = useAppDispatch();
  const [isFollow] = useIsFollow();
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [notFollowingUsers, setNotFollowingUsers] = useState<User[] | []>([]);
  const [getAllMessages, getIsLoading] = useFetching(async () => {
    const res = await ExplorApi.getNotMyPosts();

    setPosts(res);
  });
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
  const [getAllNotFollowingUsers, getUsersLoading] = useFetching(async () => {
    const res = await ExplorApi.getUnfollowingUsers();
    console.log(res);
    setNotFollowingUsers(res);
  });
  useEffect(() => {
    getAllMessages(null);
    getAllNotFollowingUsers(null);
  }, []);

  return (
    <div className="w-full">
      <div className="container mx-auto max-w-[1000px] flex items-center flex-col gap-10 py-5 px-5">
        <h2 className="font-bold text-[30px] flex items-center gap-5 ">
          <span>Explore</span> <FaRegCompass />
        </h2>
        <div className="w-full flex justify-center">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper w-full"
          >
            {getUsersLoading ? (
              <ContainerLoading />
            ) : (
              notFollowingUsers &&
              notFollowingUsers.map((user, key) => (
                <SwiperSlide key={key}>
                  <div className="mb-[50px] max-w-[200px] flex flex-col p-4 gap-5 items-center border-2 rounded-xl ">
                    <img
                      className="w-[200px] rounded-full"
                      src={`${import.meta.env.VITE_USER_IMG + user.photo}`}
                      alt="user"
                    />
                    <Link to={`/user/${user._id}`} className="font-bold">
                      {user.username}
                    </Link>
                    {isFollow(user._id) ? (
                      <button
                        onClick={() => unfollowUser(user._id)}
                        className="bg-gray-200 w-full hover:bg-gray-300 py-2 px-3 rounded-xl font-bold text-sm"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => followUser(user)}
                        className="bg-sky-500 w-full hover:bg-sky-600 text-white py-2 px-3 rounded-xl font-bold text-sm"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        {getIsLoading ? (
          <ContainerLoading />
        ) : (
          posts && <PostGrid data={posts} setPosts={setPosts} />
        )}
      </div>
    </div>
  );
}

export default Explore;
