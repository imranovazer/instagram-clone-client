import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Post, User, Comment } from "../../types";

// Define a type for the slice state

export interface UserState {
  isAuth: boolean;
  loading: boolean;
  user: User;
}

// Define the initial state using that type
const initialState: UserState = {
  isAuth: false,
  loading: true,
  user: {
    email: "",
    username: "",
    photo: "",
    posts: [],
    followers: [],
    following: [],
    favoritePosts: [],
    _id: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFollowingUser: (state, action: PayloadAction<User>) => {
      const updatedUser = {
        ...state.user,
        following: [...state.user.following, action.payload],
      };
      return { ...state, user: updatedUser };
    },
    removeUnfollowedUser: (state, action: PayloadAction<string | null>) => {
      const updatedUser = {
        ...state.user,
        following: state.user.following.filter(
          (user) => user._id !== action.payload
        ),
      };
      return { ...state, user: updatedUser };
    },
    deleteCommentIfPostInFavorites: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      const updatedUser = {
        ...state.user,
        favoritePosts: state.user.favoritePosts.map((post) => ({
          ...post,
          comments: post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        })),
      };
      return { ...state, user: updatedUser };
    },

    deleteCommentFromMyPost: (state, action: PayloadAction<string>) => {
      const updatedUser = {
        ...state.user,
        favoritePosts: state.user.favoritePosts.map((post) => ({
          ...post,
          comments: post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        })),
        posts: state.user.posts.map((post) => ({
          ...post,
          comments: post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        })),
      };

      // Return the new state
      return { ...state, user: updatedUser };
    },
    addCommentToOtherUserPostIfInMyFavorite: (
      state,
      action: PayloadAction<Comment | undefined>
    ) => {
      const postToCommentInFavorites = state.user.favoritePosts.find(
        (item) => item._id === action.payload?.post
      );
      if (postToCommentInFavorites) {
        const updatedUser = {
          ...state.user,
          favoritePosts: state.user.favoritePosts.map((post) =>
            post._id === action.payload?.post
              ? {
                  ...post,
                  comments: [...post.comments, action.payload],
                }
              : post
          ),
        };
        return { ...state, user: updatedUser };
      }
    },

    addCommentToMyPost: (state, action: PayloadAction<Comment | undefined>) => {
      // Find the post to comment
      // const postToComment = state.user.posts.find(
      //   (item) => item._id === action.payload?.post
      // );

      // const postToCommentInFavorites = state.user.favoritePosts.find(
      //   (item) => item._id === action.payload?.post
      // );

      // If the post is found, create a new state object
      // if (postToComment) {
      const updatedUser = {
        ...state.user,
        favoritePosts: state.user.favoritePosts.map((post) =>
          post._id === action.payload?.post
            ? {
                ...post,
                comments: [...post.comments, action.payload],
              }
            : post
        ),
        posts: state.user.posts.map((post) =>
          post._id === action.payload?.post
            ? {
                ...post,
                comments: [...post.comments, action.payload],
              }
            : post
        ),
      };

      // Return the new state
      return { ...state, user: updatedUser };
      // }

      // If the post is not found, return the original state
    },

    removeLikeFromDislikedPost: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      // Find the post to dislike
      const postToDislike = state.user.posts.find(
        (item) => item._id === action.payload
      );

      // If the post is found, create a new state object
      if (postToDislike) {
        const updatedUser = {
          ...state.user,
          posts: state.user.posts.map((post) =>
            post._id === action.payload
              ? {
                  ...post,
                  likes: post.likes.filter(
                    (like) => like._id !== state.user._id
                  ),
                }
              : post
          ),
        };

        // Return the new state
        return { ...state, user: updatedUser };
      }

      // If the post is not found, return the original state
      return state;
    },
    addLikeToLikedPost: (state, action: PayloadAction<string | undefined>) => {
      // Find the post to like
      const postToLike = state.user.posts.find(
        (item) => item._id === action.payload
      );

      // If the post is found, create a new state object
      if (postToLike) {
        const updatedUser = {
          ...state.user,
          posts: state.user.posts.map((post) =>
            post._id === action.payload
              ? {
                  ...post,
                  likes: [...post.likes, state.user], // Add the like to the array
                }
              : post
          ),
        };

        // Return the new state
        return { ...state, user: updatedUser };
      }

      // If the post is not found, return the original state
      return state;
    },
    removeLikedPost: (state, action: PayloadAction<string | undefined>) => {
      state.user.favoritePosts = state.user.favoritePosts.filter(
        (item) => item._id !== action.payload
      );
    },
    addLikedPost: (state, action: PayloadAction<Post>) => {
      state.user.favoritePosts.push(action.payload);
    },
    addMyNewPost: (state, action: PayloadAction<Post>) => {
      // console.log(action.payload);

      state.user.posts.push(action.payload);
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setILoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      (state.isAuth = false),
        (state.user = initialState.user),
        (state.loading = false);
    },
  },
});

export const {
  setIsAuth,
  setILoading,
  setUser,
  logoutUser,
  addMyNewPost,
  addLikedPost,
  addLikeToLikedPost,
  removeLikedPost,
  removeLikeFromDislikedPost,
  addCommentToMyPost,
  deleteCommentFromMyPost,
  addCommentToOtherUserPostIfInMyFavorite,
  deleteCommentIfPostInFavorites,
  addFollowingUser,
  removeUnfollowedUser,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectIsLoading = (state: RootState) => state.user.loading;
export default userSlice.reducer;
