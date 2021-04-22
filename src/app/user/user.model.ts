export interface User {
  id: string;
  email: string;
  profile_pic: string;
  name: string;
  description: string;
  gender: string;
  posts: [];
  likes: number;
}
