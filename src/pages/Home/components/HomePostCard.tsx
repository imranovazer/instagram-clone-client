import { Post } from "../../../types";
import { Link } from "react-router-dom";

import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa6";
import useIsLiked from "../../../hooks/useIsLiked";

function HomePostCard({
  post,
  likePost,
  dislikePost,
  setActivePost,
  setActive,
}: {
  post: Post;
  likePost: (data: any) => void;
  dislikePost: (data: any) => void;
  setActivePost: (data: any) => void;
  setActive: (data: any) => void;
}) {
  const [isLiked] = useIsLiked();
  return (
    <div className="flex flex-col w-full max-w-[540px] shadow-xl py-4 rounded-lg">
      <Link
        to={`/user/${post.author._id}`}
        className="flex p-3 items-center gap-5   "
      >
        <div className="UserImage w-[45px] overflow-hidden rounded-full">
          <img
            className="w-full"
            src={`${import.meta.env.VITE_USER_IMG + post?.author.photo}`}
            alt="user"
          />
        </div>
        <p className="font-bold">{post?.author.username}</p>
      </Link>
      <img src={`${import.meta.env.VITE_POST_IMG + post?.photo}`} alt="post" />
      <nav className="flex flex-col py-2 px-3   gap-2 text-[25px]">
        <div className="flex gap-5 text-black items-center">
          {!isLiked(post?._id) ? (
            <button onClick={() => likePost(post._id)}>
              <FaRegHeart />
            </button>
          ) : (
            <button
              className="text-red-500"
              onClick={() => dislikePost(post._id)}
            >
              <FaHeart />
            </button>
          )}

          <button
            onClick={() => {
              setActivePost(post);
              setActive(true);
            }}
          >
            <FaRegComment />
          </button>
        </div>
        <p className="text-[16px] font-bold">{post?.likes.length} likes</p>
      </nav>
      <div className="px-3">
        <p>
          <span className="font-bold">{post.author.username}</span>{" "}
          {post.description}
        </p>
      </div>
    </div>
  );
}

export default HomePostCard;
