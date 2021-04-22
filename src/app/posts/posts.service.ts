import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Comment } from './comment.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FriendService } from '../user/friend-request/friend.service';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
const Backend_Url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private imagePreview: any;
  private imageFile: File;
  private posts: Post[];
  private postsUpdated = new Subject<Post[]>();
  private loggedInUserId: string;

  constructor(private router: Router,
              private http: HttpClient,
              private friendService: FriendService,
              private authService: AuthService) { }
  createImagePreview (image: File) {
    this.imageFile = image;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.router.navigate(['/createpost']);
    };
    reader.readAsDataURL(image);
  }
  getLoggedInUserId () {
    this.loggedInUserId = this.authService.getUserId();
  }

  getImageData () {
    return { imagePreview: this.imagePreview, imageFile: this.imageFile };
  }

  getPosts() {
    this.http.get<{message: string, posts: any}>(Backend_Url + '/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        const finalComments: Comment[] = [];
        post.comments.forEach( commentReceived => {
          const comment = {
            id: commentReceived._id,
            text: commentReceived.text,
            creator: {
              id: commentReceived.creator.id,
              username: commentReceived.creator.username
            }
          };
          finalComments.push(comment);
        });
        return {
          postId: post._id,
          caption: post.caption,
          imagePath: post.imagePath,
          creator: {
            id: post.creator._id,
            username: post.creator.name,
            profile_pic: post.creator.profile_pic
          },
          comments: finalComments,
          likes: post.likes
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListner() {
    return this.postsUpdated.asObservable();
  }
  destroyPosts() {
    this.posts = [];
  }

  addPost(caption: string, image: File) {
    const postData = new FormData();
    postData.append('caption', caption);
    postData.append('image', image, caption);
    this.http.post<{message: string, post: Post}>(Backend_Url + '/posts', postData)
    .subscribe(responseData => {
      console.log(responseData);
      // const post: Post = {
      //   postId: responseData.post.postId,
      //   caption: responseData.post.caption,
      //   imagePath: responseData.post.imagePath,
      //   creator: {
      //     id: responseData.post.creator.id,
      //     username: responseData.post.creator.username
      //   }
      // };
      // this.posts.push(post);
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  // --------comments-----------/////

  addComment(comment: string, postId: string) {
    const commentData = {comment: comment, postId: postId };
    this.http.post<{message: string, comment: any}>(Backend_Url + '/comments', commentData)
      .subscribe(responseData => {
        const commentToUpload = {
          id: responseData.comment._id,
          text: responseData.comment.text,
          creator: {
            id: responseData.comment.creator.id,
            username: responseData.comment.creator.username
          }
        };
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.postId === postId);
        updatedPosts[oldPostIndex].comments.push(commentToUpload);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // ---------------likes----------------//

    likeUnlike(pId: string) {
      const postId = {
        postId: pId
      };
      this.http.post<{message: string, counter: number}>(Backend_Url + '/posts/like', postId)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.postId === pId);
                  // @ts-ignore
        const userIdIndex = updatedPosts[oldPostIndex].likes.indexOf(this.loggedInUserId);
        if (response.counter === 1) {
          // @ts-ignore
        updatedPosts[oldPostIndex].likes.push(this.loggedInUserId);
        } else {
          updatedPosts[oldPostIndex].likes.splice(userIdIndex, 1);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        }
      });
  }
}
