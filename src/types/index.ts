export interface Post {
  _id: string;
  name: string;
  description: string;
  photo: string;
  author: any;
  likes: [any];
  comments: [any];
}

export interface User {
  email: String;
  username: String;
  photo: String;

  _id: string;
  posts: [any];
  followers: [any];
  following: [any];
  favoritePosts: [Post];
}
