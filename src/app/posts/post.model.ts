import { Comment } from './comment.model';
export interface Post {
  postId: string;
  caption: string;
  imagePath: string;
  creator: {
    id: string,
    username: string;
    profile_pic: string;
  };
  comments: Comment[];
  likes: [];
}
