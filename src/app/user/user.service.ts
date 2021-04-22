import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
const Backend_Url = environment.apiUrl + '/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: User;
private userUpdated = new Subject<User>();
posts: Post[];


  constructor(private http: HttpClient,
              private router: Router,
              private postsService: PostsService) { }

  getUser(userId: string) {
    this.http.get<{message: string, user: any}>(Backend_Url + userId)
    .subscribe(userData => {
      console.log(userData);
      this.user = {
        id: userData.user._id,
        email: userData.user.email,
        name: userData.user.name,
        description: userData.user.description,
        profile_pic: userData.user.profile_pic,
        gender: userData.user.gender,
        posts: userData.user.posts,
        likes: userData.user.likes
      };
      this.userUpdated.next({...this.user});
    });
  }

  getUserUpdateListner() {
    return this.userUpdated.asObservable();
  }

  editProfile(userId: string, name: string, description: string, gender: string, image: File | string) {
    let userData: User | FormData;
    if (typeof(image) === 'object') {
      userData = new FormData();
      userData.append('id', userId);
      userData.append('name', name);
      userData.append('description', description);
      userData.append('image', image, name);
      userData.append('gender', gender);
      console.log(userData);
    } else {
      userData = {
        id: userId,
        name: name,
        description: description,
        profile_pic: image,
        gender: gender,
        email: null,
        posts: null,
        likes: null
      };
      console.log(userData);
  }
  this.http.put(Backend_Url + 'edit-profile', userData)
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['/user']);
    }
    );
  }

  getUserPost(userId: string) {
    this.postsService.getPostUpdateListner()
    .subscribe(
      (posts: Post[]) => {
        this.posts = posts.filter(post => {
          return post.creator.id === userId;
        });
      });
  }
}
