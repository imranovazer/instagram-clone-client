import axiosInstance from "../../../axios";

export const ExplorApi = {
  getNotMyPosts: async () => {
    const res = await axiosInstance.get("/post/not-my-posts");
    return res.data.data;
  },
  getUnfollowingUsers: async () => {
    const res = await axiosInstance.get("/user/unfollowing-users");
    return res.data.data;
  },
};
