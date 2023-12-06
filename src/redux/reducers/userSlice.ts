import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Post, User } from "../../types";

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

export const { setIsAuth, setILoading, setUser, logoutUser, addMyNewPost } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectIsLoading = (state: RootState) => state.user.loading;
export default userSlice.reducer;
