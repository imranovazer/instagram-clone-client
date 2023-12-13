import axiosInstance from "../../../axios";

export const homeApi = {
  getFollowingUsersPosts: async () => {
    try {
      const posts = await axiosInstance.get("/post/following");
      return posts.data.data;
    } catch (error: any) {
      throw new Error("Unable to get posts");
    }
  },
};
