import { useState } from "react";
import { useAppSelector } from "../../redux/store/hooks";
import { IoMdGrid } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import PostGrid from "../../components/PostGrid";

function Profile() {
  const UserData = useAppSelector((item) => item.user.user);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className=" w-full ">
      <div className="container mx-auto max-w-[975px] py-10 px-5  flex flex-col items-center">
        <div className="UserData flex gap-[100px]  w-full border-b-2 py-5">
          <img
            className="w-[150px] rounded-full"
            src={`${import.meta.env.VITE_USER_IMG + UserData.photo}`}
            alt="ava"
          />
          <div className="flex flex-col gap-4">
            <div className="flex gap-10 items-center">
              <p className="font-bold text-lg">{UserData.username}</p>
              <button className="bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded-xl font-bold text-sm">
                Edit profile
              </button>
            </div>
            <div className="flex items-center gap-10">
              <p className="flex gap-2">
                <span className="font-bold">{UserData.posts.length}</span>
                posts
              </p>
              <p className="flex gap-2">
                <span className="font-bold">{UserData.followers.length}</span>{" "}
                folllowers
              </p>
              <p className="flex gap-2">
                <span className="font-bold">{UserData.following.length}</span>
                following
              </p>
            </div>
          </div>
        </div>

        <nav className="flex gap-10 py-4 text-gray-400">
          <button
            onClick={() => setActiveTab(0)}
            className={activeTab === 0 ? "text-black" : undefined}
          >
            <p className="flex items-center">
              <IoMdGrid />
              POSTS
            </p>
          </button>
          <button
            className={activeTab === 1 ? "text-black" : undefined}
            onClick={() => setActiveTab(1)}
          >
            <p className="flex items-center">
              <FaRegBookmark />
              FAVORİTES
            </p>
          </button>
        </nav>
        {activeTab === 0 ? (
          <PostGrid data={UserData.posts} />
        ) : (
          <PostGrid data={UserData.favoritePosts} />
        )}
      </div>
    </div>
  );
}

export default Profile;
