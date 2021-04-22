import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  postSub: Subscription;
  posts: Post[] = [];
  // isLoading = false;
  // loggedInUserId: string;
  // isLiked = false;

  constructor(private postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListner()
    .subscribe(
      (posts: Post[]) => {
        // this.isLoading = false;
        this.posts = posts;
        console.log(this.posts);
      }
    );

  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
