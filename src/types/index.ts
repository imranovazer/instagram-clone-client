export interface Post {
  _id: string;
  name: string;
  description: string;
  photo: string;
  author: User;
  likes: any[];
  comments: Comment[];
}

export interface Comment {
  _id: string | undefined;
  text: string;
  post: string | undefined;
  user: User;
}
export interface User {
  email: string;
  username: string;
  photo: string;
  _id: string;
  posts: Post[];
  followers: User[];
  following: User[];
  favoritePosts: Post[];
}
