import axiosInstance from "../../../axios";

export const userApi = {
  getUserById: async (id: string | undefined) => {
    try {
      const res = await axiosInstance.get(`/user/${id}`);
      return res.data.data;
    } catch (error) {
      throw new Error("Unable to fetch user");
    }
  },
  followUser: async (id: string | undefined) => {
    try {
      const res = await axiosInstance.post(`/user/follow/${id}`);
      return res.data.data;
    } catch (error) {
      throw new Error("Unable to follow user");
    }
  },
  unfollowUser: async (id: string | undefined) => {
    try {
      const res = await axiosInstance.delete(`/user/unfollow/${id}`);
      return res.data.data;
    } catch (error) {
      throw new Error("Unable to unfollow user");
    }
  },
};
