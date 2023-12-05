import React from "react";
import { Post } from "../types";
import { FaHeart, FaComment } from "react-icons/fa";

const PostGrid = ({ data }: { data: [Post] }) => {
  return (
    <div className=" w-full grid grid-cols-3 transition-all">
      {data
        ? data.map((post, key) => (
            <div
              key={key}
              className="w-full aspect-square	cursor-pointer relative group "
            >
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                className="absolute left-0 top-0 w-full h-full  hidden group-hover:flex
              
               justify-center gap-3 items-center text-white text-[25px]
            "
              >
                <p className="flex items-center gap-2">
                  <FaHeart /> <span>{post.likes.length}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaComment /> <span>{post.comments.length}</span>
                </p>
              </div>
              <img
                className="w-full aspect-square object-cover"
                src={`${import.meta.env.VITE_POST_IMG + post.photo}`}
                alt="image"
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default PostGrid;
