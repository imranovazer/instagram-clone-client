import React, { useEffect, useState } from "react";
import { homeApi } from "./api";
import useFetching from "../../hooks/useFetching";
import { Post } from "../../types";
import { FaRegCompass } from "react-icons/fa6";

import Loading, { ContainerLoading } from "../../components/Loading";
import HomePostCard from "./components/HomePostCard";
import useLoading from "../../hooks/useLoading";
import axiosInstance from "../../axios";
import { addLikedPost, removeLikedPost } from "../../redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import PostModal from "../../components/PostGrid/PostModal/PostModal";
import { Link } from "react-router-dom";
function Home() {
  const MyData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [postModal, setPostModal] = useState(false);
  const [activePost, setActivePost] = useState<Post | null | undefined>(null);
  const [getAllPosts, getIsLoading] = useFetching(async () => {
    const res = await homeApi.getFollowingUsersPosts();
    console.log(res);
    setPosts(res);
  });
  useEffect(() => {
    getAllPosts(null);
  }, []);
  const [dislikePost, dislikePostLoading] = useLoading({
    callback: async (id) => {
      const dislikedPost = await axiosInstance.delete(`/post/unlike/${id}`);
      dispatch(removeLikedPost(id));
      setPosts((prevState: any) => {
        const newPosts = prevState?.map((post: Post) => {
          if (post._id === id) {
            return {
              ...post,
              likes: post.likes.filter((item) => item._id !== MyData._id),
            };
          } else {
            return post;
          }
        });
        return newPosts;
      });

      dispatch(displayAlert({ type: true, title: "Post unliked" }));
    },
    onError: (error) => {
      dispatch(displayAlert({ type: false, title: "Unable to  dislike post" }));
    },
  });
  const [likePost, likePostLoading] = useLoading({
    callback: async (id: string) => {
      const likePost = await axiosInstance.post(`/post/like/${id}`);

      dispatch(addLikedPost(likePost.data.post));

      setPosts((prevState: any) => {
        const newPosts = prevState?.map((post: Post) => {
          if (post._id === id) {
            return {
              ...post,
              likes: [...post.likes, MyData],
            };
          } else {
            return post;
          }
        });
        return newPosts;
      });

      dispatch(displayAlert({ type: true, title: "Post liked" }));
    },
    onError: (error) => {
      dispatch(displayAlert({ type: false, title: "Unable to like post" }));
    },
  });
  return (
    <div className="w-full">
      <div className="container items-center ms-auto p-4  gap-10 flex flex-col">
        {getIsLoading ? (
          <ContainerLoading />
        ) : posts && posts?.length > 0 ? (
          posts.map((post, key) => (
            <HomePostCard
              setActivePost={setActivePost}
              setActive={setPostModal}
              dislikePost={dislikePost}
              likePost={likePost}
              post={post}
              key={key}
            />
          ))
        ) : (
          <div className="w-full border-2 rounded-lg p-10 flex flex-col items-center gap-10">
            <p className="text-[50px]">
              <FaRegCompass />
            </p>
            <p> You are not following anything</p>
            <p className="font-bold">Start to explore</p>

            <Link
              to="explore"
              className="w-full px-4 py-1 bg-sky-500 text-white text-center font-bold rounded-lg"
            >
              Start
            </Link>
          </div>
        )}
      </div>
      {postModal && (
        <PostModal
          setPosts={setPosts}
          post={activePost}
          active={postModal}
          setActive={setPostModal}
          setActivePost={setActivePost}
        />
      )}
    </div>
  );
}

export default Home;
