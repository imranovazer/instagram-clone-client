import { Post, User } from "../../types";
import PostCard from "./PostCard/PostCard";
import { useState } from "react";
import PostModal from "./PostModal/PostModal";

const PostGrid = ({
  data,
  setPosts,
}: {
  data: Post[] | [];
  setPosts?: React.Dispatch<React.SetStateAction<Post[] | []>>;
}) => {
  const [activePost, setActivePost] = useState<Post | null | undefined>(null);
  const [postModal, setPostModal] = useState<boolean>(false);
  const handlePostCardClick = (post: Post) => {
    setActivePost(post);
    setPostModal(true);
  };

  return (
    <div className=" w-full grid grid-cols-3 transition-all">
      {data
        ? data.map((post, key) => (
            <PostCard
              handlePostCardClick={() => handlePostCardClick(post)}
              key={key}
              post={post}
            />
          ))
        : null}

      {postModal && (
        <PostModal
          setPosts={setPosts}
          post={activePost}
          active={postModal}
          setActive={setPostModal}
          setActivePost={setActivePost}
        ></PostModal>
      )}
    </div>
  );
};

export default PostGrid;
