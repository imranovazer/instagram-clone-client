import { Post } from "../../../types";
import { FaComment, FaHeart } from "react-icons/fa6";

function PostCard({
  post,
  handlePostCardClick,
}: {
  post: Post | undefined | null;
  handlePostCardClick: any;
}) {
  return (
    
    post && (
      <div
        onClick={handlePostCardClick}
        className="w-full aspect-square	cursor-pointer relative group "
      >
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          className="absolute left-0 top-0 w-full h-full  hidden group-hover:flex
              
               justify-center gap-3 items-center text-white text-[25px]
            "
        >
          <p className="flex items-center gap-2">
            <FaHeart /> <span>{post?.likes?.length}</span>
          </p>
          <p className="flex items-center gap-2">
            <FaComment /> <span>{post?.comments?.length}</span>
          </p>
        </div>
        <img
          className="w-full aspect-square object-cover"
          src={`${import.meta.env.VITE_POST_IMG + post?.photo}`}
          alt="image"
        />
      </div>
    )
  );
}

export default PostCard;
