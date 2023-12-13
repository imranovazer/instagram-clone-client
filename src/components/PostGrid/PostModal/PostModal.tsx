import React, { ReactNode, useEffect, useState } from "react";
import { Post, Comment } from "../../../types";
import useLoading from "../../../hooks/useLoading";
import axiosInstance from "../../../axios";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { displayAlert } from "../../../redux/reducers/alertSlice";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import useIsLiked from "../../../hooks/useIsLiked";
import {
  addCommentToMyPost,
  addCommentToOtherUserPostIfInMyFavorite,
  addLikeToLikedPost,
  addLikedPost,
  deleteCommentFromMyPost,
  deleteCommentIfPostInFavorites,
  removeLikeFromDislikedPost,
  removeLikedPost,
} from "../../../redux/reducers/userSlice";

function PostModal({
  post,
  active,
  setActive,
  setActivePost,
  setPosts,
}: {
  setPosts: ((data: any) => void) | undefined | null;
  post: Post | undefined | null;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActivePost: React.Dispatch<React.SetStateAction<Post | null | undefined>>;
}) {
  const me = useAppSelector((state) => state.user.user);
  const [comment, setComment] = useState("");

  const [commentToBeDeleted, setCommentToBeDeleted] = useState<Comment | null>(
    null
  );

  const dispatch = useAppDispatch();
  const [isLiked] = useIsLiked();
  const [deleteComment, deleteCommentLoading] = useLoading({
    callback: async () => {
      const deletedComment = await axiosInstance.delete(
        `/post/comment/${commentToBeDeleted?._id}`
      );

      if (post?.author._id === me._id) {
        //@ts-ignore
        dispatch(deleteCommentFromMyPost(commentToBeDeleted._id));
      } else {
        if (setPosts) {
          setPosts((prevState: any) => {
            const newPosts = prevState?.map((post: Post) => {
              if (post._id === commentToBeDeleted?.post) {
                return {
                  ...post,
                  comments: post.comments.filter(
                    (item) => item._id !== commentToBeDeleted?._id
                  ),
                };
              } else {
                return post;
              }
            });
            return newPosts;
          });
        }
        //@ts-ignore

        dispatch(deleteCommentIfPostInFavorites(commentToBeDeleted._id));
      }

      setActivePost((prevState: any) => ({
        ...prevState,
        comments: prevState?.comments.filter(
          (item: any) => item._id !== commentToBeDeleted?._id
        ),
      }));
      setCommentToBeDeleted(null);
      dispatch(displayAlert({ type: true, title: "Comment deleted" }));
    },
    onError: (error) => {
      console.log(error);

      dispatch(
        displayAlert({ type: false, title: "Unable to delete comment" })
      );
    },
  });
  const [likePost, likePostLoading] = useLoading({
    callback: async () => {
      const likePost = await axiosInstance.post(`/post/like/${post?._id}`);
      dispatch(addLikedPost(likePost.data.post));

      if (post?.author._id === me._id) {
        dispatch(addLikeToLikedPost(post?._id));
      } else {
        //@ts-ignore
        setPosts((prevState: any) => {
          const newPosts = prevState?.map((item: Post) => {
            if (item._id === post?._id) {
              return {
                ...item,
                likes: [...item.likes, me],
              };
            } else {
              return item;
            }
          });
          return newPosts;
        });
      }
      setActivePost((prevState: any) => ({
        ...prevState,
        likes: [...prevState?.likes, me],
      }));
      dispatch(displayAlert({ type: true, title: "Post liked" }));
    },
    onError: (error) => {
      dispatch(displayAlert({ type: false, title: "Unable to like post" }));
    },
  });
  const [dislikePost, dislikePostLoading] = useLoading({
    callback: async () => {
      const dislikedPost = await axiosInstance.delete(
        `/post/unlike/${post?._id}`
      );
      dispatch(removeLikedPost(post?._id));

      if (post?.author?._id === me._id) {
        dispatch(removeLikeFromDislikedPost(post?._id));
      } else {
        //@ts-ignore
        setPosts((prevState) =>
          prevState?.map((item: Post) => {
            if (item._id === post?._id) {
              return {
                ...item,
                likes: item.likes.filter((item: any) => item._id !== me._id),
              };
            } else {
              return item;
            }
          })
        );
      }
      setActivePost((prevState: any) => ({
        ...prevState,
        likes: prevState?.likes.filter((item: any) => item._id !== me._id),
      }));
      dispatch(displayAlert({ type: true, title: "Post unliked" }));
    },
    onError: (error) => {
      dispatch(displayAlert({ type: false, title: "Unable to  dislike post" }));
    },
  });

  const [commentPost, commentPostLoading] = useLoading({
    callback: async () => {
      const postComment = await axiosInstance.post(
        `/post/comment/${post?._id}`,
        {
          text: comment,
        }
      );

      if (post?.author._id === me._id) {
        dispatch(
          addCommentToMyPost({
            _id: postComment.data.data._id,
            text: comment,
            user: me,
            post: post?._id,
          })
        );
      } else {
        if (setPosts) {
          //@ts-ignore
          setPosts((prevState: any) => {
            const newPosts = prevState?.map((item: Post) => {
              if (item._id === post?._id) {
                return {
                  ...item,
                  comments: [
                    ...item.comments,
                    {
                      _id: postComment.data.data._id,
                      text: comment,
                      user: me,
                      post: post?._id,
                    },
                  ],
                };
              } else {
                return item;
              }
            });
            return newPosts;
          });
        }
        dispatch(
          addCommentToOtherUserPostIfInMyFavorite({
            _id: postComment.data.data._id,
            text: comment,
            user: me,
            post: post?._id,
          })
        );
      }

      setActivePost((prevState: any) => ({
        ...prevState,
        comments: [
          ...prevState.comments,
          {
            _id: postComment.data.data._id,
            text: comment,
            user: me,
            post: post?._id,
          },
        ],
      }));

      dispatch(displayAlert({ type: true, title: "Post commented" }));
      setComment(" ");
    },
    onError: (error) => {
      dispatch(
        displayAlert({ type: false, title: error.response.data.message })
      );
    },
  });
  const handleComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commentPost(null);
  };
  const handleModalClose = () => {
    setActive(false);
    setActivePost(null);
  };
  const handleCommentClick = (comment: Comment) => {
    setCommentToBeDeleted(comment);
  };
  return active ? (
    <div
      className="fixed z-50   left-0 top-0 w-full h-full p-10 flex items-center justify-center "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={handleModalClose}
    >
      {commentToBeDeleted && (
        <div
          className="fixed z-50   left-0 top-0 w-full h-full p-10 flex items-center justify-center "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,

              ease: [0, 0.71, 0.2, 1.01],
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
            className="w-full max-w-[300px] flex flex-col  bg-white rounded-xl"
          >
            {commentToBeDeleted.user._id === me._id && (
              <button
                onClick={() => deleteComment(null)}
                className="text-red-500 w-full py-2 px-3"
              >
                Delete
              </button>
            )}
            <button
              onClick={() => setCommentToBeDeleted(null)}
              className=" w-full py-2 px-3"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,

          ease: [0, 0.71, 0.2, 1.01],
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
        className="w-full h-full  flex   bg-white rounded-sm"
      >
        <div className="left w-2/3">
          <img
            className="h-full w-full object-cover"
            src={`${import.meta.env.VITE_POST_IMG + post?.photo}`}
            alt="post"
          />
        </div>
        <div className="right w-1/3 flex  flex-col justify-between">
          <nav className="flex p-3 items-center gap-5   ">
            <div className="UserImage w-[45px] overflow-hidden rounded-full">
              <img
                className="w-full"
                src={`${import.meta.env.VITE_USER_IMG + post?.author.photo}`}
                alt="user"
              />
            </div>
            <p className="font-bold">{post?.author.username}</p>
          </nav>
          <nav className="flex p-3 items-center gap-5  border-b  border-gray-300">
            <p>{post?.description}</p>
          </nav>
          <div className="w-full flex flex-col   overflow-y-auto h-full    border-b  border-gray-300 max-h-full">
            {post?.comments.map((comment, key) => (
              <div key={key} className="flex gap-1 items-center group p-3">
                <div className="self-start m-1">
                  <img
                    className="w-[20px] rounded-full "
                    src={`${
                      import.meta.env.VITE_USER_IMG + comment?.user.photo
                    }`}
                    alt="userIcon"
                  />
                </div>

                <div className="h-full text-ellipsis overflow-x-hidden">
                  <div>
                    <span className="font-bold">{comment.user.username}</span>{" "}
                    <span className=" overflow-x-hidden">{comment.text}</span>
                  </div>
                  <button
                    //@ts-ignore
                    onClick={() => handleCommentClick(comment)}
                    className="font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-100"
                  >
                    ...
                  </button>
                </div>
              </div>
            ))}
          </div>
          <nav className="flex flex-col py-2 px-3   gap-2 text-[25px]">
            <div className="flex gap-5 text-black items-center">
              {!isLiked(post?._id) ? (
                <button onClick={likePost}>
                  <FaRegHeart />
                </button>
              ) : (
                <button className="text-red-500" onClick={dislikePost}>
                  <FaHeart />
                </button>
              )}

              <button>
                <FaRegComment />
              </button>
            </div>
            <p className="text-[16px] font-bold">{post?.likes.length} likes</p>
          </nav>

          <form
            onSubmit={handleComment}
            className="w-full flex items-center gap-3 p-4"
          >
            <textarea
              id="message"
              rows={1}
              className="resize-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Add a comment...."
              onChange={(event) => setComment(event.target.value)}
              value={comment}
            ></textarea>

            <button className="bg-sky-500 py-1 px-2 rounded-lg text-white">
              {commentPostLoading ? "Processing..." : "Post"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default PostModal;
