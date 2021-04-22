import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/posts/posts.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts = [];
  postSub: Subscription;
  userId: string;
  loggedInUserId: string;
  loggedInUserPage = true;
  isGrid = false;

  constructor(private postsService: PostsService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loggedInUserId = this.authService.getUserId();
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListner()
    .subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.loggedInUserPage = false;
            this.userId = paramMap.get('id');
            this.posts = this.posts.filter(post => {
              return post.creator.id === this.userId;
            });
          } else {
            this.posts = this.posts.filter(post => {
              return post.creator.id === this.loggedInUserId;
            });
          }
        });
      });
  }

  checkGrid() {
    this.isGrid = !this.isGrid;
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
